define(["avalon"],function(avalon){
	var ul;
	avalon.component("ab:autocomplete",{
		$template: "<input type='text' ms-duplex='value' ms-attr-placeholder='placeholder' class='form-control'/>",
		$replace : true,
		$ready: function(vmodel, element){
			if(!ul){
				ul = document.createElement("ul");
				ul.className = "dropdown-menu autocomplete-dropdown";
				ul.innerHTML = 
					"<li ms-visible='!data || data.length === 0'><a href='javascript:void(0)'>{{mes}}</a></li>" +
					"<li ms-repeat='data' ms-css-background-color='{{$index === curSelect ? \"#f5f5f5\" : \"\"}}'>" +
						"<a href='javascript:void(0)' ms-click='chooseItem(el)'>{{getText(el[textKey]) | html}}</a>" +
					"</li>";
				document.body.appendChild(ul);
				var m = avalon.define({
					$id : "autocompleteList",
					$curVmodel : null,
					chooseItem : function(el){
						var vm = m.$curVmodel;
						vm.selectItem = el;
						vm.value = el[vm.inputValueKey || vm.textKey];
						vm.onSelect(vm,el);
					},
					mes : "",
					data : [],
					textKey : "text",
					curSelect : -1,
					value : '',
					getText : function(text){
						var reg = new RegExp(m.value,"g");
						return text.replace(reg,"<strong>" + m.value + "</strong>");
					}
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
							if((m.$curVmodel.inputValueKey ? ii[m.textKey] : (ii + '')).indexOf(value) !== -1){
								if(m.$curVmodel.inputValueKey){
									data.push(avalon.mix({},ii));
								}else{
									data.push(ii);
								}
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
			avalon.scan(element,vmodel);
		},
		$dispose : function(vm, el){
			//在这里移除事件与清空节点内部
			el.innerHTML = ""
		},
		$skipArray : ["inputValueKey","textKey","source","data",'selectItem'],
		//如果有值，则data或者source返回的数据必须为对象obj组成的数组，input将obj[inputValueKey]显示
		//如果没值，则data或者source返回的数据必须为非对象组成的数组
		inputValueKey : "text",
		//当前的搜索关键字
		value : "",
		//后台返回数据项的text键值，取其数据值到列表上显示
		textKey : "text",
		source : null,
		data : [],
		//所选的项的具体数据
		selectItem : null,
		onSelect : avalon.noop,
		placeholder : ""
	});
	function setResult(data,value,m){
		if(!m.$curVmodel.inputValueKey){
			var arr = [];
			for(var i=0,ii;ii=data[i++];){
				var obj = {};
				obj[m.textKey] = ii + '';
				arr.push(obj);
			}
			data = arr;
		}
		m.value = value;
		m.data = data;
		m.mes = "暂无数据";
	}
});