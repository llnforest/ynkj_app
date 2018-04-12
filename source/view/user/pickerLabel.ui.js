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

//初始时要隐藏
do_ALayout_root.visible = false;
//点击其它区域，则隐藏关闭当前View
do_ALayout_root.on("touch", function(){
	do_ALayout_root.visible = false;
});

do_Page.on("ClickOut",function(){
	deviceone.print("ClickOut");
	do_ALayout_root.visible = false;
});

//绑定数据
var labelData = mm("do_ListData");
var labelDatas = [ "二手房", "新房", "商品房", "精装房" ];
labelData.addData(labelDatas);
do_Picker_label.bindItems(labelData);
//默认选择第1条记录
do_Picker_label.index=0;


//类型值变化
do_Picker_label.on("selectChanged", function(index) {
	//在当前页面下发送TypeChanged自定义消息
	do_Page.fire("LabelChanged", labelData.getOne(index));	
});