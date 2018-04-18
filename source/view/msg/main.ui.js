/**
 * related to main.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-03-28
 */
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");

var page = 0;
var common = require("common");
var httpsData = {url:'msg/index',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};


//声明变量
var do_ListView_msg = ui("do_ListView_msg");
//列表
var msgData = mm("do_ListData");

common.sendPost(httpsData,{page:page},function(data) {
	//通知列表
	msgData.addData(data.notice);
	do_ListView_msg.refreshItems();
	if(data.notice.length < 10) do_ListView_msg.isFooterVisible = false;
});

//下拉
do_ListView_msg.on("push",function(data){
	if(data.state == 2){
		getNextPage();
	}
})

function getNextPage(){
	
	common.sendPost({url:'msg/index',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{page:page},function(data) {
		//通知列表
		do_ListView_msg.rebound();
		msgData.addData(data.notice);
		do_ListView_msg.refreshItems();
		if(data.notice.length < 10) do_ListView_msg.isFooterVisible = false;
	});
}



do_ListView_msg.bindItems(msgData);
