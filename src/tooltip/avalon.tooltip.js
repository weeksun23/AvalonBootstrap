//工具提示组件 一次性
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
var hideEventHandle;
avalon.directive('tooltip', {
	init : function () {
		var oldValue = this.getValue();
		var value = avalon.shadowCopy({},Defaults);
		if(avalon.type(oldValue) === 'array'){
			avalon.each(oldValue,function(i,v){
				avalon.shadowCopy(value,v);
			});
		}else{
			avalon.shadowCopy(value,oldValue);
		}
		var tip;
		var element = this.node.dom;
		if(value.triggerOn === 'hover'){
			var mouseenter = avalon.bind(element,"mouseenter",show);
			var mouseleave = avalon.bind(element,"mouseleave",hide);
		}else if(value.triggerOn === 'click'){
			var click = function(){
				if(hideEventHandle){
					avalon.unbind(document.body,"click",hideEventHandle);
					hideEventHandle = null;
				}
				if(tip){
					hide();
				}else{
					show();
					hideEventHandle = avalon.bind(document.body,"click",function(e){
						if(e.target === element) return false;
						if(AB.isSubNode(e.target,"popover")) return;
						click();
					});
				}
			};
			avalon.bind(element,"click",click);
		}
		function outTip(){
			value.container.removeChild(tip);
			tip = null;
		}
		function show(){
			if(!tip){
				tip = document.createElement("div");
				tip.className = value.type + " fade " + value.position;
				if(value.type === 'tooltip'){
					tip.innerHTML = "<div class='tooltip-arrow'></div><div class='tooltip-inner'>" + value.content + "</div>";
				}else if(value.type === 'popover'){
					var title = '';
					if(value.title){
						title = '<h3 class="popover-title">' + value.title + '</h3>';
					}
					tip.innerHTML = '<div class="arrow"></div>' + title + 
						'<div class="popover-content">' + value.content + '</div>';
				}
				value.container.appendChild(tip);
				avalon.scan(tip);
				AB.support.transitionend && tip.addEventListener(AB.support.transitionend,function(){
					if(!avalon(this).hasClass("in") && tip){
						outTip();
					}
				});
			}
			if(value.type === 'popover'){
				tip.style.display = 'block';
			}
			var $tip = avalon(tip);
			$tip.addClass("in");
			var $target = avalon(element);
			var offset = value.container === document.body ? $target.offset() : $target.position();
			switch(value.position){
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
			if(!AB.support.transitionend){
				outTip();
			}
		}
	}
});
