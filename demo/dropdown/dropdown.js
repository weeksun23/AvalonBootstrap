define(["text!./dropdown.html","dropdown/avalon.dropdown"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			$dropdownOpts : {
				data : [{
					text : "sadasw",iconCls : "glyphicon-refresh",handler : function(){
						console.log(arguments);
					}
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				}]
			},
			$dropdown2Opts : {
				data : [{
					text : "sadasw",iconCls : "glyphicon-refresh",handler : function(){
						console.log(arguments);
					}
				},{
					text : "-"
				},{
					text : "2343r",iconCls : "glyphicon-refresh"
				},{
					text : "-"
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				},{
					text : "sadasw",iconCls : "glyphicon-refresh"
				}]
			}
		});
		avalon.scan(node,vmodel);
	};
});