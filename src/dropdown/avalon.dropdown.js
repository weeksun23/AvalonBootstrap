define(["avalon.extend"],function(avalon){
	var Defaults = {
		data : [],
		show : false
	};
	var lastDropdown;
	avalon.directive("dropdown",{
		init : function(binding){
			var element = binding.element;
			var $p = avalon(element.parentNode);
			$p.addClass("dropdown");
			var ul = document.createElement("ul");
			ul.setAttribute("ms-visible","show");
			ul.className = "dropdown-menu";
			ul.innerHTML = "<li ms-repeat='data' ms-class='divider:el.text === \"-\"'>" +
					"<a ms-if='el.text !== \"-\"' href='javascript:void(0)' ms-click='clickMenu(el)'>"+
						"<i ms-if='el.iconCls' class='glyphicon' ms-class='{{el.iconCls}}'></i> {{el.text}}"+
					"</a>" +
				"</li>";
			element.parentNode.appendChild(ul);
			var setting = avalon.directive.getSetting(binding,Defaults);
			setting.options.clickMenu = function(el){
				el.handler && el.handler.call(this,el,vmodel);
			};
			var targetVm = setting.targetVm;
			var vmodel = avalon.define(setting.options);
			//替换原来的配置对象 以便控制
			targetVm && (targetVm[binding.expr] = vmodel);
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
			avalon.scan(ul,vmodel);
		}
	});
});