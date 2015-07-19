define(["text!./table.html","table/avalon.table"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			getSelected : function(){
				avalon.log(avalon.vmodels.$table1.getSelected());
			},
			getSelections : function(){
				avalon.log(avalon.vmodels.$table1.getSelections());
			},
			$table1Opts : {
				title : "test",
				singleSelect : true,
				columns : [
					{field : "a1",title : "a1",sort : true},
					{field : "a2",title : "a1"},
					{field : "a3",title : "a1"},
					{field : "a4",title : "a1"},
					{field : "a5",title : "a1"},
					{field : "a6",title : "a1"}
				],
				frontPageData : [{
					a1 : 33
				},{
					a1 : 33
				}]
			}
		});
		avalon.scan(node,vmodel);
	};
});