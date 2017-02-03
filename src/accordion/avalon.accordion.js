require("./avalon.accordion.css");
var tpl = require("./avalon.accordion.html");
function findItem(vm,func){
	for(var i=0,ii;ii=vm.data[i++];){
		if(!ii.children) continue;
		for(var j=0,jj;jj=ii.children[j++];){
			if(func.call(vm,jj,i - 1)){
				return jj;
			}
		}
	}
	return null;
}
function getObj(obj){
	return avalon.mix({
		title : '',
		content : '',
		iconCls : '',
		children : [],
		_selected : false
	},obj);
}
AB.preHandlers["ms-accordion"] = function(vm,fragment){
	var accordionData = [];
	var data = vm.data;
	if(!data || data.length === 0){
		if(fragment){
			var div = document.createElement('div');
			div.innerHTML = fragment;
			var chs = avalon(div).children();
			avalon.each(chs,function(i,v){
				var obj = getObj({});
				obj.title = v.title;
				obj.content = v.innerHTML;
				accordionData.push(obj);
			});
		}
	}else{
		avalon.each(data,function(i,v){
			var obj = getObj(v);
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
	}
	vm.data = accordionData;
};
avalon.component('ms-accordion', {
  template: tpl,
  defaults: {
  	$lastSel : null,
  	$lastSelHeader : null,
  	onReady : function(){
  		if(this.$multipleSel) return;
  		var me = this;
  		avalon.each(this.data,function(i,v){
  			if(v._selected){
  				var target = avalon(me.$element).children(i);
					var headerEl = avalon(target).children(0);
					var panel = avalon(headerEl).next();
					var $panel = avalon(panel);
					var panelContent = $panel.children(0);
					if(AB.support.transitionend){
						$panel.addClass("collapsing in");
						panel.style.height = avalon(panelContent).outerHeight() + 'px';
					}else{
						$panel.addClass("in");
					}
					me.$lastSel = v;
					me.$lastSelHeader = headerEl;
  				return false;
  			}
  		});
  	},
		clickHeader : function(el,e){
			var headerEl = e.currentTarget;
			if(this.$multipleSel){
				this.toggleEl(el,headerEl);
			}else{
				if(this.$lastSel){
					this.toggleEl(this.$lastSel,this.$lastSelHeader);
				}
				if(this.$lastSel === el) {
					this.$lastSel = null;
					return;
				}
				this.toggleEl(el,headerEl);
				this.$lastSel = el;
				this.$lastSelHeader = headerEl;
			}
		},
		toggleEl : function(el,headerEl){
			var panel = avalon(headerEl).next();
			var $panel = avalon(panel);
			var panelContent = $panel.children(0);
			if(el._selected){
				el._selected = false;
				if(AB.support.transitionend){
					panel.style.height = avalon(panelContent).outerHeight() + 'px';
					$panel.addClass("collapsing");
					panel.offsetHeight;
					panel.style.height = '0px';
				}else{
					$panel.removeClass("in");
				}
			}else{
				el._selected = true;
				if(AB.support.transitionend){
					$panel.addClass("collapsing in");
					panel.style.height = avalon(panelContent).outerHeight() + 'px';
				}else{
					$panel.addClass("in");
				}
			}
		},
		transitionend : function(el,e){
			var panel = e.currentTarget;
			var $panel = avalon(panel);
			$panel.removeClass("collapsing");
			if(panel.style.height === '0px'){
				$panel.removeClass("in");
			}
			panel.style.height = '';
		},
		//属性
		$multipleSel : false,
    data : [/*{
			title : panel标题,
			content : panel body html,
			iconCls : panel标题左边的图标,
			children : 若content为空，则取children为body内容
				selected : 是否选中
				title : 显示文字
				iconCls : 文字左边图标
		}*/],
		//方法
		selectPanel : function(i){
			var el = this.data[i];
			if(el._selected) return;
			var target = avalon(this.$element).children(i);
			var headerEl = avalon(target).children(0);
			this.toggleEl(el,headerEl);
		},
		//选中item
		selectItem : function(ch){
			if(ch.selected) return;
			var sel = this.getSelectedItem();
			sel && (sel.selected = false);
			ch.selected = true;
			this.onSelectItem(ch);
		},
		findItem : function(func){
			return findItem(this,func);
		},
		//获取所选的panel下的子item
		getSelectedItem : function(){
			return findItem(this,function(jj){
				return jj.selected;
			});
		},
		//根据text选取item
		selectItemByText : function(text){
			return findItem(this,function(jj,i){
				if(jj.title === text){
					this.curIndex = i;
					this.selectItem(jj);
					return true;
				}
			});
		},
		onSelectItem : avalon.noop
  }
});