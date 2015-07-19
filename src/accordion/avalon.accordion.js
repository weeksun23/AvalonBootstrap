//mmAnimate util
define(["avalon.extend","text!./avalon.accordion.html","css!./avalon.accordion.css"],function(avalon,templete){
	var widget = avalon.ui.accordion = function(element, data, vmodels){
		var options = data.accordionOptions;
		var children = avalon(element).children();
		if(children.length > 0){
			options.data = (function(){
				var accordionData = [];
				avalon.each(children,function(i,v){
					var obj = {
						title : v.title,
						content : v.innerHTML
					};
					avalon.each(['icon'],function(i,key){
						obj[key === 'icon' ? "iconCls" : key] = v.getAttribute("data-" + key);
					});
					accordionData.push(obj);
				});
				return accordionData;
			})();
		}else{
			options.data = (function(){
				var accordionData = [];
				avalon.each(options.data,function(i,v){
					var obj = avalon.mix({
						title : null,
						content : null,
						iconCls : null,
						children : null
					},v);
					if(obj.children && obj.children.length){
						//只允许一个select
						var hasSel = false;
						avalon.each(obj.children,function(j,v){
							if(hasSel){
								v.selected = false;
								return;
							}
							if(v.selected){
								hasSel = true;
							}else if(v.selected === undefined){
								v.selected = false;
							}
						});
					}
					accordionData.push(obj);
				});
				return accordionData;
			})();
		}
		function togglePanel(i,action){
			var panel = avalon(element).children()[i];
			var target = avalon(panel).children()[1];
			var $target = avalon(target);
			if(action === 'slideDown'){
				$target.addClass("in");
				if(avalon.support.transitionend){
					var inner = $target.children()[0];
					var h = avalon(inner).outerHeight(true);
					$target.addClass("collapsing");
					target.offsetWidth;
					$target.height(h);
				}
			}else{
				if(avalon.support.transitionend){
					var inner = $target.children()[0];
					var h = avalon(inner).outerHeight(true);
					$target.height(h).addClass("collapsing");
					target.offsetWidth;
					$target.height(0);
				}else{
					$target.removeClass("in");
				}
			}
			target._state = action;
		}
		function findItem(func){
			for(var i=0,ii;ii=vmodel.data[i++];){
				for(var j=0,jj;jj=ii.children[j++];){
					if(func(jj,i - 1)){
						return jj;
					}
				}
			}
			return null;
		}
		var vmodel = avalon.define(data.accordionId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = [];
			vm.$init = function(){
				avalon(element).addClass("panel-group maccordion");
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				avalon.support.transitionend && avalon.each(element.getElementsByTagName("div"),function(i,div){
					if(avalon(div).hasClass("panel-collapse")){
						avalon.bind(div,avalon.support.transitionend,function(){
							var $this = avalon(this);
							if(this._state === "slideDown"){
								this.style.height = 'auto';
							}else{
								$this.removeClass("in");
							}
							$this.removeClass("collapsing");
						});
					}
				});
				vmodel.onInit && vmodel.onInit.call(element, vmodel, vmodels);
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
			vm.$clickHeader = function(i){
				if(i === vmodel.curIndex){
					vmodel.curIndex = -1;
				}else{
					vmodel.curIndex = i;
				}
			};
			//选中item
			vm.selectItem = function(ch){
				if(ch.selected) return;
				var sel = vmodel.getSelectedItem();
				sel && (sel.selected = false);
				ch.selected = true;
				vmodel.onSelectItem(ch);
			};
			//获取所选的panel下的子item
			vm.getSelectedItem = function(){
				return findItem(function(jj){
					return jj.selected;
				});
			};
			//根据text选取item
			vm.selectItemByText = function(text){
				return findItem(function(jj,i){
					if(jj.title === text){
						vmodel.curIndex = i;
						vmodel.selectItem(jj);
						return true;
					}
				});
			};
		});
		vmodel.$watch("curIndex",function(newVal,oldVal){
			if(newVal === -1){
				return togglePanel(oldVal,'slideUp');
			}
			if(oldVal === -1){
				return togglePanel(newVal,'slideDown');
			}
			togglePanel(oldVal,'slideUp');
			togglePanel(newVal,'slideDown');
		});
		return vmodel;
	};
	widget.version = 1.0;
	widget.defaults = {
		curIndex : -1,
		onInit : avalon.noop,
		onSelectItem : avalon.noop,
		/*
		title : panel标题,
		content : panel body html,
		iconCls : panel标题左边的图标,
		children : 若content为空，则取children为body内容
			selected : 是否选中
			title : 显示文字
			iconCls : 文字左边图标
		*/
		data : []
	};
});