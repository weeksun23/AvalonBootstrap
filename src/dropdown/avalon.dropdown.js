define(["avalon.extend"],function(avalon){
	var widget = avalon.ui.dropdown = function(element, data, vmodels){
		var options = data.dropdownOptions;
		var vmodel = avalon.define(data.dropdownId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = [''];
			vm.$init = function(){
				var $p = avalon(element.parentNode);
				$p.addClass("dropdown");
				$p.attr("ms-class","open:show");
				$p.appendHTML("<ul class='dropdown-menu'>"+
					"<li ms-repeat='data'><a href='javascript:void(0)'><i ms-if='el.iconCls' class='glyphicon' ms-class='{{el.iconCls}}'></i> {{el.text}}</a></li>"+
				"</ul>");
				avalon.bind(element,'click',function(e){
					if(!vmodel.show){
						vmodel.show = true;
						var fn = avalon.bind(document,"click",function(){
							vmodel.show = false;
							avalon.unbind(document,"click",fn);
						});
					}
					e.stopPropagation();
				});
				avalon.scan(element.parentNode,vmodel);
			};
		});
		return vmodel;
	};
	widget.defaults = {
		data : [],
		show : false
	};
});