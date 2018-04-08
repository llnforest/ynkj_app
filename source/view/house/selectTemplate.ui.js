/**
 * related to selectTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-02
 */
//声明UI变量
var do_Page = sm("do_Page");
var do_ALayout_root = ui("do_ALayout_root");
var do_GridView_search = ui("do_GridView_search");
var do_ALayout_search = ui("do_ALayout_search");
deviceone.print(111);
//声明成员变量
var listData = null;

//计算内容区域的高度
var totalHeight=parseInt(do_ALayout_search.height);
//定义展示UI的动画
var animShow = mm("do_Animator");
for (var i = 1; i <=100; i++) {
	animShow.append(0.8, {
            "height" : parseInt(totalHeight/100 * i)
    });
};
//定义收起UI的动画
var animHide = mm("do_Animator");
for (var i = 1; i <=100; i++) {
	animHide.append(0.8, {
		"height" : parseInt(totalHeight -totalHeight/100 * i)
    });
};

//初始时要隐藏
do_ALayout_root.visible = false;
//点击其它区域，则隐藏关闭当前View
do_ALayout_root.on("touch", function(){
	do_ALayout_search.animate(animHide, function(){
		do_ALayout_root.visible = false;
	});
	do_Page.fire("RemoveNavStatus");//订阅消除导航状态事件
});

//在当前页面下订阅ShowSelect自定义消息
do_Page.on("ShowSelect", function(data){
	if (listData != data){
		listData= data;
		deviceone.print("showSelect");
		do_GridView_search.bindItems(listData);
	}
	
	do_GridView_search.refreshItems();
	if(do_ALayout_root.visible){
		return false;
	}
	do_ALayout_search.height = 0;
	do_ALayout_search.redraw();
	do_ALayout_root.visible = true;
	do_ALayout_search.animate(animShow);
});

//在当前页面下订阅RefreshSelect自定义消息
do_Page.on("RefreshSelect", function(){
	do_GridView_search.refreshItems();
});

//在当前页面下订阅selectOneTab的事件
do_Page.on("SelectOneTab", function(data){
	if (do_ALayout_root.visible){
		do_ALayout_root.visible = false;
	}
});

