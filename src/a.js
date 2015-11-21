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
			vm.$skipArray = ["cascadeCheck",'queryParams'];
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
				findNode(vmodel.treeList,target,function(item,i,list){
					result = {
						node : item,
						index : i,
						list : list
					};
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