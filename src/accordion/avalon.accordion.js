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
  	$multipleSel : false,
  	$lastSel : null,
  	onReady : function(){
  		if(this.$multipleSel) return;
  		var me = this;
  		avalon.each(this.data,function(i,v){
  			if(v._selected){
  				me.$lastSel = v;
  				return false;
  			}
  		});
  	},
    data : [/*{
			title : panel标题,
			content : panel body html,
			iconCls : panel标题左边的图标,
			children : 若content为空，则取children为body内容
				selected : 是否选中
				title : 显示文字
				iconCls : 文字左边图标
		}*/],
		clickHeader : function(el){
			if(this.$multipleSel){
				el._selected = !el._selected;
			}else{
				if(this.$lastSel){
					this.$lastSel._selected = false;
				}
				if(this.$lastSel === el) {
					this.$lastSel = null;
					return;
				}
				el._selected = true;
				this.$lastSel = el;
			}
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