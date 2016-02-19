define(["avalon"],function(avalon){
	var Defaults = {
		triggerOn : "hover",
		position  : "right",
		content : "",
		template : null,
		container : document.body,
		//tooltip popover
		type : "tooltip",
		//popover options
		title : ""
	};
	avalon.directive("tooltip",{
		init : function(binding){
			var expr = binding.expr;
			var element = binding.element;
			var setting = avalon.directive.getSetting(binding,Defaults);
			var targetVm = setting.targetVm;
			var options = setting.options;
			//销毁tooltip
			options.dispose = function(){
				targetVm && delete targetVm[expr];
				if(tip){
					tip.parentNode.removeChild(tip);
				}
				tip = null;
				mouseenter && avalon.unbind(element,'mouseenter',mouseenter);
				mouseleave && avalon.unbind(element,'mouseleave',mouseleave);
				click && avalon.unbind(element,'click',click);
				delete avalon.vmodels[this.$id];
			};
			options.$skipArray = [];
			var tipVm = avalon.define(options);
			//替换原来的配置对象 以便控制
			targetVm && (targetVm[expr] = tipVm);
			var tip;
			if(tipVm.triggerOn === 'hover'){
				var mouseenter = avalon.bind(element,"mouseenter",show);
				var mouseleave = avalon.bind(element,"mouseleave",hide);
			}else if(tipVm.triggerOn === 'click'){
				var click = avalon.bind(element,"click",function(){
					if(!tip || tip.style.display === 'none'){
						show.call(this);
					}else{
						hide.call(this);
					}
				});
			}
			function outTip(){
				if(tipVm.type === 'tooltip'){
					tipVm.container.removeChild(tip);
					tip = null;
				}else{
					tip.style.display = 'none';
				}
			}
			function show(){
				if(!tip){
					tip = document.createElement("div");
					tip.className = tipVm.type + " fade";
					tip.setAttribute("ms-class","{{position}}");
					if(!tipVm.template){
						if(tipVm.type === 'tooltip'){
							tipVm.template = "<div class='tooltip-arrow'></div><div class='tooltip-inner'>{{content | html}}</div>";
						}else if(tipVm.type === 'popover'){
							tipVm.template = '<div class="arrow"></div><h3 class="popover-title" ms-if="title">{{title | html}}</h3><div class="popover-content">{{content | html}}</div>';
						}
					}
					tip.innerHTML = tipVm.template;
					tipVm.container.appendChild(tip);
					avalon.scan(tip,tipVm);
					avalon.support.transitionend && tip.addEventListener(avalon.support.transitionend,function(){
						if(!avalon(this).hasClass("in") && tip){
							outTip();
						}
					});
				}
				if(tipVm.type === 'popover'){
					tip.style.display = 'block';
				}
				var $tip = avalon(tip);
				$tip.addClass("in");
				var $target = avalon(this);
				var offset = tipVm.container === document.body ? $target.offset() : $target.position();
				switch(tipVm.position){
					case "top":
						var top = offset.top - $tip.outerHeight();
						var left = offset.left + ($target.outerWidth() - $tip.outerWidth()) / 2;
						break;
					case "left":
						top = offset.top + ($target.outerHeight() - $tip.outerHeight()) / 2;
						left = offset.left - $tip.outerWidth();
						break;
					case "right":
						top = offset.top - ($tip.outerHeight() - $target.outerHeight()) / 2;
						left = offset.left + $target.outerWidth();
						break;
					case "bottom":
						top = offset.top + $target.outerHeight();
						left = offset.left + ($target.outerWidth() - $tip.outerWidth()) / 2;
						break;
				}
				tip.style.left = left + "px";
				tip.style.top = top + "px";
			}
			function hide(){
				avalon(tip).removeClass("in");
				if(!avalon.support.transitionend){
					outTip();
				}
			}
		}
	});
});