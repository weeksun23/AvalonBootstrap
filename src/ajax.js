var reqwest = require("./reqwest");
var defaultSetting = {
	crossOrigin : true,
	withCredentials : false
};
function doAjax(url,param,callback,loadingArea,setting,method){
	param = param || {};
	if(loadingArea !== null){
		var $loadingArea = avalon(loadingArea || document.body);
	}
	$loadingArea && $loadingArea.loading(true);
	avalon.log("发送参数",url,param);
	setting = avalon.mix({
		url : url,
		data : param,
		type : 'json',
		error : function(){
			$loadingArea && $loadingArea.loading();
			avalon.log('接收错误',url,arguments);
			callback && callback({
				code : -1,
				desc : "服务器错误"
			});
		},
		success : function(resp){
			$loadingArea && $loadingArea.loading();
			avalon.log("接收数据",url,resp);
			try{
				if(callback){
					callback(resp);
				}
			}catch(ex){
				avalon.log(ex);
			}
		}
	},defaultSetting,setting);
	setting.method = method;
	reqwest(setting);
}
avalon.ajaxPost = function(url,param,callback,loadingArea,setting){
	doAjax(url,param,callback,loadingArea,setting,"POST");
};
avalon.ajaxGet = function(url,param,callback,loadingArea,setting){
	doAjax(url,param,callback,loadingArea,setting,"GET");
};