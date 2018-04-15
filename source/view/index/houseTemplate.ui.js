/**
 * related to houseTemplate.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-01
 */
//引入组件库
var do_App = sm("do_App");

//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_Label_fangxing = ui("do_Label_fangxing");
var do_Label_mianji = ui("do_Label_mianji");
var do_Label_chaoxiang = ui("do_Label_chaoxiang");
var do_Label_chaoxianglabel = ui("do_Label_chaoxianglabel");
var do_Label_mianjilabel = ui("do_Label_mianjilabel");
var do_Label_fangxinglabel = ui("do_Label_fangxinglabel");
//绑定映射关系
root.setMapping({
	"do_Label_title.text":"title",
	"do_Label_fangxing.text":"fangxing_name",
	"do_Label_mianji.text":"mianji",
	"do_Label_chaoxiang.text":"chaoxiang",
	"do_Label_xiaoqu.text":"xiaoqu",
	"do_Label_avg_price.text":"per_price",
	"do_Label_price.text":"price",
	"do_ALayout_root.tag":"id",
	"do_GridView_goodness.items":"betterList",
	"do_ImageView_image.source":"url",
})

//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	var _fangxing = do_Label_fangxing.text;
	var _mianji = do_Label_mianji.text;
	var _chaoxiang = do_Label_chaoxiang.text;
	if (_fangxing == ""){
		do_Label_fangxinglabel.visible = false;
	}
	if (_chaoxiang == ""){
		do_Label_chaoxianglabel.visible = false;
	}
	if (_mianji == ""){
		do_Label_mianjilabel.visible = false;
	}
})

//点击触发
do_ALayout_root.on("touch",function(){
	var id = do_ALayout_root.tag;
	if(id){
		do_App.openPage({
			source:"source://view/house/house.ui", 
			animationType:"push_r2l", //动画效果：从右向左推出
			statusBarState:"transparent",
			data:JSON.stringify({id:id})
		});
	}
})