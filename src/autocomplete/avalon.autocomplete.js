var tpl = require("./avalon.autocomplete.html");
var dataTpl = require("./avalon.autocomplete_data.html");
var hideEventHandle;
avalon.component('ms-autocomplete', {
  template: tpl,
  defaults: {
  	placeholder : "",
  	$inter : null,
  	//如果有值，则data或者source返回的数据必须为对象obj组成的数组，input将由obj[inputValueKey]显示
		//如果没值，则data或者source返回的数据必须为非对象组成的数组
		$inputValueKey : "text",
		//当前的搜索关键字
		value : "",
		//后台返回数据项的text键值，取其数据值到列表上显示
		$textKey : "text",
		$source : null,
		//所选的项的具体数据
		$selectItem : null,
		loadingText : "加载中...",
		nonDataText : "暂无数据",
		onSelect : avalon.noop,
  	focus : function(){
  		var $this = avalon(this.$element);
			var offset = $this.offset();
			var autocompleteData = avalon.vmodels.autocompleteData;
			autocompleteData.isShow = false;
			autocompleteData.left = offset.left;
			autocompleteData.top = offset.top + $this.outerHeight();
			//将当前的input配置设置到autocomplete中
			autocompleteData.$curVmodel = this;
			autocompleteData.$textKey = this.$textKey;
			if(hideEventHandle){
				avalon.unbind(document.body,"click",hideEventHandle);
			}
			var me = this;
			hideEventHandle = avalon.bind(document.body,"click",function(e){
				if(e.target === me.$element) return false;
				if(AB.isSubNode(e.target,"autocomplete-dropdown")) return;
				autocompleteData.isShow = false;
				avalon.unbind(document.body,"click",hideEventHandle);
				hideEventHandle = null;
			});
  	},
  	keyup : function(e){
  		var keyCode = e.keyCode;
  		var autocompleteData = avalon.vmodels.autocompleteData;
  		var me = this;
			if(keyCode >= 9 && keyCode <= 47){
				return;
			}
			if(this.value === ''){
				//搜索关键字为空 则不操作
				me.$inter && clearTimeout(me.$inter);
				me.$inter = null;
				autocompleteData.isShow = false;
				return;
			}
			autocompleteData.data = [];
			autocompleteData.mes = autocompleteData.$curVmodel.loadingText;
			if(me.$inter){
				clearTimeout(me.$inter);
				me.$inter = null;
			}
			me.$inter = setTimeout(function(){
				var source = autocompleteData.$curVmodel.$source;
				var type = avalon.type(source);
				var value = autocompleteData.$curVmodel.value;
				if(type == 'function'){
					var cb = function(data){
						if(cb.t === me.$inter){
							setResult(data,value,autocompleteData);
						}
					};
					cb.t = me.$inter;
					source.call(autocompleteData,value,cb);
				}else if(type == 'array'){
					var data = [];
					var inputValueKey = autocompleteData.$curVmodel.$inputValueKey;
					for(var i=0,ii;ii=source[i++];){
						if((inputValueKey ? ii[autocompleteData.$textKey] : (ii + '')).indexOf(value) !== -1){
							if(inputValueKey){
								data.push(avalon.mix({},ii));
							}else{
								data.push(ii);
							}
						}
					}
					setResult(data,value,autocompleteData);
				}
			},200);
			autocompleteData.isShow = true;
  	},
  	keydown : function(e){
  		var keyCode = e.keyCode;
			var m = avalon.vmodels.autocompleteData;
			if(keyCode >= 9 && keyCode <= 47){
				var len = m.data.length;
				if(/^(13|40|38)$/.test(keyCode) && m.isShow && len > 0){
					e.preventDefault();
					if(keyCode === 40){
						if(m.curSelect === len - 1){
							m.curSelect = 0;
						}else{
							m.curSelect++;
						}
					}else if(keyCode === 38){
						if(m.curSelect === -1 || m.curSelect === 0){
							m.curSelect = len - 1;
						}else{
							m.curSelect--;
						}
					}else if(keyCode === 13){
						m.chooseItem(m.data[m.curSelect]);
						m.isShow = false;
					}
				}
			}else{
				m.curSelect = -1;
			}
  	}
  }
});
avalon(document.body).appendHTML(dataTpl);
avalon.define({
	$id : "autocompleteData",
	$textKey : "text",
	$curVmodel : null,
	isShow : false,
	left : -1000,
	top : -1000,
	hideUl : function(){
		if(this.mes !== this.$curVmodel.loadingText){
			this.isShow = false;
		}
	},
	mes : "",
	curSelect : -1,
	data : [],
	value : '',
	chooseItem : function(el){
		var vm = this.$curVmodel;
		vm.selectItem = el;
		vm.value = vm.$inputValueKey ?  el[vm.$inputValueKey] : el;
		vm.onSelect(el);
		this.isShow = false;
	},
	getText : function(el){
		if(typeof el == 'object'){
			var text = el[this.$textKey];
		}else{
			text = el + '';
		}
		var reg = new RegExp(this.value,"g");
		return text.replace(reg,"<strong>" + this.value + "</strong>");
	}
});
function setResult(data,value,m){
	/*if(!m.$curVmodel.inputValueKey){
		var arr = [];
		for(var i=0,ii;ii=data[i++];){
			var obj = {};
			obj[m.textKey] = ii + '';
			arr.push(obj);
		}
		data = arr;
	}*/
	m.value = value;
	m.data = data;
	m.mes = m.$curVmodel.nonDataText;
}