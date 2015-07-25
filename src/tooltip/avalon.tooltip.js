define(["avalon.extend"],function(avalon){
	var widget = avalon.ui.tooltip = function(element, data, vmodels){
		var options = data.tooltipOptions;
		var tip;
		if(typeof options.container == 'string'){
			options.container = document.getElementById(options.container);
		}
		var vmodel = avalon.define(data.tooltipId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = ['template','container','type'];
			vm.$init = function(){
				if(vmodel.triggerOn === 'hover'){
					avalon.bind(element,"mouseenter",show);
					avalon.bind(element,"mouseleave",hide);
				}else if(vmodel.triggerOn === 'click'){
					avalon.bind(element,"click",function(){
						if(!tip || tip.style.display === 'none'){
							show.call(element);
						}else{
							hide.call(element);
						}
					});
				}
				element._tooltipVM = vmodel;
			};
			vm.$remove = function(){
				if(!tip) return;
				vmodel.container.removeChild(tip);
				element._tooltipVM = null;
				tip = null;
			};
		});
		function outTip(){
			if(vmodel.type === 'tooltip'){
				vmodel.container.removeChild(tip);
				tip = null;
			}else{
				tip.style.display = 'none';
			}
		}
		function show(){
			if(!tip){
				tip = document.createElement("div");
				tip.className = vmodel.type + " fade";
				tip.setAttribute("ms-class","{{position}}");
				tip.innerHTML = vmodel.template;
				vmodel.container.appendChild(tip);
				avalon.scan(tip,vmodel);
				avalon.support.transitionend && tip.addEventListener(avalon.support.transitionend,function(){
					if(!avalon(this).hasClass("in") && tip){
						outTip();
					}
				});
			}
			if(vmodel.type === 'popover'){
				tip.style.display = 'block';
			}
			var $tip = avalon(tip);
			$tip.addClass("in");
			var $target = avalon(this);
			var offset = vmodel.container === document.body ? $target.offset() : $target.position();
			switch(vmodel.position){
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
		return vmodel;
	};
	widget.defaults = {
		type : 'tooltip',
		triggerOn : "hover",
		position  : "right",
		content : "",
		template : "<div class='tooltip-arrow'></div><div class='tooltip-inner'>{{content | html}}</div>",
		container : document.body
	};
});