/**
 * related to main.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-03-28
 */
var do_External = sm("do_External");
var do_App = sm("do_App");

var do_ALayout_contact = ui("do_ALayout_contact");
var do_ALayout_request = ui("do_ALayout_request");

//需求发布
do_ALayout_request.on("touch",function(){
	do_App.openPage({
		source:"source://view/user/request.ui", 
		animationType:"push_r2l", //动画效果：从右向左推出
		statusBarState:"transparent",
	});
})

//联系客服
do_ALayout_contact.on("touch",function(){
	do_External.openDial("13585788049");
})
