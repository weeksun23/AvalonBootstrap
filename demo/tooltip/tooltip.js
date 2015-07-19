define(["text!./tooltip.html","tooltip/avalon.tooltip"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date
		});
		avalon.scan(node,vmodel);
	};
});