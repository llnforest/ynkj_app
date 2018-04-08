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

var quyu = 0,fangxing=0,jiage=0;

do_ALayout_house.add("selectTemplate", "source://view/house/selectTemplate.ui", 0, 0);
//var selectTemplate = ui("selectTemplate");

var quyuJson = [
               {id:1,term:"全部区域",selected:1},
		       {id:2,term:"蜀山区",selected:0},
		       {id:3,term:"庐阳区",selected:0},
		       {id:4,term:"包河区",selected:0},
		       {id:5,term:"瑶海区",selected:0},
		];
var jiageJson = [
                {id:0,term:"全部价格",selected:1},
                {id:1,term:"5000以下",selected:0},
                {id:2,term:"5000-7000",selected:0},
                {id:3,term:"7000-10000",selected:0},
                {id:4,term:"10000-15000",selected:0},
                {id:4,term:"15000以上",selected:0},
         ];
var fangxingJson = [
                {id:0,term:"房型",selected:1},
                {id:1,term:"三室一厅",selected:0},
                {id:2,term:"两室一厅",selected:0},
                {id:3,term:"一室一厅",selected:0},
                {id:4,term:"四室两厅",selected:0},
         ];

var fangxingData = mm("do_ListData");
fangxingData.addData(fangxingJson);
var jiageData = mm("do_ListData");
jiageData.addData(jiageJson);
var quyuData = mm("do_ListData");
quyuData.addData(quyuJson);

//在当前页面下订阅SelectOneTab的事件
do_Page.on("SelectOneTab", function(data){
	deviceone.print("selectOneTab");
	if(do_ALayout_quyu.tag == 1){
		for(var i=0; i<quyuJson.length;i++){
			if (quyuJson[i].term == data.name){
				quyu = quyuJson[i].id;
				quyuData.updateOne(i, 
					{
						id : quyuJson[i].id,
						term : quyuJson[i].term,
					    selected : 1,
					}
				);
			}
			else{
				deviceone.print(JSON.stringify(quyuJson[i]));
				quyuData.updateOne(i, 
					{
						id : quyuJson[i].id,
						term : quyuJson[i].term,
					    selected : 0,
					}
				);
			}
		}
		do_Page.fire("RefreshSelect",quyuData);
	}else if(do_ALayout_jiage.tag == 1){
		for(var i=0; i<jiageJson.length;i++){
			if (jiageJson[i].term == data.name){
				jiage = jiageJson[i].id
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
		do_Page.fire("RefreshSelect",jiageData);
	}else{
		for(var i=0; i<fangxingJson.length;i++){
			if (fangxingJson[i].term == data.name){
				fangxing = fangxingJson[i].id;
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
		do_Page.fire("RefreshSelect");
	}
});

//下拉
do_ListView_house.on("push",function(data){
	if(data.state == 2){
		getNextPage();
	}
})
function getNextPage(){
	deviceone.print("push");
	do_ListView_house.rebound();
	houseData.addData(jsonHouse);
	do_ListView_house.refreshItems();
}

//消除导航状态
do_Page.on("RemoveNavStatus",function(){
	do_ALayout_quyu.tag = do_ALayout_jiage.tag = do_ALayout_fangxing.tag = 0;
	do_Label_quyu.fontColor = do_Label_jiage.fontColor = do_Label_fangxing.fontColor = "8a8a8aff"
	do_ImageView_quyu.source = do_ImageView_jiage.source = do_ImageView_fangxing.source = "source://image/base_down.png";	
});

//顶部点击触发事件
do_ALayout_quyu.on("touch",function(){
	deviceone.print("quyu");
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
	deviceone.print("jiage");
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
	deviceone.print("fangxing");
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

//列表
var houseData = mm("do_ListData");
var jsonHouse = [
    {
	  	id:1,
	  	desc:"两室一厅/100平/南北通透/铜冠花园",
	  	goodness:[{name:"免税",id:1,color:"008a00ff"},{name:"地铁口",id:2,color:"FF0000FF"}],
	  	price:"150万",
	  	avg_price:"1500元/平米",
	  	url:"source://image/demo_house.png",
	  	title:"铜冠花园大四房，只要150万",
	  	href:"source://view/index/bannerTemplate.ui"
	},
	{
	  	id:2,
	  	desc:"两室一厅/100平/南北通透/铜冠花园",
	  	goodness:[{name:"免税",id:1,color:"008a00ff"},{name:"地铁口",id:2,color:"FF0000FF"}],
	  	price:"150万",
	  	avg_price:"1500元/平米",
	  	url:"source://image/demo_house.png",
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	  	href:"source://view/index/bannerTemplate.ui"
	},
	{
	  	id:3,
	  	desc:"两室一厅/100平/南北通透/铜冠花园",
	  	goodness:[{name:"地铁口",id:2,color:"FF0000FF"}],
	  	price:"150万",
	  	avg_price:"1500元/平米",
	  	url:"source://image/demo_house.png",
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	  	href:"source://view/index/bannerTemplate.ui"
	},
	{
	  	id:4,
	  	desc:"两室一厅/100平/南北通透/铜冠花园",
	  	goodness:[{name:"免税",id:1,color:"008a00ff"},{name:"地铁口",id:2,color:"FF0000FF"}],
	  	price:"150万",
	  	avg_price:"1500元/平米",
	  	url:"source://image/demo_house.png",
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	  	href:"source://view/index/bannerTemplate.ui"
	},
	{
		id:5,
		desc:"两室一厅/100平/南北通透/铜冠花园",
		goodness:[{name:"免税",id:1,color:"008a00ff"}],
	  	price:"150万",
	  	avg_price:"1500元/平米",
	  	url:"source://image/demo_house.png",
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	  	href:"source://view/index/bannerTemplate.ui"
	}
];
houseData.addData(jsonHouse);

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
