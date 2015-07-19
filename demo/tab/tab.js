define(["text!./tab.html","tab/avalon.tab"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			tabOpts : {
				border : true
			}
		});
		avalon.scan(node,vmodel);
	};
});