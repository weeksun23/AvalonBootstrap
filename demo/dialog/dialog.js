define(["text!./dialog.html","dialog/avalon.dialog"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			show : function(){
				avalon.vmodels.$dialog1.open();
			},
			$dialog1Opts : {
				title : "dialog1",
				show2 : function(){
					avalon.vmodels.$dialog2.open();
				},
				buttons : [{
					text : "确定",
					handler : function(){
						
					}
				},{
					text : "取消",
					close : true
				}]
			},
			$dialog2Opts : {
				title : "dialog2",
				buttons : [{
					text : "取消",close : true
				}]
			}
		});
		avalon.scan(node,vmodel);
	};
});