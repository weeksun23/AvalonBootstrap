define(["avalon.extend","text!./avalon.tab.html"],function(avalon,templete){
	var widget = avalon.ui.tab = function(element, data, vmodels){
		var options = data.tabOptions;
		var children = avalon(element).children();
		if(children.length > 0){
			var headerData = options.headerData = [];
			var contentData = options.contentData = [];
			avalon.each(children,function(i,v){
				var obj = {
					title : v.title
				};
				obj.iconCls = v.getAttribute("data-iconCls");
				obj.closeable = v.getAttribute("data-closeable") !== null;
				headerData.push(obj);
				contentData.push({
					html : v.innerHTML,
					$init : false
				});
			});
		}
		var vmodel = avalon.define(data.tabId,function(vm){
			avalon.mix(vm,options);
			vm.widgetElement = element;
			vm.$skipArray = ['widgetElement'];
			vm.$init = function(){
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				vmodel.curIndex = 0;
				vmodel.onInit && vmodel.onInit.call(element, vmodel, vmodels);
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
			vm.$clickHeader = function(i){
				vmodel.curIndex = i;
			};
			vm.add = function(obj){
				vmodel.headerData.push(avalon.mix({
					closeable : false,
					iconCls : null,
					title : '',
					icons : []
				},obj.header));
				vmodel.contentData.push(avalon.mix({
					html : null,
					$init : false
				},obj.content));
				if(obj.selected){
					vmodel.curIndex = vmodel.headerData.length - 1;
				}
			};
			vm.$closeTab = function(e,i){
				e.stopPropagation();
				vmodel.headerData.removeAt(i);
				vmodel.contentData.removeAt(i);
				var len = vmodel.headerData.length;
				if(i === vmodel.curIndex){
					if(i === len){
						var sel = len - 1;
					}else{
						sel = i;
					}
					if(vmodel.curIndex === sel){
						vmodel.$fire("curIndex",sel);
					}else{
						vmodel.curIndex = sel;
					}
				}else if(i < vmodel.curIndex){
					vmodel.curIndex--;
				}
				vmodel.onClose.call(element,vmodel);
			};
			vm.getTab = function(p){
				var headerData = vmodel.headerData;
				if(typeof p == 'string'){
					//根据标题获取tab
					for(var i=0,ii=headerData.length;i<ii;i++){
						if(headerData[i].title === p){
							return {
								index : i,
								header : headerData[i],
								content : vmodel.contentData[i]
							};
						}
					}
					return null;
				}else{
					//根据索引获取tab
					var header = headerData[p];
					return header ? {
						header : header,
						content : vmodel.contentData[p]
					} : null;
				}
			};
		});
		vmodel.$watch("curIndex",function(newVal,oldVal){
			var content = vmodel.contentData[newVal];
			if(content){
				vmodel.onSelect(vmodel.headerData[newVal],content,newVal);
				content.$init = true;
			}
		});
		return vmodel;
	};
	widget.version = 1.0;
	widget.defaults = {
		curIndex : -1,
		onInit : avalon.noop,
		onSelect : avalon.noop,
		onClose : avalon.noop,
		/*
		title : 标题,
		iconCls : 标题左边的图标,
		icons : [],
		closeable : 是否可关闭
		*/
		headerData : [],
		/*
		html : 内容html,$init : 若为false则是第一次打开
		*/
		contentData : [],
		noContentTip : "暂无数据"
	};
});