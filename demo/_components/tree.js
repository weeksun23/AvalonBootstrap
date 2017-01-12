var html = require("./tree.html");
avalon.define({
	$id : "demo_tree",
	$config : {
		is : "ms-tree",
		$url : 'treedata.json',
		checkbox : true,
		loadFilter : function(data){
			return {
				code : 1,
				data : data
			};
		},
		treeList : [{
			text : "asd"
		},{
			iconCls : "glyphicon-home",
			text : "asd"
		},{
			iconCls : "glyphicon-home",
			text : "asd"
		},{
			text : "asd",
			state : "open",
			children : [{
				text : "asd",
				state : "open",
				children : [{
					text : "asd"
				}]
			},{
				text : "asd1"
			},{
				text : "asd2"
			},{
				text : "asd3"
			}]
		},{
			text : "sdfwefwefwe"
		},{
			text : "asd",
			state : "open",
			children : [{
				text : "asd",
				state : "open",
				children : [{
					text : "asd"
				}]
			}]
		},{
			text : "asd",
			state : 'closed'
		}]
	}
});
module.exports = html;