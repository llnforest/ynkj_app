/**
 * related to listNavTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-04
 */
deviceone.print(1);
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_Label_title=ui("do_Label_title");

deviceone.print(1);
//设置数据绑定的映射关系
root.setMapping({
	"do_Label_title.text":"name",
	"do_Label_title.tag":"selected",
	"do_ALayout_root.tag":"id",
});
deviceone.print(2);
//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	var _selected= do_Label_title.tag;
	if (_selected == "1"){
		do_Label_title.fontColor="008c00ff";
		do_Label_title.fontSize = "37"
	}
	else{
		do_Label_title.fontColor="8a8a8aff";	
	}
});

//按下当前cell的时候，在当前页面中发出selectOneTab事件
do_ALayout_root.on("touch", function(){
	do_Page.fire("SelectOneTab", {id:do_ALayout_root.tag});
});