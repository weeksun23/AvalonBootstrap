define(["avalon.extend"],function(avalon){
	var widget = avalon.ui.tooltip = function(element, data, vmodels){
		var options = data.tooltipOptions;
		var tip;
		var vmodel = avalon.define(data.tooltipId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = ["position","content"];
			vm.$init = function(){
				avalon.bind(element,"mouseenter",function(e){
					if(!tip){
						tip = document.createElement("div");
						tip.className = "tooltip fade " + vmodel.position;
						tip.innerHTML = "<div class='tooltip-arrow'></div><div class='tooltip-inner'>"+vmodel.content+"</div>";
						document.body.appendChild(tip);
						tip.addEventListener(avalon.support.transitionend,function(){
							if(!avalon(this).hasClass("in") && tip){
								document.body.removeChild(tip);
								tip = null;
							}
						});
					}
					var $tip = avalon(tip);
					$tip.addClass("in");
					var $target = avalon(this);
					var offset = $target.offset();
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
				});
				avalon.bind(element,"mouseleave",function(e){
					avalon(tip).removeClass("in");
				});
				avalon.scan(element,[vmodel].concat(vmodels));
				element._tooltipVM = vmodel;
			};
			vm.$remove = function(){
				if(!tip) return;
				document.body.removeChild(tip);
				tip = null;
			};
		});
		return vmodel;
	};
	widget.defaults = {
		position  : "right",
		content : ""
	};
});