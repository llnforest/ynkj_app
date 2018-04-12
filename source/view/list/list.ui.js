/**
 * related to list.ui
 * 
 * @Author : llnforest
 * @Timestamp : 2018-04-04
 */
//引入组件库
var do_Page = sm("do_Page");
var do_App = sm("do_App");
var do_Notification = sm("do_Notification");
var do_DataCache = sm("do_DataCache");
//声明UI变量
var root=ui("$");  //$表示当前视图的根UI
var do_ALayout_root=ui("do_ALayout_root");
var do_ListView_list=ui("do_ListView_list");
//定义do_ListView_list的数据model
var listData = mm("do_ListData");
//定义变量
var type_id;
var pageNum=0;

//设置数据绑定的映射关系
root.setMapping({
	"do_ALayout_root.tag":"id",
	"do_ListView_list.templates":"template"
});


var reserveJson = [
   {
	   name:"您已预约2018年10月1号和经纪人小陈看房凯旋门小区二手房"
    },
    {
 	   name:"您已预约2018年10月1号和经纪人小陈看房凯旋门小区二手房"
     },
     {
  	   name:"您已预约2018年10月1号和经纪人小陈看房凯旋门小区二手房"
      },
      {
   	   name:"您已预约2018年10月1号和经纪人小陈看房凯旋门小区二手房"
       },
       {
    	   name:"您已预约2018年10月1号和经纪人小陈看房凯旋门小区二手房"
        }
    ];
var recordJson = [
       {
    	   name:"您已于2018年10月1号和经纪人小陈看房民主湖畔小区二手房"
        },
        {
     	   name:"您已于2018年10月1号和经纪人小陈看房民主湖畔小区二手房"
         },
         {
      	   name:"您已于2018年10月1号区二手房"
          },
          {
       	   name:"您已于2018年10月1号和经纪人小陈看房民主湖畔小区二手房"
           },
           {
        	   name:"您已于2018年10月1号小区二手房"
            }
        ];
var noticeJson = [
       {
    	   name:"您已于2018年10月1号关注凯旋门小区二手房"
        },
        {
     	   name:"您已于2018年10月1号关注凯旋门小区二手房"
         },
         {
      	   name:"您已于2018年10月1号关注凯旋门小区二手房"
          },
          {
       	   name:"您已于2018年10月1号关注凯旋门小区二手房"
           },
           {
        	   name:"您已于2018年10月1号关注凯旋门小区二手房"
            }
        ];
//给do_ListView_list绑定数据
do_ListView_list.bindItems(listData);
//刷新数据
function refreshAllData(){
	do_ListView_list.rebound();
	if(type_id == 1) var json = reserveJson;
	else if(type_id == 2) var json = recordJson;
	else if(type_id == 3) var json = noticeJson;
	listData.addData(json)
	do_ListView_list.refreshItems();
}

//刷新数据
function getNextPageData(){
	do_ListView_list.rebound();
	if(type_id == 1) var json = reserveJson;
	else if(type_id == 2) var json = recordJson;
	else if(type_id == 3) var json = noticeJson;
	listData.addData(json)
	do_ListView_list.refreshItems();
}

//订阅每次绑定数据后的事件
root.on("dataRefreshed", function(){
	type_id= do_ALayout_root.tag;
	deviceone.print("refresh");
	//先尝试加载本地数据
	var data= do_DataCache.loadData(type_id);
	if (data != null && data.length > 0){
		deviceone.print("cache"+type_id);
		listData.removeAll();
		listData.addData(data);
		//do_ListView_list刷新显示
	    do_ListView_list.refreshItems();
	    return false;
	}
	//更新远程最新数据
	refreshAllData();
});


//上拉列表，翻页数据
do_ListView_list.on("push", function(data){
	//其中state=0：表示开始上推headerview，；state=1：表示上推headerview超过headerview的高度，触发一次这个事件；state=2：上推超过一定值，触发state=1事件后，松手会触发一次这个事件，数据加载完后需要调用rebound方法让header复位
	if (data.state == 2){		
		getNextPageData();
	}
});

//点击一条列表
do_ListView_list.on("touch", function(data){
		var onNews=listData.getOne(data);
		do_App.openPage({
			source:"source://view/house/detail.ui", 
			animationType:"push_r2l", //动画效果：从右向左推出
			statusBarState:"transparent",
//			data:JSON.stringify({title:onNews.title, url:onNews.url}) //传递页面之间的参数
		});
});