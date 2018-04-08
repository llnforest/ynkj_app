/**
 * related to main.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-03-28
 */
var do_Notification = sm("do_Notification");
var do_Global = sm("do_Global");
var do_App = sm("do_App");
var do_Page = sm("do_Page");

//声明变量
var do_SegmentView_nav = ui("do_SegmentView_nav");
var do_SlideView_list = ui("do_SlideView_list");


//列表
var navJson = [
    {
	  	id:1,
	  	name:"预约记录",
	  	selected:1,
	  	template:"source://view/list/reserveTemplate.ui",
	},
	{
	  	id:2,
	  	name:"看房记录",
	  	selected:0,
	  	template:"source://view/list/recordTemplate.ui",
	},
	{
	  	id:3,
	  	name:"我的关注",
	  	selected:0,
	  	template:"source://view/list/noticeTemplate.ui",
	},
	
];
var slideJson = navJson;

var navData = mm("do_ListData");
navData.addData(navJson);
do_SegmentView_nav.bindItems(navData);

var slideJson = navJson;
var slideData = mm("do_ListData");
slideData.addData(slideJson);
do_SlideView_list.bindItems(slideData);

//在当前页面下订阅SelectOneTab的事件
do_Page.on("SelectOneTab", function(data){
	var _selectedIndex=-1;
	for(var i=0; i<navJson.length;i++){
		if (navJson[i].id == data.id){
			_selectedIndex =i;
			navData.updateOne(i, 
				{
					id:navJson[i],
				    name : navJson[i].name,
				    selected : 1,
				    template : navJson[i].template
				}
			);
		}
		else{
			navData.updateOne(i, 
				{
					id:navJson[i],
				    name : navJson[i].name,
				    selected : 0,
				    template : navJson[i].template
				}
			);
		}
	}

	//do_SegmentView_tabs重新绑定数据
	do_SegmentView_nav.refreshItems();
	//移动当选中的cell上
	if (_selectedIndex >=0)	{
		do_SegmentView_tabs.index = _selectedIndex;	
		do_SlideView_news.index = _selectedIndex;
	}
});


//当do_SlideView_news变化时，同步do_SegmentView_tabs
do_SlideView_list.on("indexChanged", function(index) {
	do_Page.fire("selectOneTab", {id:slideJson[index].id});
})