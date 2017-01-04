define(["avalon","text!./avalon.tab.html"],function(avalon,template){
	avalon.component("ab:tab",{
		$template: template,
		$replace : true,
		$construct : function(opts,vmOpts,elemOpts){
			var children = avalon(this).children();
			if(children.length > 0){
				var headerData = vmOpts.headerData = [];
				var contentData = vmOpts.contentData = [];
				avalon.each(children,function(i,v){
					var obj = {
						title : v.title,
						icons : []
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
			return avalon.mix(opts,vmOpts,elemOpts);
		},
		$ready : function(vmodel,element){
			vmodel.curIndex = 0;
			vmodel.$clickHeader = function(i){
				vmodel.curIndex = i;
			};
			vmodel.add = function(obj){
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
			vmodel.$closeTab = function(e,i){
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
			vmodel.getTab = function(p){
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
		},
		$skipArray : [],
		//属性
		curIndex : -1,
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
		noContentTip : "暂无数据",
		//方法
		$clickHeader : avalon.noop,
		add : avalon.noop,
		$closeTab : avalon.noop,
		getTab : avalon.noop,
		//事件
		onSelect : avalon.noop,
		onClose : avalon.noop
	});
});