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
var common = require("common");
var httpsData = {url:'house/index',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};

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

var do_Label_4 = ui("do_Label_4");
var do_Label_38 = ui("do_Label_38");
var do_Label_28 = ui("do_Label_28");
var do_Label_9 = ui("do_Label_9");
var do_Label_26 = ui("do_Label_26");
var do_Label_34 = ui("do_Label_34");
var do_Label_32 = ui("do_Label_32");
var do_Label_10 = ui("do_Label_10");
var do_Label_8 = ui("do_Label_8");
var do_Label_18 = ui("do_Label_18");
var do_Label_16 = ui("do_Label_16");
var do_Label_15 = ui("do_Label_15");
var do_Label_12 = ui("do_Label_12");
var do_Label_21 = ui("do_Label_21");
var do_Label_39 = ui("do_Label_39");
var do_Label_23 = ui("do_Label_23");
var do_Label_40 = ui("do_Label_40");

var param = do_Page.getData();
var reserve_status = 0;
var love_status = 0;

//banner 图
var bannerData = mm("do_ListData");

//拉取数据
common.sendPost(httpsData,{id:param.id},function(data) {
	//优势绑定刷新
	betterData.addData(data.betterList);
	do_GridView_goodness.refreshItems();
	//顶部图片绑定刷新
	bannerData.addData(data.imgList);
	do_SlideView_banner.refreshItems();
	//房源数据
	do_Label_4.text = data.house.title;
	do_Label_38.text = data.house.per_price;
	do_Label_28.text = data.house.guapai_date;
	do_Label_9.text = data.house.chaoxiang;
	do_Label_26.text = data.house.louceng;
	
	do_Label_34.text = data.house.louxing;
	var dianti = data.house.dianti == 1?'有':'无';
	do_Label_32.text = dianti;
	do_Label_10.text = data.house.zhuangxiu;
	do_Label_8.text = data.house.niandai;
	do_Label_18.text = data.house.yongtu;
	do_Label_16.text = data.house.quanshu;
	do_Label_15.text = data.house.shoufu;
	do_Label_12.text = data.house.xiaoqu;
	do_Label_21.text = data.house.description;
	do_Label_39.text = data.house.price;
	do_Label_23.text = data.house.fangxing_name;
	do_Label_40.text = data.house.mianji;
	
	do_ALayout_phone.tag = data.house.phone;
});

//优势列表
var betterData = mm("do_ListData");

//查看详情
do_ALayout_showall_btn.on("touch",function(){
	do_App.openPage({
		source:"source://view/house/detail.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({id:param.id})
	});
})

//判断是否关注
common.sendPost({url:'house/isNotice',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{house_id:param.id},function(data) {
	if(data){
		love_status = 1;
		do_ImageView_love.source = "source://image/love_active.png";
		do_Label_love.text = "取消关注";
		do_Label_love.fontColor = "FF0000FF";
	}
	
});

//关注、取消关注
do_ALayout_love.on("touch",function(){
	common.sendPost({url:'user/favouriteHouse',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{house_id:param.id},function(data) {
		if(data){
			love_status = 1;
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
		
	});
})

//预约看房
do_ALayout_reserve.on("touch",function(){
	common.sendPost({url:'user/reserveHouse',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{house_id:param.id},function(data) {
		
	});
})

//拨打电话
do_ALayout_phone.on("touch",function(){
	do_External.openDial(do_ALayout_phone.tag);
})



//页面加载完成渲染
do_Page.on("loaded",function(){
	do_SlideView_banner.bindItems(bannerData);
	do_GridView_goodness.bindItems(betterData);
})


//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);