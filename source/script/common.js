module.exports.sendPost = function(obj,body,sucFuc,method){
	var http = obj.http;
	var notify = obj.notify;
	var app = obj.app;
	var timer = obj.time;
	var url = 'http://192.168.1.115/app/api/';
	var storage = obj.storage;
	var token = '';
	http.method = "POST";
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = url + obj.url; // 请求的 URL
	http.on("success",function(data){
		obj.deviceone.print(JSON.stringify(data));
		if(data.code == 1){
			sucFuc(data.data);
		}
		if(data.urlData) data.urlData.token = token;
		if(data.msg && data.url){
			notify.toast(data.msg);
			timer.delay = 2000;
			timer.interval = 1000;
			timer.on("tick",function(){
				app.openPage({
					source:data.url,
					animationType:"push_r2l",
					statusBarState:"transparent",
					data:data.urlData
				})
				timer.stop();
			})
			timer.start();
		}else if(data.msg){
			notify.toast(data.msg);
		}else if(data.url){
			app.openPage({
				source:data.url,
				animationType:"push_r2l",
				statusBarState:"transparent",
				data:data.urlData
			})
		}
	});
	http.on("fail",function(data){
		notify.toast("网络故障");
	});
	storage.readFile("data://file/token.txt",function(data,e){
		token = data;
		body.token = token;
		
		if(method == 'upload') {
			obj.deviceone.print('upload');
			http.contentType = "multipart/form-data"; // Content-Type
			http.upload(body);
		}else if(method == 'form'){
			obj.deviceone.print('form');
			http.contentType = "multipart/form-data"; // Content-Type
			http.form(body);
		}else{
			http.body = JSON.stringify(body); //传递数据
			obj.deviceone.print('request');
			http.contentType = "application/json"; // Content-Type
			http.request();
		}
			
		
	});
	
}