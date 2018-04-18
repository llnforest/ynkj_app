/**
 * related to pickerLabel
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-03
 */
//声明UI变量
var do_Page = sm("do_Page");
var do_ALayout_root = ui("do_ALayout_root");
var do_Picker_label = ui("do_Picker_label");
var do_Notification = sm("do_Notification");
var do_App = sm("do_App");
var common = require("common");
var httpsData = {url:'index/labelList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};
var label = [];
common.sendPost(httpsData,{},function(data) {
	var labelDatas = data.labelData;
	label = data.label;
//	labelDatas = ["新房","二手房","农房","宅基","商铺"];
	labelData.addData(labelDatas);
	do_Picker_label.refreshItems();
});

//初始时要隐藏
do_ALayout_root.visible = false;
//点击其它区域，则隐藏关闭当前View
do_ALayout_root.on("touch", function(){
	do_ALayout_root.visible = false;
});

do_Page.on("ClickOut",function(){
	do_ALayout_root.visible = false;
});

//绑定数据
var labelData = mm("do_ListData");

do_Picker_label.bindItems(labelData);
//默认选择第1条记录
do_Picker_label.index=0;


//类型值变化
do_Picker_label.on("selectChanged", function(index) {
	//在当前页面下发送TypeChanged自定义消息
	var name = labelData.getOne(index)
	var id = label[name];
	do_Page.fire("LabelChanged", {name:name,index:id});	
});