/**
 * related to searchTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-02
 */
//引入组件库
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_main=ui("do_ALayout_main");
var do_Label_search=ui("do_Label_search");

//设置数据绑定的映射关系
root.setMapping({
	"do_Label_search.text":"term",
	"do_Label_search.tag":"selected"
});

//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	var _selected= do_Label_search.tag;
	if (_selected == "1"){
		do_Label_search.fontColor="008c00ff";
	}
	else{
		do_Label_search.fontColor="8a8a8aff";	
	}
});

//按下当前cell的时候，在当前页面中发出selectOneTab事件
do_ALayout_main.on("touch", function(){
	do_Page.fire("SelectOneTab", {name:do_Label_search.text});
});