define(["avalon","text!./avalon.tree.html","css!./avalon.tree","mmRequest"],function(avalon,template){
	var nodeAttr = {
		//id : null,
		iconCls : "",
		openIconCls : "",
		text : "",
		loading : false,
		selected : false,
		checked : 0,
		//chLoaded : false,
		state : null
		//children : []
	};
	//初始化节点属性
	function initNodeAttr(item){
		if(!item.children){
			item.children = [];
		}
		//是否已加载子节点标志
		item.chLoaded = item.state === 'open';
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
			if(ch.length > 0 && eachNode(ch,func) === false){
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
		el.loading = true;
		var param = {id : el.id};
		avalon.mix(param,vmodel.queryParams);
		if(vmodel.onBeforeLoad(callBackEl,param) === false){
			return;
		}
		avalon.ajax({
			url : vmodel.url,
			type : vmodel.method,
			cache : false,
			data : param,
			dataType : 'json',
			complete : function(promise,result){
				el.loading = false;
				vmodel.onLoadComplete(callBackEl,promise,result);
			},
			success : function(ch){
				vmodel.loadFilter(ch,callBackEl);
				if(callBackEl){
					el.state = 'open';
					if(vmodel.checkbox && vmodel.cascadeCheck){
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
			},
			error : function(promise){
				vmodel.onLoadError(callBackEl,promise);
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
		}else if(vmodel.url){
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
		if(vmodel.cascadeCheck){
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
	var _oncontextmenu;
	var widget = avalon.ui.tree = function(element, data, vmodels){
		var options = data.treeOptions;
		template = template.replace("MS_OPTIONS_FORMATTER",options.formatter);
		if(!avalon.templateCache["TREE_TPL"]){
			avalon.templateCache["TREE_TPL"] = template.replace("MS_OPTIONS_NODELIST","el.children");
		}
		var curSelEl = null;
		//选择节点
		function selectNode(el){
			if(vmodel.onBeforeSelect(el) === false || el === curSelEl){
				return;
			}
			if(curSelEl){
				curSelEl.selected = false;
			}
			el.selected = true;
			vmodel.onSelect(curSelEl = el);
		}
		eachNode(options.treeList);
		var vmodel = avalon.define(data.treeId,function(vm){
			avalon.mix(vm, options);
			vm.$skipArray = ["cascadeCheck","formatter",'queryParams'];
			vm.$init = function(){
				var $el = avalon(element);
				$el.addClass('tree');
				$el.attr("ms-click","$rootClick");
				$el.attr("ms-dblclick","$rootDbClick");
				element.innerHTML = template.replace("MS_OPTIONS_NODELIST","treeList");
				if(vmodel.treeList){
					avalon.scan(element, vmodel);
				}else{
					ajaxLoad(null,vmodel,function(){
						avalon.scan(element, vmodel);
					});
				}
			};
			vm.$mousedown = function(e,el){
				if(vmodel.onContextMenu){
					if(e.button === 2){
						_oncontextmenu = document.oncontextmenu;
						document.oncontextmenu = function(){
							_oncontextmenu && _oncontextmenu.apply(this,arguments);
							return false;
						};
					}
				}
			};
			vm.$mouseup = function(e,el){
				if(vmodel.onContextMenu){
					if(e.button === 2){
						setTimeout(function(){
							document.oncontextmenu = _oncontextmenu;
						});
						vmodel.onContextMenu(e,el);
					}
				}
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
			vm.$rootClick = function(e){
				var target = e.target;
				switch(target.getAttribute("data-type")){
					case "toggleOpenExpand":
						toggleOpenExpand(vmodel,target.parentNode["data-el"]);
					break;
					case "toggleCheck":
						toggleCheck(vmodel,target.parentNode["data-el"]);
					break;
					default : 
						findNodeContent(target,function(el){
							selectNode(el);
						});
				}
			};
			vm.$rootDbClick = function(e){
				findNodeContent(e.target,function(el){
					vmodel.onDbClick(el,e);
				});	
			};
			/****************************方法****************************/
			vm.toggleCheck = function(el,checked){
				toggleCheck(vmodel,el,checked);
			};
			vm.loadData = function(data){
				eachNode(data);
				vmodel.treeList = data;
			};
			vm.getNode = function(target){
				var result = null;
				findNode(vmodel.treeList,target,function(item){
					result = item;
				});
				return result;
			};
			vm.reload = function(target){
				if(!vmodel.url) return;
				if(target !== null && target !== undefined){
					findNode(vmodel.treeList,target,function(item){
						ajaxLoad(item,vmodel);
					});
				}else{
					ajaxLoad(null,vmodel);
				}
			};
			vm.getParents = function(target){
				var pArr = [];
				getParents(vmodel.treeList,target,pArr);
				return pArr;
			};
			//展开或收缩
			vm.toggleState = function(state,el){
				if(el){
					toggleElState(vmodel,el,state);
				}else{
					eachNode(vmodel.treeList,function(el){
						toggleElState(vmodel,el,state);
					});
				}
			};
			//展开到指定节点
			vm.expandTo = function(target){
				var pArr = [];
				getParents(vmodel.treeList,target,pArr);
				avalon.each(pArr,function(i,el){
					expandNode(vmodel,el);
				});
			};
			//获取当前选中的节点
			vm.getSelected = function(){
				return curSelEl;
			};
			/*
			移除指定节点
			target : 节点id或节点监控对象
			*/
			vm.removeNode = function(target){
				findNode(vmodel.treeList,target,function(item,i,list){
					if(item.loading) return;
					var pArr = [];
					getParents(vmodel.treeList,item,pArr);
					if(item === curSelEl){
						curSelEl = null;
					}
					list.removeAt(i);
					eachParentsUncheck(pArr);
				});
			};
			/*
			增加节点
			data : 节点数据数组
			parent : 若不指定则默认添加到根节点，若为string或number则是节点id，若为object则是节点的监控对象
			*/
			vm.appendNodes = function(data,parent){
				var target,el;
				if(parent){
					if(typeof parent == 'object'){
						el = parent;
					}else{
						findNode(vmodel.treeList,parent,function(item){
							el = item;
						});
					}
					if(!el){
						return avalon.log("找不到目标节点,appendNodes失败");
					}
					el.state = 'open';
					target = el.children;
				}else{
					target = vmodel.treeList;
				}
				if(target){
					eachNode(data,null);
					target.pushArray(data);
					if(el && !el.chLoaded){
						el.chLoaded = true;
					}
				}
			};
		});
		return vmodel;
	};
	widget.eachNode = eachNode;
	widget.defaults = {
		/****************************属性****************************/
		//树数据
		treeList : [],
		//节点是否带图标
		icon : true,
		//节点是否带checkbox
		checkbox : false,
		//是否级联检查
		cascadeCheck : true,
		//定义如何显示node text
		formatter : '{{el.text}}',
		loadFilter : avalon.noop,
		//异步获取数据的url
		url : null,
		method : 'GET',
		queryParams : {},
		//loader : null
		/****************************事件****************************/
		onContextMenu : null,
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
	};
	widget.version = 1.0;
});