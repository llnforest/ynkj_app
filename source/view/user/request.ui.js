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
var do_Album = sm("do_Album");
//生命UI变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");

var do_ALayout_label = ui("do_ALayout_label");
var do_ALayout_buy1 = ui("do_ALayout_buy1");
var do_ALayout_buy2 = ui("do_ALayout_buy2");
var do_ScrollView_content = ui("do_ScrollView_content");
var do_ALayout_body = ui("do_ALayout_body");
var do_ALayout_upload = ui("do_ALayout_upload");
var do_LinearLayout_img = ui('do_LinearLayout_img');

var do_Label_5 = ui("do_Label_5");
var do_Label_6 = ui("do_Label_6");
var do_Label_7 = ui("do_Label_7");
var do_Label_8 = ui("do_Label_8");

var do_Label_label = ui("do_Label_label");
var do_LinearLayout_content = ui("do_LinearLayout_content");

var reserve_status = 0;
var love_status = 0;
var house_type = 1;
//类型选择
do_ALayout_buy1.on("touch",function(){
	house_type = 1;
	do_ALayout_buy1.tag = 1;
	do_Label_5.border = "008c00ff,1,[20,20,20,20]";
	do_Label_6.fontColor = "008c00ff";
	do_Label_7.border = "8a8a8aff,1,[20,20,20,20]";
	do_Label_8.fontColor = "8a8a8aff";
})
do_ALayout_buy2.on("touch",function(){
	house_type = 2;
	do_ALayout_buy2.tag = 1;
	do_Label_7.border = "008c00ff,1,[20,20,20,20]";
	do_Label_8.fontColor = "008c00ff";
	do_Label_5.border = "8a8a8aff,1,[20,20,20,20]";
	do_Label_6.fontColor = "8a8a8aff";
})

//上传图片
do_ALayout_upload.on("touch",function(){
	do_Album.select({maxCount:3,width:-1,height:-1,quantity:50,iscut:false,type:0},function(data,e){
		deviceone.print(data);
		var child = do_LinearLayout_img.getChildren();
		child.forEach(function(value, key, map) {
			ui(value).source = data[key];
		})
	});
})

do_ALayout_root.add("pickerLabel","source://view/user/pickerLabel.ui");
pickerLabel = ui("pickerLabel");

//点击关闭键盘 点击标签
do_ALayout_label.on("touch",function(){
	pickerLabel.show("slide_b2t",200);
});
do_Page.on("LabelChanged",function(data){
	do_Label_label.text=data;
});
do_LinearLayout_content.on("touch",function(){
	deviceone.print('ok');
	do_Page.hideKeyboard();
	do_Page.fire("ClickOut");
})
//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//订阅android 系统返回键事件，3秒内连续点两次退出
var canBack = false;
var delayOut = mm("do_Timer");
delayOut.delay = 3000;
delayOut.on("tick",function(){
	delayOut.stop();
	canBack = false;
})
do_Page.on("back",function(){
	if(canBack){
		do_Global.exit();
	}else{
		do_Notification.toast("再次点击退出应用");
		canBack = true;
		delayOut.start();
	}
})