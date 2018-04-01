/**
 * @Author : llnforest
 * @Timestamp : 2018-03-31
 */
var deviceone = require("deviceone");
var app = deviceone.sm("do_App");

app.on("loaded", function () {
	app.openPage({
		source:"source://view/house/house.ui",
		statusBarState:"transparent",
		animationType:"fade"
	});
});500