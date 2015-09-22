define(["avalon"],function(avalon){
	var lastDropdown;
	var widget = avalon.ui.dropdown = function(element, data, vmodels){
		var options = data.dropdownOptions;
		var vmodel = avalon.define(data.dropdownId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = [''];
			vm.$init = function(){
				var $p = avalon(element.parentNode);
				$p.addClass("dropdown");
				$p.attr("ms-class","open:show");
				$p.appendHTML("<ul class='dropdown-menu'>" +
					"<li ms-repeat='data' ms-class='divider:el.text === \"-\"'>" +
						"<a ms-if='el.text !== \"-\"' href='javascript:void(0)' ms-click='clickMenu(el)'>"+
							"<i ms-if='el.iconCls' class='glyphicon' ms-class='{{el.iconCls}}'></i> {{el.text}}"+
						"</a>" +
					"</li>" +
				"</ul>");
				avalon.bind(element,'click',function(e){
					if(lastDropdown){
						lastDropdown.show = false;
						lastDropdown = null;
					}
					if(!vmodel.show){
						lastDropdown = vmodel;
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
			vm.clickMenu = function(el){
				el.handler && el.handler.call(this,el,vmodel);
			};
		});
		return vmodel;
	};
	widget.defaults = {
		data : [],
		show : false
	};
});