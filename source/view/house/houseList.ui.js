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

//声明变量
var do_ALayout_root = ui("do_ALayout_root");
var do_ALayout_back = ui("do_ALayout_back");
var do_ListView_house = ui("do_ListView_house");
var do_ALayout_house = ui("do_ALayout_house");
var do_ALayout_quyu = ui("do_ALayout_quyu");
var do_Label_quyu = ui("do_Label_quyu");
var do_ImageView_quyu = ui("do_ImageView_quyu");
var do_ALayout_jiage = ui("do_ALayout_jiage");
var do_Label_jiage = ui("do_Label_jiage");
var do_ImageView_jiage = ui("do_ImageView_jiage");
var do_Label_fangxing = ui("do_Label_fangxing");
var do_ALayout_fangxing = ui("do_ALayout_fangxing");
var do_ImageView_fangxing = ui("do_ImageView_fangxing");
var do_Label_head = ui("do_Label_head");

var page = 0;
var quyu = 0,fangxing=0,jiage=0;
var param = do_Page.getData();
var common = require("common");
var httpsData = {url:'house/houseList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")};
var fangxingData = mm("do_ListData");
var jiageData = mm("do_ListData");
var quyuData = mm("do_ListData");
var houseData = mm("do_ListData");
var jiageJson = [];
var quyuJson = [];
var fangxingJson = [];
do_ALayout_house.add("selectTemplate", "source://view/house/selectTemplate.ui", 0, 0);

common.sendPost(httpsData,{label_id:param.label_id,page:page},function(data) {
	do_Label_head.text = data.label;
	//房型、区域、价格信息绑定
	data.fangxing.unshift({id:0,term:'全部房型',selected:1})
	fangxingJson = data.fangxing;
	fangxingData.addData(data.fangxing);
	data.jiage.unshift({id:0,term:'全部价格',selected:1})
	jiageJson = data.jiage;
	jiageData.addData(data.jiage);
	data.quyu.unshift({id:0,term:'全部区域',selected:1})
	quyuJson = data.quyu;
	quyuData.addData(data.quyu);
	//房型列表
	houseData.addData(data.house);
	do_ListView_house.refreshItems();
	if(data.house.length < 10) do_ListView_house.isFooterVisible = false;
});

//在当前页面下订阅SelectOneTab的事件
do_Page.on("SelectOneTab", function(data){
	var old_quyu = quyu;
	var old_fangxing = fangxing;
	var old_jiage = jiage;
	if(do_ALayout_quyu.tag == 1){
		for(var i=0; i<quyuJson.length;i++){
			if (quyuJson[i].term == data.name){
				quyu = quyuJson[i].id;
				is_refresh = 1;
				quyuData.updateOne(i, 
					{
						id : quyuJson[i].id,
						term : quyuJson[i].term,
					    selected : 1,
					}
				);
			}
			else{
				quyuData.updateOne(i, 
					{
						id : quyuJson[i].id,
						term : quyuJson[i].term,
					    selected : 0,
					}
				);
			}
		}
	}else if(do_ALayout_jiage.tag == 1){
		for(var i=0; i<jiageJson.length;i++){
			if (jiageJson[i].term == data.name){
				jiage = jiageJson[i].id;
				is_refresh = 1;
				jiageData.updateOne(i, 
					{
						id : jiageJson[i].id,
						term : jiageJson[i].term,
					    selected : 1,
					}
				);
			}
			else{
				jiageData.updateOne(i, 
					{
						id : jiageJson[i].id,
						term : jiageJson[i].term,
					    selected : 0,
					}
				);
			}
		}
	}else{
		for(var i=0; i<fangxingJson.length;i++){
			if (fangxingJson[i].term == data.name){
				fangxing = fangxingJson[i].id;
				is_refresh = 1;
				fangxingData.updateOne(i, 
					{
						id : fangxingJson[i].id,
						term : fangxingJson[i].term,
					    selected : 1,
					}
				);
			}
			else{
				fangxingData.updateOne(i, 
					{
						id : fangxingJson[i].id,
						term : fangxingJson[i].term,
					    selected : 0,
					}
				);
			}
		}
	}
	do_Page.fire("RefreshSelect");
	//重新筛选
	if(old_quyu != quyu || old_fangxing != fangxing || old_jiage != jiage){
		page = 0;
		deviceone.print(JSON.stringify({label_id:param.label_id,page:page,quyu:quyu,fangxing:fangxing,jiage:jiage}));
		do_ListView_house.isFooterVisible = true;
		common.sendPost({url:'house/houseList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{label_id:param.label_id,page:page,quyu:quyu,fangxing:fangxing,jiage:jiage},function(data) {
			//房型列表
			houseData.removeAll();
			do_ListView_house.rebound();
			houseData.addData(data.house);
			do_ListView_house.refreshItems();
			if(data.house.length < 10) do_ListView_house.isFooterVisible = false;
		});
	}
});

//下拉
do_ListView_house.on("push",function(data){
	if(data.state == 2){
		getNextPage();
	}
})
function getNextPage(){
	page ++;
	common.sendPost({url:'house/houseList',deviceone:deviceone,storage:sm("do_Storage"),time:mm("do_Timer"),notify:do_Notification,app:do_App,http:mm("do_Http")},{label_id:param.label_id,page:page,quyu:quyu,fangxing:fangxing,jiage:jiage},function(data) {
		//房型列表
		do_ListView_house.rebound();
		houseData.addData(data.house);
		do_ListView_house.refreshItems();
		if(data.house.length < 10) do_ListView_house.isFooterVisible = false;
	});
}

//消除导航状态
do_Page.on("RemoveNavStatus",function(){
	do_ALayout_quyu.tag = do_ALayout_jiage.tag = do_ALayout_fangxing.tag = 0;
	do_Label_quyu.fontColor = do_Label_jiage.fontColor = do_Label_fangxing.fontColor = "8a8a8aff"
	do_ImageView_quyu.source = do_ImageView_jiage.source = do_ImageView_fangxing.source = "source://image/base_down.png";	
});

//顶部点击触发事件
do_ALayout_quyu.on("touch",function(){
	do_ALayout_quyu.tag = 1;
	do_ALayout_jiage.tag = 0;
	do_ALayout_fangxing.tag = 0;
	do_Label_quyu.fontColor = "008c00ff";
	do_ImageView_quyu.source = "source://image/base_down_active.png";
	do_Label_jiage.fontColor = "8a8a8aff";
	do_ImageView_jiage.source = "source://image/base_down.png";
	do_Label_fangxing.fontColor = "8a8a8aff";
	do_ImageView_fangxing.source = "source://image/base_down.png";
	do_Page.fire("ShowSelect",quyuData)
});
do_ALayout_jiage.on("touch",function(){
	do_ALayout_quyu.tag = 0;
	do_ALayout_jiage.tag = 1;
	do_ALayout_fangxing.tag = 0;
	do_Label_quyu.fontColor = "8a8a8aff";
	do_ImageView_quyu.source = "source://image/base_down.png";
	do_Label_jiage.fontColor = "008c00ff";
	do_ImageView_jiage.source = "source://image/base_down_active.png";
	do_Label_fangxing.fontColor = "8a8a8aff";
	do_ImageView_fangxing.source = "source://image/base_down.png";
	do_Page.fire("ShowSelect",jiageData)
});
do_ALayout_fangxing.on("touch",function(){
	do_ALayout_quyu.tag = 0;
	do_ALayout_jiage.tag = 0;
	do_ALayout_fangxing.tag = 1;
	do_Label_quyu.fontColor = "8a8a8aff";
	do_ImageView_quyu.source = "source://image/base_down.png";
	do_Label_jiage.fontColor = "8a8a8aff";
	do_ImageView_jiage.source = "source://image/base_down.png";
	do_Label_fangxing.fontColor = "008c00ff";
	do_ImageView_fangxing.source = "source://image/base_down_active.png";
	do_Page.fire("ShowSelect",fangxingData)
});


//页面加载完成渲染
do_Page.on("loaded",function(){
	do_ListView_house.bindItems(houseData);
})

//点击顶部返回键
do_ALayout_back.on("touch",function(){
	do_App.closePage({
		animationType:"push_l2r"
	})
});

//订阅android 系统返回键事件，3秒内连续点两次退出
common.systemBack(do_Page,mm("do_Timer"),do_Global,do_Notification);
