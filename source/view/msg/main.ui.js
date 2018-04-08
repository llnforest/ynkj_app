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
var do_ListView_msg = ui("do_ListView_msg");


//下拉
do_ListView_msg.on("push",function(data){
	if(data.state == 2){
		getNextPage();
	}
})

function getNextPage(){
	deviceone.print("push");
	do_ListView_msg.rebound();
	msgData.addData(msgJson);
	do_ListView_msg.refreshItems();
}


//列表
var msgData = mm("do_ListData");
var msgJson = [
    {
	  	id:1,
	  	title:"最新消息铜冠花园大四房，只要150万",
	},
	{
	  	id:2,
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	},
	{
	  	id:3,
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	},
	{
	  	id:4,
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	},
	{
		id:5,
	  	title:"铜冠花园大四房，只要150万，急售！急售！急售！急售！急售！急售！急售！急售！",
	}
];
msgData.addData(msgJson);
do_ListView_msg.bindItems(msgData);
