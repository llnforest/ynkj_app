/**
 * @Author : llnforest
 * @Timestamp : 2018-03-27
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_External = sm("do_External");

//生命UI变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");

var do_ALayout_phone = ui("do_ALayout_phone");
var do_Label_title = ui("do_Label_title");
var do_Label_content = ui("do_Label_content");
var do_ImageView_banner = ui("do_ImageView_banner");
var do_ImageView_huxing = ui("do_ImageView_huxing");

var param = do_Page.getData();
var common = require("common");
deviceone.print(param.id);
var httpsData = {url:'msg/detail',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};

//拉取数据
common.sendPost(httpsData,{id:param.id},function(data) {
	do_Label_title.text = data.detail.title;
	do_Label_content.text = data.detail.content;
	do_ALayout_phone.tag = data.detail.phone
	do_ImageView_banner.source = data.detail.banner_url;
	do_ImageView_huxing.source = data.detail.house_url;
});

//拨打电话
do_ALayout_phone.on("touch",function(){
	do_External.openDial(do_ALayout_phone.tag);
})


//页面加载完成渲染
do_Page.on("loaded",function(){
	
})


//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);