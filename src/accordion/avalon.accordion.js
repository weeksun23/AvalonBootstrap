//mmAnimate util
define(["avalon.extend","text!./avalon.accordion.html","css!./avalon.accordion.css"],function(avalon,template){
	avalon.effect("accordion-collapse", {
        beforeEnter: function (el) {
        	el.style.display = 'block';
            var $el = avalon(el);
            var inner = $el.children()[0];
			var h = avalon(inner).outerHeight(true);
			$el.addClass("collapsing");
			el.offsetWidth;
			$el.height(h);
        },
        afterEnter : function(el){
        	var $el = avalon(el);
        	$el.removeClass("collapsing");
        	$el.css("height",'auto');
        },
        beforeLeave: function (el) {
        	var $el = avalon(el);
            var inner = $el.children()[0];
			var h = avalon(inner).outerHeight(true);
			$el.height(h).addClass("collapsing");
			el.offsetWidth;
			$el.height(0);
        },
        afterLeave : function (el){
        	avalon(el).removeClass("collapsing");
        }
    });
	function findItem(vm,func){
		for(var i=0,ii;ii=vm.data[i++];){
			for(var j=0,jj;jj=ii.children[j++];){
				if(func(jj,i - 1)){
					return jj;
				}
			}
		}
		return null;
	}
	avalon.component("ab:accordion",{
		$template: template,
		//属性
		data : [/*{
			title : panel标题,
			content : panel body html,
			iconCls : panel标题左边的图标,
			children : 若content为空，则取children为body内容
				selected : 是否选中
				title : 显示文字
				iconCls : 文字左边图标
		}*/],
		curIndex : -1,
		//方法
		clickHeader : avalon.noop,
		selectItem : avalon.noop,
		getSelectedItem : avalon.noop,
		selectItemByText : avalon.noop,
		//事件
		onInit : avalon.noop,
		onSelectItem : avalon.noop,
		$construct : function(a,b,c){
			var children = avalon(this).children();
			if(children.length > 0){
				b.data = (function(){
					var accordionData = [];
					avalon.each(children,function(i,v){
						var obj = {
							title : v.title,
							content : v.innerHTML,
							_show : false
						};
						avalon.each(['iconCls'],function(i,key){
							obj[key] = v.getAttribute("data-" + key);
						});
						accordionData.push(obj);
					});
					return accordionData;
				})();
			}else{
				b.data = (function(){
					var accordionData = [];
					avalon.each(b.data,function(i,v){
						var obj = avalon.mix({
							title : null,
							content : null,
							iconCls : null,
							children : null,
							_show : false
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
			return avalon.mix(a,b,c);
		},
		$ready: function(vm, el){
			vm.clickHeader = function(i){
				if(i === vm.curIndex){
					vm.curIndex = -1;
				}else{
					vm.curIndex = i;
				}
			};
			//选中item
			vm.selectItem = function(ch){
				if(ch.selected) return;
				var sel = vm.getSelectedItem();
				sel && (sel.selected = false);
				ch.selected = true;
				vm.onSelectItem(ch);
			};
			//获取所选的panel下的子item
			vm.getSelectedItem = function(){
				return findItem(vm,function(jj){
					return jj.selected;
				});
			};
			//根据text选取item
			vm.selectItemByText = function(text){
				return findItem(vm,function(jj,i){
					if(jj.title === text){
						vm.curIndex = i;
						vm.selectItem(jj);
						return true;
					}
				});
			};
			vm.$watch("curIndex",function(newVal,oldVal){
				if(newVal === -1){
					return vm.data[oldVal]._show = false;
				}
				if(oldVal === -1){
					vm.data[newVal]._show = true;
					return;
				}
				vm.data[oldVal]._show = false;
				vm.data[newVal]._show = true;
			});
			/*avalon.support.transitionend && avalon.each(el.getElementsByTagName("div"),function(i,div){
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
			vm.onInit.call(el, vm);*/
		},
		$dispose : function(vm, el){
			//在这里移除事件与清空节点内部
			el.innerHTML = ""
		}
	});
	/*
	var widget = avalon.ui.accordion = function(element, data, vmodels){
		
		var vmodel = avalon.define(data.accordionId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = [];
			vm.$init = function(){
				avalon(element).addClass("panel-group maccordion");
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
		});
		
		return vmodel;
	};
	widget.version = 1.0;
	widget.defaults = {
		curIndex : -1,
		onInit : avalon.noop,
		onSelectItem : avalon.noop,
		data : []
	};*/
	/*
	title : panel标题,
	content : panel body html,
	iconCls : panel标题左边的图标,
	children : 若content为空，则取children为body内容
		selected : 是否选中
		title : 显示文字
		iconCls : 文字左边图标
	*/
});