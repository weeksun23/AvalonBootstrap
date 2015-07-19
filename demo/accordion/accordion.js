define(["text!./accordion.html","accordion/avalon.accordion"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			$opts1 : {},
			$accordionOpts : {
				data : [{
					title : "34t34tetr",
					content : "wef33r43344e"
				},{
					title : "thrttrt",
					content : "wef33r43344e"
				}]
			},
			$accordion1Opts : {
				data : [{
					title : "34t34tetr",
					children : [{
						title : "dffgs",
						iconCls : "glyphicon-music"
					},{
						title : "dffgs",
						iconCls : "glyphicon-remove"
					},{
						title : "dffgs",
						iconCls : "glyphicon-music"
					}]
				},{
					title : "thrttrt",
					children : [{
						title : "dffgs",
						iconCls : "glyphicon-music"
					},{
						title : "dffgs",
						iconCls : "glyphicon-remove"
					},{
						title : "dffgs",
						iconCls : "glyphicon-music"
					}]
				}]
			}
		});
		avalon.scan(node,vmodel);
	};
});