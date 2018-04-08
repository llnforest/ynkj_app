/**
 * related to demo.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-01
 */
var do_Page = sm("do_Page");
var do_SegmentView_nav = ui("do_SegmentView_nav");

var quyuJson = [
		       {id:1,term:"蜀山区",select:0},
		       {id:2,term:"庐阳区",select:0},
		       {id:3,term:"包河区",select:0},
		       {id:4,term:"瑶海区",select:0},
		       {id:5,term:"蜀山区",select:0},
		       {id:6,term:"庐阳区",select:0},
		       {id:7,term:"包河区",select:0},
		       {id:8,term:"瑶海区",select:0},
		];

var quyuData = mm("do_ListData");
quyuData.addData(quyuJson);

//页面加载完成渲染
do_Page.on("loaded",function(){
	do_SegmentView_nav.bindItems(quyuData);
})