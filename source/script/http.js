module.exports.sendPost = function(http,data,sucFuc,failFuc){
	http.method = "POST";
	http.timeout = 30000; // 超时时间 : 单位 毫秒
	http.contentType = "application/json"; // Content-Type
	http.url = "http://mock.deviceone.net/demo01/newsList.ashx"; // 请求的 URL
	http.body = JSON.stringify(data); // 传入新闻类型ID和页码的参数
	http.on("success",function(data){
		sucFuc(data);
	});
	http.on("fail",function(data){
		failFuc(data);
	});
	http.request();
}