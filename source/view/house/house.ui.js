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

var do_SlideView_banner = ui("do_SlideView_banner");
var do_ALayout_showall_btn = ui("do_ALayout_showall_btn");
var do_ALayout_phone = ui("do_ALayout_phone");
var do_ALayout_reserve = ui("do_ALayout_reserve");
var do_ALayout_love = ui("do_ALayout_love");
var do_ImageView_love = ui("do_ImageView_love");
var do_Label_love = ui("do_Label_love");
var do_GridView_goodness = ui("do_GridView_goodness");

var reserve_status = 0;
var love_status = 0;

//优势列表
var goodnessData = mm("do_ListData");
var jsonGoodness = [
    {name:"免税",id:1,color:"008a00ff"},
    {name:"地铁口",id:2,color:"FF0000FF"}
]
goodnessData.addData(jsonGoodness);

//查看详情
do_ALayout_showall_btn.on("touch",function(){
	do_App.openPage({
		source:"source://view/house/detail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
	});
})

//关注、取消关注
do_ALayout_love.on("touch",function(){
	if(love_status == 0){
		love_status = 1;
		do_Notification.toast("关注成功");
		do_ImageView_love.source = "source://image/love_active.png";
		do_Label_love.text = "取消关注";
		do_Label_love.fontColor = "FF0000FF";
	}else{
		love_status = 0;
		do_Notification.toast("取消关注成功");
		do_ImageView_love.source = "source://image/love.png";
		do_Label_love.text = "关注";
		do_Label_love.fontColor = "8A8A8AFF";
	}
})

//预约看房
do_ALayout_reserve.on("touch",function(){
	if(reserve_status == 0){
		reserve_status = 1;
		do_Notification.toast("提交预约申请成功，请等待经纪人安排");
	}else{
		do_Notification.toast("您已提交预约申请，请等待经纪人安排");
	}
})

//拨打电话
do_ALayout_phone.on("touch",function(){
	do_External.openDial("13585788049");
})
//banner 图
var bannerData = mm("do_ListData");
var jsonBanner = [
  {
  	id:1,
  	url:"source://image/banner2.jpg",
  	title:"大房出售，品质保证",
  	href:"source://view/index/bannerTemplate.ui"
	},
  {
  	id:2,
  	url:"source://image/banner2.jpg",
  	title:"",
  	href:""
	}
]
bannerData.addData(jsonBanner);


//页面加载完成渲染
do_Page.on("loaded",function(){
	do_SlideView_banner.bindItems(bannerData);
	do_GridView_goodness.bindItems(goodnessData);
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