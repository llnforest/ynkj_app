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
var do_SlideView_banner = ui("do_SlideView_banner");
var do_GridView_image = ui("do_GridView_image");
var do_VerticalSlideView_hot = ui("do_VerticalSlideView_hot");
var do_GridView_alltype = ui("do_GridView_alltype");
var do_ListView_house = ui("do_ListView_house");


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

//热点滚动
var hotData = mm("do_ListData");
var jsonHot = [
    {
    	id:1,
    	title:"房产税又降啦！重大利好",
    	href:"source://view/index/bannerTemplate.ui"
	},
    {
    	id:2,
    	title:"号外号外，怎样花更少的钱买更好的房子",
    	href:""
	},
    {
    	id:3,
    	title:"看一看，瞧一瞧",
    	href:""
	}
]
hotData.addData(jsonHot);
var hot_max = jsonHot.length;
var hot_index = 0;
var hot_timer = mm("do_Timer");
hot_timer.delay = 3000;
hot_timer.interval = 3000;
hot_timer.on("tick",function(){
	hot_index ++;
	do_VerticalSlideView_hot.index = hot_index;
	if(hot_index == hot_max - 1) hot_index = 0;
})
hot_timer.start();

//类型列表
var typesData = mm("do_ListData");
var jsontypes = [
  {
  	id:1,
  	url:"source://image/house_type.png",
  	title:"商品房",
  	href:"source://view/index/bannerTemplate.ui"
	},
  {
  	id:2,
  	url:"source://image/house_type.png",
  	title:"商品房",
  	href:""
	},
	{
  	id:3,
  	url:"source://image/house_type.png",
  	title:"商品房",
  	href:"source://view/index/bannerTemplate.ui"
	},
  {
  	id:4,
  	url:"source://image/house_type.png",
  	title:"商品房",
  	href:""
	},
	{
		id:5,
		url:"source://image/house_type.png",
		title:"商品房",
		href:""
	}
];
typesData.addData(jsontypes);


//首页中部列图
var ImageData = mm("do_ListData");
var jsonImage = [
    {
    	id:1,
    	url:"source://image/index_banner1.png",
    	title:"商品房",
    	href:"source://view/index/bannerTemplate.ui"
	},
    {
    	id:2,
    	url:"source://image/index_banner1.png",
    	title:"商品房",
    	href:""
	},
	{
    	id:3,
    	url:"source://image/index_banner1.png",
    	title:"商品房",
    	href:"source://view/index/bannerTemplate.ui"
	},
    {
    	id:4,
    	url:"source://image/index_banner1.png",
    	title:"商品房",
    	href:""
	}
];
ImageData.addData(jsonImage);

//底部猜你喜欢
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
do_ListView_house.height = jsonHouse.length * 201;
houseData.addData(jsonHouse);

//页面加载完成渲染
do_Page.on("loaded",function(){
	do_SlideView_banner.bindItems(bannerData);
	do_VerticalSlideView_hot.bindItems(hotData);
	do_GridView_alltype.bindItems(typesData);
	do_GridView_image.bindItems(ImageData);
	do_ListView_house.bindItems(houseData);
	do_ListView_house.refreshItems();
})
