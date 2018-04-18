/**
 * related to list.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-04
 */
//引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var do_DataCache = sm("do_DataCache");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ListView_list=ui("do_ListView_list");
//定义do_ListView_list的数据model
var listData = mm("do_ListData");
//定义变量
var type_id;
var record_page = 0;
var reserve_page = 0;
var notice_page = 0;
var reserveJson = [];
var recordJson = [];
var noticeJson = [];

//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"id",
	"do_ListView_list.templates":"template"
});

var common = require("common");

//预约数据
function renderReserve(){
	common.sendPost({url:'datalist/reserveList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{page:reserve_page},function(data) {
		//预约数据
		data.house.forEach(function(v,i){
			data.house[i].name = '您已预约'+v.reserve_date+'日和经纪人'+v.nick_name+'去'+v.xiaoqu+'看房—'+v.title;
		})
		listData.addData(data.house)
		do_ListView_list.refreshItems();
	});
}
//渲染看房
function renderRecord(){
	common.sendPost({url:'datalist/recordList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{page:record_page},function(data) {
		//看房数据
		data.house.forEach(function(v,i){
			data.house[i].name = '您已于'+v.record_date+'日和经纪人'+v.nick_name+'去'+v.xiaoqu+'看过房—'+v.title;
		})
		listData.addData(data.house)
		do_ListView_list.refreshItems();
	});
}
//渲染关注
function renderNotice(){
	common.sendPost({url:'datalist/noticeList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{page:notice_page},function(data) {
		//关注数据
		data.house.forEach(function(v,i){
			data.house[i].name = '您已于'+v.favourite_date+'关注'+v.xiaoqu+'房源—'+v.title;
		})
		listData.addData(data.house)
		do_ListView_list.refreshItems();
	});
}

//给do_ListView_list绑定数据
do_ListView_list.bindItems(listData);
//刷新数据
function refreshAllData(){
	do_ListView_list.rebound();
	if(type_id == 1) renderReserve();
	else if(type_id == 2) renderRecord();
	else if(type_id == 3) renderNotice();
	
}

//刷新数据
function getNextPageData(){
	do_ListView_list.rebound();
	if(type_id == 1){
		reserve_page ++;
		renderReserve();
	}
	else if(type_id == 2){
		record_page ++;
		renderRecord();
	}
	else if(type_id == 3){
		notice_page ++;
		renderNotice();
	}
}

//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	type_id= do_ALayout_root.tag;
	//先尝试加载本地数据
	var data= do_DataCache.loadData(type_id);
	if (data != null && data.length > 0){
		listData.removeAll();
		listData.addData(data);
		//do_ListView_list刷新显示
	    do_ListView_list.refreshItems();
	    return false;
	}
	//更新远程最新数据
	refreshAllData();
});


//上拉列表，翻页数据
do_ListView_list.on("push", function(data){
	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){		
		getNextPageData();
	}
});

////点击一条列表
//do_ListView_list.on("touch", function(data){
//		var onList=listData.getOne(data);
//		do_App.openPage({
//			source:"source://view/house/detail.ui", 
//			animationType:"push_r2l", //动画效果：从右向左推出
//			statusBarState:"transparent",
//			data:JSON.stringify({id:onList.house_id}) //传递页面之间的参数
//		});
//});