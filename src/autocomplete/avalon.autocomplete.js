define(["avalon"],function(avalon){
	var ul;
	function setResult(data,value,m){
		var reg = new RegExp(value,"g");
		for(var i=0,ii;ii=data[i++];){
			ii[m.textKey] = ii[m.textKey].replace(reg,"<strong>"+value+"</strong>")
		}
		m.data = data;
		m.mes = "暂无数据";
	}
	var widget = avalon.ui.autocomplete = function(element,data,vmodels){
		var options = data.autocompleteOptions;
		var vmodel = avalon.define(data.autocompleteId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = ["valueKey","textKey","source","data",'selectItem'];
			vm.$init = function(){
				if(!ul){
					ul = document.createElement("ul");
					ul.className = "dropdown-menu autocomplete-dropdown";
					ul.innerHTML = 
						"<li ms-visible='!data || data.length === 0'><a href='javascript:void(0)'>{{mes}}</a></li>" +
						"<li ms-repeat='data' ms-css-background-color='{{$index === curSelect ? \"#f5f5f5\" : \"\"}}'>" +
							"<a href='javascript:void(0)' ms-click='chooseItem(el)'>{{el[textKey] | html}}</a>" +
						"</li>";
					document.body.appendChild(ul);
					var m = avalon.define({
						$id : "autocompleteList",
						$curVmodel : null,
						chooseItem : function(el){
							var vm = m.$curVmodel;
							vm.selectItem = el;
							vm.value = el[vm.valueKey];
							vm.onSelect(vm,el);
						},
						mes : "",
						data : [],
						textKey : "text",
						curSelect : -1
					});
					avalon.scan(ul,m);
				}
				var hideEventHandle;
				avalon.bind(element,"focus",function(){
					var $this = avalon(this);
					var offset = $this.offset();
					ul.style.left = offset.left + "px";
					ul.style.top = (offset.top + $this.outerHeight()) + "px";
					//将当前的input配置设置到autocomplete中
					var m = avalon.vmodels.autocompleteList;
					m.$curVmodel = vmodel;
					m.textKey = vmodel.textKey;
					if(hideEventHandle){
						avalon.unbind(document.body,"click",hideEventHandle);
					} 
					hideEventHandle = avalon.bind(document.body,"click",function(e){
						if(e.target === element) return false;
						ul.style.display = 'none';
						avalon.unbind(document.body,"click",hideEventHandle);
						hideEventHandle = null;
					});
				});
				var t;
				avalon.bind(element,"keyup",function(e){
					var keyCode = e.keyCode;
					if(keyCode >= 9 && keyCode <= 47){
						return;
					}
					if(this.value === ''){
						//搜索关键字为空 则不操作
						t && clearTimeout(t);
						t = null;
						ul.style.display = 'none';
						return;
					}
					var m = avalon.vmodels.autocompleteList;
					m.data = [];
					m.mes = "加载中...";
					if(t){
						clearTimeout(t);
						t = null;
					}
					t = setTimeout(function(){
						var source = m.$curVmodel.source;
						var type = avalon.type(source);
						var value = m.$curVmodel.value;
						if(type == 'function'){
							var cb = function(data){
								if(cb.t === t){
									setResult(data,value,m);
								}
							};
							cb.t = t;
							source.call(m,value,cb);
						}else if(type == 'array'){
							var data = [];
							for(var i=0,ii;ii=source[i++];){
								if(ii[m.textKey].indexOf(value) !== -1){
									data.push(avalon.mix({},ii));
								}
							}
							setResult(data,value,m);
						}
					},200);
					ul.style.display = "block";
				});
				avalon.bind(element,"keydown",function(e){
					var keyCode = e.keyCode;
					var m = avalon.vmodels.autocompleteList;
					if(keyCode >= 9 && keyCode <= 47){
						var len = m.data.length;
						if(/^(13|40|38)$/.test(keyCode) && ul.style.display !== 'none' && len > 0){
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
								ul.style.display = 'none';
							}
						}
					}else{
						m.curSelect = -1;
					}
				});
				element.setAttribute("ms-duplex","value");
				avalon.scan(element,vmodel);
			};
		});
		return vmodel;
	};
	widget.defaults = {
		value : "",
		valueKey : "value",
		textKey : "text",
		source : null,
		data : [],
		selectItem : null,
		onSelect : avalon.noop
	};
});