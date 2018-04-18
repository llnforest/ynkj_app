/**
 * @Author : llnforest
 * @Timestamp : 2018-03-27
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Storage = sm("do_Storage");

//声明UI变量
var do_TextField_code = ui("do_TextField_code");
var do_TextField_phone = ui("do_TextField_phone");
var do_ALayout_line_phone = ui("do_ALayout_line_phone");
var do_ALayout_line_code = ui("do_ALayout_line_code");
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_ALayout_code_btn = ui("do_ALayout_code_btn");
var do_Label_code = ui("do_Label_code");
var do_ALayout_login_btn = ui("do_ALayout_login_btn");

var do_Timer = mm("do_Timer");
var common = require("common");
var httpsData = {url:'login/login',deviceone:deviceone,storage:do_Storage,time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};

//获得和失去焦点
do_TextField_code.on("focusIn",function(){
	do_ALayout_line_code.bgColor = "008C00FF";
})
do_TextField_code.on("focusOut",function(){
	do_ALayout_line_code.bgColor = "8A8A8AFF";
})

do_TextField_phone.on("focusIn",function(){
	do_ALayout_line_phone.bgColor = "008C00FF";
})
do_TextField_phone.on("focusOut",function(){
	do_ALayout_line_phone.bgColor = "8A8A8AFF";
})

//获取验证码
do_ALayout_code_btn.on("touch",function(){
	if(do_Timer.isStart()) return false;
	common.sendPost({url:'login/sendSms',deviceone:deviceone,storage:do_Storage,time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{phone:do_TextField_phone.text},function(data) {
		do_ALayout_code_btn.border = "8a8a8aff,1,[0,0,0,0]";
		do_Label_code.fontColor = "8a8a8aff";
		var times = 90;
		do_Timer.start();
		do_Timer.on("tick",function(){
			times -- ;
			do_Label_code.text = "重新发送("+times+")";
			if(times < 0){
				do_Label_code.text = "获取验证码";
				do_ALayout_code_btn.border = "008c00ff,1,[0,0,0,0]";
				do_Label_code.fontColor = "008c00ff";
				do_Timer.stop();
			}
		})
	});
	
})

//点击登录
do_ALayout_login_btn.on("touch",function(){
	httpsData.url = 'login/login'
	common.sendPost(httpsData,{phone:do_TextField_phone.text,usms:do_TextField_code.text},function(data) {
		do_Storage.writeFile("data://file/token.txt",data);
	});
	
})

//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//点击关闭键盘
do_ALayout_root.on("touch",function(){
	do_Page.hideKeyboard();
})


//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);