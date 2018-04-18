/**
 * related to main.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-03-28
 */
var do_External = sm("do_External");
var do_App = sm("do_App");
var do_Album = sm("do_Album");
var do_Notification = sm("do_Notification");

var common = require("common");
var httpsData = {url:'user/index',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};

var do_ALayout_contact = ui("do_ALayout_contact");
var do_ALayout_request = ui("do_ALayout_request");
var do_LinearLayout_top = ui("do_LinearLayout_top")
var headUrl = ui("do_ImageView_head");
var do_Label_5 = ui("do_Label_5");
var do_Label_2 = ui("do_Label_2");

common.sendPost(httpsData,{},function(data) {
	do_Label_5.text = data.service;
	do_Label_2.text = data.user.phone;
	if(data.user.head_url) headUrl.source = data.user.head_url;
	else headUrl.source = "source://image/head_url.png";
});

//点击头像
do_LinearLayout_top.on("touch",function(){
	do_Album.select({maxCount:1,width:200,height:200,quantity:50,iscut:false,type:0},function(data,e){
		headUrl.source = data[0];
		common.sendPost({url:'user/updateHeadUrl',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},data[0],function(data) {
			
		},'upload');
	});
})

//需求发布
do_ALayout_request.on("touch",function(){
	do_App.openPage({
		source:"source://view/user/request.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
	});
})

//联系客服
do_ALayout_contact.on("touch",function(){
	do_External.openDial(do_Label_5.text);
})
