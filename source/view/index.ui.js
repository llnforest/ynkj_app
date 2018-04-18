/**
 * @Author : llnforest
 * @Timestamp : 2018-03-27
 */
//引入组件库
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var common = require('common');

//生命UI变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_b0 = ui("do_ALayout_b0");
var do_ALayout_b1 = ui("do_ALayout_b1");
var do_ALayout_b2 = ui("do_ALayout_b2");
var do_ALayout_b3 = ui("do_ALayout_b3");
var do_ImageView_b0 = ui("do_ImageView_b0");
var do_ImageView_b1 = ui("do_ImageView_b1");
var do_ImageView_b2 = ui("do_ImageView_b2");
var do_ImageView_b3 = ui("do_ImageView_b3");
var do_Label_b0 = ui("do_Label_b0");
var do_Label_b1 = ui("do_Label_b1");
var do_Label_b2 = ui("do_Label_b2");
var do_Label_b3 = ui("do_Label_b3");
var do_Label_head = ui("do_Label_head");
var active = 0;

//定义每个按钮的touch事件
do_ALayout_b0.on("touch",function(){
	if(active == 0) return;
	do_ImageView_b0.source = "source://image/bot_bar_index_active.png";
	do_ImageView_b1.source = "source://image/bot_bar_msg.png";
	do_ImageView_b2.source = "source://image/bot_bar_list.png";
	do_ImageView_b3.source = "source://image/bot_bar_user.png";
	do_Label_b0.fontColor = "008C00FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_Label_head.text = "首页";
	if(active > 0) var animationType = "push_l2r";
	else var animationType = "push_r2l";
	active = 0;
	do_ViewShower_main.showView({id:"index",animationType: animationType,animationTime:300});
})

do_ALayout_b1.on("touch",function(){
	if(active == 1) return;
	do_ImageView_b0.source = "source://image/bot_bar_index.png";
	do_ImageView_b1.source = "source://image/bot_bar_msg_active.png";
	do_ImageView_b2.source = "source://image/bot_bar_list.png";
	do_ImageView_b3.source = "source://image/bot_bar_user.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "008C00FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "000000FF";
	do_Label_head.text = "消息";
	if(active > 1){
		var animationType = "push_l2r";
	}else{
		var animationType = "push_r2l";
	}
	active = 1;
	do_ViewShower_main.showView({id:"msg",animationType: animationType,animationTime:300});
})

do_ALayout_b2.on("touch",function(){
	if(active == 2) return;
	do_ImageView_b0.source = "source://image/bot_bar_index.png";
	do_ImageView_b1.source = "source://image/bot_bar_msg.png";
	do_ImageView_b2.source = "source://image/bot_bar_list_active.png";
	do_ImageView_b3.source = "source://image/bot_bar_user.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "008C00FF";
	do_Label_b3.fontColor = "000000FF";
	do_Label_head.text = "记事本";
	if(active > 2) var animationType = "push_l2r";
	else var animationType = "push_r2l";
	active = 2;
	do_ViewShower_main.showView({id:"list",animationType: animationType,animationTime:300});
})


do_ALayout_b3.on("touch",function(){
	if(active == 3) return;
	do_ImageView_b0.source = "source://image/bot_bar_index.png";
	do_ImageView_b1.source = "source://image/bot_bar_msg.png";
	do_ImageView_b2.source = "source://image/bot_bar_list.png";
	do_ImageView_b3.source = "source://image/bot_bar_user_active.png";
	do_Label_b0.fontColor = "000000FF";
	do_Label_b1.fontColor = "000000FF";
	do_Label_b2.fontColor = "000000FF";
	do_Label_b3.fontColor = "008C00FF";
	do_Label_head.text = "个人中心";
	if(active > 3) var animationType = "push_l2r";
	else var animationType = "push_r2l";
	active = 3;
	do_ViewShower_main.showView({id:"user",animationType: animationType,animationTime:300});
})

//body 部分
var do_ViewShower_main = ui("do_ViewShower_main");
var viewShower_data = [
    {
    	"id":"index",
    	"path":"source://view/index/main.ui"
    },
    {
    	"id":"msg",
    	"path":"source://view/msg/main.ui"
    },
    {
    	"id":"list",
    	"path":"source://view/list/main.ui"
    },
    {
    	"id":"user",
    	"path":"source://view/user/main.ui"
    }
];

do_ViewShower_main.addViews(viewShower_data);
do_ViewShower_main.showView("index");

//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);