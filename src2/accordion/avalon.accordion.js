define(function(require) {
	require("../avalon.extend");
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
	avalon.me.defines.accordion = function(vm,defaults,htmlOpts,jsOpts){
		jsOpts.data = (function(){
			var accordionData = [];
			avalon.each(jsOpts.data,function(i,v){
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
	};
  avalon.component('ab-accordion', {
    template: tpl,
    defaults: {
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
			clickHeader : function(i){
				if(i === this.curIndex){
					this.curIndex = -1;
				}else{
					this.curIndex = i;
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
			onSelectItem : avalon.noop,
			onInit : function(obj){
				this.$watch("curIndex",function(newVal,oldVal){
					if(newVal === -1){
						return this.data[oldVal]._show = false;
					}
					if(oldVal === -1){
						this.data[newVal]._show = true;
						return;
					}
					this.data[oldVal]._show = false;
					this.data[newVal]._show = true;
				});
			}
    }
  });
});
