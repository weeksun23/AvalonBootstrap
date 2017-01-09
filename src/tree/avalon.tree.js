require("./avalon.tree.css");
var tpl = require("./avalon.tree.html");
var rootTpl = tpl.replace("MS_OPTIONS_NODELIST",":for=\"($index,el) in @treeList\"");
var childrenTpl = tpl.replace("MS_OPTIONS_NODELIST",":for=\"($index,el) in el.children\"");
var nodeAttr = {
	id : "",
	iconCls : "",
	openIconCls : "",
	text : "",
	loading : false,
	selected : false,
	checked : 0,
	chLoaded : false,
	state : '',
	children : []
};
//初始化节点属性
function initNodeAttr(item){
	if(!item.children){
		item.children = [];
	}
	//是否已加载子节点标志
	item.chLoaded = item.state === 'open';
	if(item.children.length){
		if(item.state !== 'open'){
			item.state = 'closed';
		}
	}else{
		if(item.state !== 'closed'){
			item.state = '';
		}
	}
	for(var j in nodeAttr){
		if(item[j] === undefined){
			item[j] = nodeAttr[j];
		}
	}
}
//遍历list中的所有节点，若传入回调则执行回调，否则初始化节点属性
function eachNode(list,func){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if(!item) continue;
		if(func){
			if(func(item,i,list) === false){
				return false;
			}
		}else{
			initNodeAttr(item);
		}
		var ch = item.children;
		if(ch && ch.length > 0 && eachNode(ch,func) === false){
			return false;
		}
	}
}
//查找指定节点并执行回调
function findNode(list,target,func){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if((typeof target == 'object' && target === item) || item.id === target){
			func(item,i,list);
			return false;
		}
		if(item.children && findNode(item.children,target,func) === false){
			return false;
		}
	}
}
//获取target的所有父节点
function getParents(list,target,pArr){
	for(var i=0,ii=list.length;i<ii;i++){
		var item = list[i];
		if((typeof target == 'object' && target === item) || item.id === target){
			return false;
		}
		var ch = item.children;
		if(ch.length > 0){
			pArr.push(item);
			if(getParents(ch,target,pArr) === false){
				return false;
			}
		}
	}
	pArr.pop();
}
//遍历所有父节点 查看其下所有子节点是否都没有勾选，若是则置为反选
function eachParentsUncheck(pArr){
	for(var i=pArr.length - 1;i>=0;i--){
		var p = pArr[i];
		var flag = 0;
		eachNode(p.children,function(el){
			if(el.checked === 1){
				flag = 2;
				return false;
			}
		});
		p.checked = flag;
	}
}
function ajaxLoad(el,vmodel,func){
	var callBackEl = el;
	if(!el){
		//如果节点为空 则说明树节点还没创建加载根数据
		callBackEl = null;
		el = {
			id : null
		};
	}
	var param = {id : el.id};
	avalon.mix(param,vmodel.$queryParams);
	if(vmodel.onBeforeLoad(param,callBackEl) === false){
		return;
	}
	el.loading = true;
	vmodel.loader(param,function(resp){
		el.loading = false;
		resp = vmodel.loadFilter(resp,callBackEl);
		if(!resp || resp.code === undefined){
			return avalon.warn("获取树数据的接口必须返回带有code属性的对象，树数据放在data中");
		}
		vmodel.onLoadComplete(resp,callBackEl);
		if(resp.code === 1){
			var ch = resp.data;
			if(callBackEl){
				el.state = 'open';
				if(vmodel.checkbox && vmodel.$cascadeCheck){
					//如果存在勾选框且有级联检查
					eachNode(ch,function(item){
						initNodeAttr(item);
						item.checked = el.checked === 2 ? 0 : el.checked;
					},el);
				}else{
					eachNode(ch);
				}
				el.children = ch;
				if(!el.chLoaded){
					el.chLoaded = true;
				}
			}else{
				eachNode(ch);
				vmodel.treeList = ch
				func && func();
			}
			vmodel.onLoadSuccess(ch,callBackEl);
		}else{
			vmodel.onLoadError(resp.msg,callBackEl);
		}
	});
}
function expandNode(vmodel,el){
	if(vmodel.onBeforeExpand(el) === false){
		return;
	}
	if(el.children && el.children.length){
		if(el.state === 'closed'){
			el.state = 'open';
		}
		if(!el.chLoaded){
			el.chLoaded = true;
		}
	}else if(vmodel.$url){
		ajaxLoad(el,vmodel);
	}
	vmodel.onExpand(el);
}
function collapseNode(vmodel,el){
	if(vmodel.onBeforeCollapse(el) === false){
		return;
	}
	el.state = 'closed';
	vmodel.onCollapse(el);
}
function toggleElState(vmodel,el,state){
	if(!el.state) return;
	if(state === 'open'){
		el.state === 'closed' && expandNode(vmodel,el);
	}else{
		el.state === 'open' && collapseNode(vmodel,el);
	}
}
/*
展开节点 如果节点的子节点数>0则直接展开，否则根据url异步加载数据
*/
function toggleOpenExpand(vmodel,el){
	if(!el.state) return;
	if(el.loading) return;
	if(el.state === 'closed'){
		expandNode(vmodel,el);
	}else{
		collapseNode(vmodel,el);
	}
}
//勾选或反选节点
function toggleCheck(vmodel,el,checked){
	if(checked === undefined){
		var _checked = el.checked;
		if(_checked === 1){
			checked = el.checked = 0;
		}else{
			checked = el.checked = 1;
		}
	}else{
		el.checked = checked;
	}
	if(vmodel.$cascadeCheck){
		if(el.children.length){
			//勾选或反选所有子节点
			eachNode(el.children,function(item){
				item.checked = checked;
			});
		}
		var pArr = [];
		getParents(vmodel.treeList,el,pArr);
		if(checked === 1){
			//如果是勾选 则将所有父节点置为预选状态
			avalon.each(pArr,function(i,p){
				p.checked = 2;
			});
		}else{
			eachParentsUncheck(pArr);
		}
	}
}
//往上查找节点 直到找到nodecontent 执行回调
function findNodeContent(target,func){
	if(target.getAttribute("data-type") === "nodeContent"){
		func(target.parentNode["data-el"]);
	}else{
		var pNode = target.parentNode;
		while(pNode.tagName.toUpperCase() !== 'BODY'){
			if(pNode.getAttribute("data-type") === "nodeContent"){
				func(pNode.parentNode["data-el"]);
				return;
			}
			pNode = pNode.parentNode;
		}
	}
}
function selectNode(el,vmodel){
	var curSelEl = selectNode.curSelEl;
	if(vmodel.onBeforeSelect(el) === false){
		return;
	}
	if(curSelEl){
		curSelEl.selected = false;
	}
	if(curSelEl === el) return;
	el.selected = true;
	vmodel.onSelect(selectNode.curSelEl = el);
}
AB.preHandlers["ms-tree"] = function(vm){
	eachNode(vm.treeList);
};
avalon.component('ms-tree', {
  template: "<ul class='tree'>" + rootTpl + "</ul>",
  defaults: {
  	getChildrenTpl : function(el){
  		if(el.chLoaded && el.children && el.children.length){
  			return childrenTpl;
  		}
  	},
		toggleOpenExpand : function(el){
			if(!el.state) return;
			if(el.loading) return;
			if(el.state === 'closed'){
				expandNode(this,el);
			}else{
				collapseNode(this,el);
			}
		},
		clickContent : function(el){
			selectNode(el,this);
		},
		/****************************方法****************************/
		toggleCheck : function(el,checked){
			toggleCheck(this,el,checked);
		},
		loadData : function(data){
			eachNode(data);
			this.treeList = data;
		},
		getNode : function(target){
			var result = null;
			findNode(this.treeList,target,function(item,i,list){
				result = {
					node : item,
					index : i,
					list : list
				};
			});
			return result;
		},
		reload : function(target){
			var vmodel = this;
			if(!vmodel.$url) return;
			if(target !== null && target !== undefined){
				findNode(vmodel.treeList,target,function(item){
					ajaxLoad(item,vmodel);
				});
			}else{
				ajaxLoad(null,vmodel);
			}
		},
		getParents : function(target){
			var pArr = [];
			getParents(this.treeList,target,pArr);
			return pArr;
		},
		//展开或收缩
		toggleState : function(state,el){
			var vmodel = this;
			if(el){
				toggleElState(vmodel,el,state);
			}else{
				eachNode(vmodel.treeList,function(el){
					toggleElState(vmodel,el,state);
				});
			}
		},
		//展开到指定节点
		expandTo : function(target){
			var vmodel = this;
			var pArr = [];
			getParents(vmodel.treeList,target,pArr);
			avalon.each(pArr,function(i,el){
				expandNode(vmodel,el);
			});
		},
		//获取当前选中的节点
		getSelected : function(){
			return selectNode.curSelEl;
		},
		/*
		移除指定节点
		target : 节点id或节点监控对象
		*/
		removeNode : function(target){
			var vmodel = this;
			findNode(vmodel.treeList,target,function(item,i,list){
				if(item.loading) return;
				var pArr = [];
				getParents(vmodel.treeList,item,pArr);
				if(item === selectNode.curSelEl){
					selectNode.curSelEl = null;
				}
				list.removeAt(i);
				eachParentsUncheck(pArr);
			});
		},
		/*
		增加节点
		data : 节点数据数组
		parent : 若不指定则默认添加到根节点，若为string或number则是节点id，若为object则是节点的监控对象
		*/
		appendNodes : function(data,parent){
			var target,el;
			if(parent){
				if(typeof parent == 'object'){
					el = parent;
				}else{
					findNode(this.treeList,parent,function(item){
						el = item;
					});
				}
				if(!el){
					return avalon.log("找不到目标节点,appendNodes失败");
				}
				el.state = 'open';
				target = el.children;
			}else{
				target = this.treeList;
			}
			if(target){
				eachNode(data,null);
				target.pushArray(data);
				if(el && !el.chLoaded){
					el.chLoaded = true;
				}
			}
		},
		treeList : [],
		//节点是否带图标
		icon : true,
		//节点是否带checkbox
		checkbox : false,
		//是否级联检查
		$cascadeCheck : true,
		//要求返回的数据必须有code data,code为1表示成功，其它失败
		loadFilter : function(resp){
			return resp;
		},
		//异步获取数据的url
		$url : '',
		$method : 'GET',
		$queryParams : {},
		loader : function(param,func){
			avalon[this.$method === 'GET' ? "ajaxGet" : "ajaxPost"](this.$url,param,func,null);
		},
		//事件
		onContextMenu : avalon.noop,
		onBeforeSelect : avalon.noop,
		onSelect : avalon.noop,
		onBeforeExpand : avalon.noop,
		onExpand : avalon.noop,
		onBeforeCollapse : avalon.noop,
		onCollapse : avalon.noop,
		onBeforeCollapse : avalon.noop,
		onBeforeLoad : avalon.noop,
		onLoadSuccess : avalon.noop,
		onLoadError : avalon.noop,
		onLoadComplete : avalon.noop,
		onDbClick : avalon.noop
  }
});