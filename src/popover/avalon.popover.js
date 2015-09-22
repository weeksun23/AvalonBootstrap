define(["avalon","tooltip/avalon.tooltip"],function(avalon){
	var widget = avalon.ui.popover = function(element, data, vmodels){
		var vmodel = avalon.ui.tooltip(element,{
			tooltipId : data.popoverId,
			tooltipOptions : data.popoverOptions
		},vmodels);
		return vmodel;
	};
	widget.defaults = avalon.mix({},avalon.ui.tooltip.defaults,{
		type : "popover",
		title : "",
		triggerOn : "click",
		template : '<div class="arrow"></div><h3 class="popover-title" ms-if="title">{{title | html}}</h3><div class="popover-content">{{content | html}}</div>'
	});
});