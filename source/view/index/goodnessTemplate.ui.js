/**
 * related to goodnessTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-01
 */
//引入组件库
var do_App = sm("do_App");
var do_Page = sm("do_Page");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI

var do_Label_title = ui("do_Label_title");
//绑定映射关系
root.setMapping({
	"do_Label_title.text":"name",
	"do_Label_title.bgColor":"color",
})

