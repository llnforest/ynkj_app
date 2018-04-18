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
var do_ALayout_reserve = ui("do_ALayout_reserve");
var do_ALayout_love = ui("do_ALayout_love");
var do_ImageView_love = ui("do_ImageView_love");
var do_Label_love = ui("do_Label_love");
var suifeijiexi = ui("do_Label_39");
var zhuangxiumiaoshu = ui("do_Label_41");
var huxingjieshao = ui("do_Label_43");
var hexinmaidian = ui("do_Label_45");

var common = require("common");
var httpsData = {url:'house/detail',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};
var param = do_Page.getData();
var love_status = 0;

//拉取数据
common.sendPost(httpsData,{id:param.id},function(data){
	suifeijiexi.text = data.detail.shuifeijiexi;
	zhuangxiumiaoshu.text = data.detail.zhuangxiumiaoshu;
	huxingjieshao.text = data.detail.huxingjieshao;
	hexinmaidian.text = data.detail.hexinmaidian;
	do_ALayout_phone.tag = data.detail.phone;
});

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
	
})


//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);