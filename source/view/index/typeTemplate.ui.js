/**
 * related to typeTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-01
 */
//引入组件库
var do_App = sm("do_App");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");

//绑定映射关系
root.setMapping({
	"do_Label_title.text":"name",
	"do_ALayout_root.tag":"id",
	"do_ImageView_image.source":"url"
})

//点击触发
do_ALayout_root.on("touch",function(){
	var id = do_ALayout_root.tag;
	do_App.openPage({
		source:"source://view/house/houseList.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
		data:JSON.stringify({label_id:id})
	});
})