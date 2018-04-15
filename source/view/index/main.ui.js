/**
 * related to main.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-03-28
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");
var common = require("common");
var httpsData = {url:'index/index',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};

//声明变量
var do_SlideView_banner = ui("do_SlideView_banner");
var do_GridView_image = ui("do_GridView_image");
var do_VerticalSlideView_hot = ui("do_VerticalSlideView_hot");
var do_GridView_alltype = ui("do_GridView_alltype");
var do_ListView_house = ui("do_ListView_house");

var hot_index = 0;
var hot_max = 1;



common.sendPost(httpsData,{},function(data) {
	//顶部banner刷新
	bannerData.addData(data.top);
	do_SlideView_banner.refreshItems();
	//顶部banner刷新
	hotData.addData(data.notice);
	do_VerticalSlideView_hot.refreshItems();
	hot_max = data.notice.length;//最大长度
	//标签列表
	labelData.addData(data.label);
	do_GridView_alltype.refreshItems();
	//中部banner
	centerData.addData(data.center);
	do_GridView_image.refreshItems();
	//房型列表
	houseData.addData(data.house);
	do_ListView_house.refreshItems();
	do_ListView_house.height = data.house.length * 221;
	do_ListView_house.redraw();
	
});

//banner 图
var bannerData = mm("do_ListData");

//热点滚动（定时器）
var hotData = mm("do_ListData");
var hot_timer = mm("do_Timer");
hot_timer.delay = 1000;
hot_timer.interval = 3000;
hot_timer.on("tick",function(){
	do_VerticalSlideView_hot.index = hot_index;
	if(hot_index == hot_max - 1) hot_index = 0;
	else hot_index ++;
})
hot_timer.start();

//标签列表
var labelData = mm("do_ListData");


//首页中部列图
var centerData = mm("do_ListData");

//底部猜你喜欢
var houseData = mm("do_ListData");

//页面加载完成渲染
do_Page.on("loaded",function(){
	do_SlideView_banner.bindItems(bannerData);
	do_VerticalSlideView_hot.bindItems(hotData);
	do_GridView_alltype.bindItems(labelData);
	do_GridView_image.bindItems(centerData);
	do_ListView_house.bindItems(houseData);
	do_ListView_house.refreshItems();
})
