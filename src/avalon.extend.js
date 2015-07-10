define(["mmRequest"],function (avalon) {
	"use strict";
	/*dom*/
	//获取所有子元素，非文本节点
	avalon.fn.children = function(){
		var children = [];
		avalon.each(this[0].childNodes,function(i,node){
			node.nodeType === 1 && children.push(node);
		});
		return children;
	};
	avalon.fn.loading = function(isloading){
		var el = this[0];
		var loadingNum = +el.getAttribute("data-loading-num") || 0;
		if(!isloading){
			if(loadingNum === 1){
				avalon.each(this.children(),function(i,node){
					var cls = node.className;
					if(cls === 'loading-mask' || cls === 'loading-main'){
						el.removeChild(node);
					}
				});
			}
			loadingNum > 0 && el.setAttribute("data-loading-num",--loadingNum);
		}else{
			if(loadingNum === 0){
				var mask = document.createElement("div");
				mask.className = 'loading-mask';
				var loading = document.createElement("div");
				loading.className = 'loading-main';
				loading.innerHTML = '<span class="loading"></span>';
				el.appendChild(mask);
				el.appendChild(loading);
			}
			el.setAttribute("data-loading-num",++loadingNum);
		}
	};
	avalon.support = {
		transitionend : (function(){
			var el = document.createElement('div');
			var transEndEventNames = {
				WebkitTransition: 'webkitTransitionEnd',
				MozTransition: 'transitionend',
				OTransition: 'oTransitionEnd otransitionend',
				transition: 'transitionend'
			};
			for (var name in transEndEventNames) {
				if (el.style[name] !== undefined) {
					return transEndEventNames[name];
				}
			}
			return false;
		})()
	};
	//父页面窗口dom绑定
	avalon.bindingHandlers.parentwin = function(data,vmodel){
		var options = avalon.bindingHandlers.parentwin[data.value];
		options.content = data.element.innerHTML;
		parent.avalon.initDialog(data.value,options);
		data.element.parentNode.removeChild(data.element);
		data.element = null;
	};
	//工具帮助对象
	avalon.mUtil = {
		getDateOpts : function(opts){
			return avalon.mix({
				language:  'zh-CN',
		        format : "yyyy-mm-dd",
		        weekStart: 1,
		        todayBtn:  1,
				autoclose: 1,
				todayHighlight: 1,
				startView: 2,
				minView : 2
			},opts || {});
		},
		setDateSuffix : function(model,sKey,eKey){
			sKey = sKey || "startTime";
			eKey = eKey || "endTime";
			if(model[sKey]){
				model[sKey] += " 00:00:00";
			}
			if(model[eKey]){
				model[eKey] += " 23:59:59";
			}
		},
		getTargetText : function(data,value,valueField,textField){
			if(!data || data.length === 0) return '';
			valueField = valueField || 'value';
			textField = textField || 'text';
			for(var i=0,item;item=data[i++];){
				if(item[valueField] === value){
					if(item._color){
						return "<em class='"+item._color+"'>" + item[textField] + "</em>";
					}else{
						return item[textField];
					}
				}
			}
			return '';
		},
		isSubNode : function(target,pCls){
			if(avalon(target).hasClass(pCls)) return true;
			if(target.tagName && target.tagName.toLowerCase() === "body") return false;
			var p = target.parentNode;
			while(p && p.tagName && p.tagName.toLowerCase() !== "body"){
				if(avalon(p).hasClass(pCls)) return true;
				p = p.parentNode;
			}
			return false;
		}
	};
	(function(){
		avalon.mUtil.initValidate = function(options){
			options = avalon.mix({
				required : true,
				requiredMes : "该输入项必须填写",
				validFunc : null,
				fieldModel : null,
				mesModel : null,
				fieldKeys : ''
			},options);
			if(typeof options.fieldKeys == 'string'){
				options.fieldKeys = [options.fieldKeys];
			}
			if(!options.mesModel){
				options.mesModel = options.fieldModel;
			}
			avalon.each(options.fieldKeys,function(i,v){
				options.fieldModel.$watch(v,function(newVal){
					if(options.required && newVal === ''){
						options.mesModel[v + "Mes"] = options.requiredMes;
						return;
					}
					if(options.validFunc){
						var result = options.validFunc(newVal);
						if(typeof result == 'string'){
							options.mesModel[v + "Mes"] = result;
							return;
						}
					}
					options.mesModel[v + "Mes"] = '';
				});
			});
		};
		avalon.mUtil.doValidate = function(fieldKeys,fieldModel,mesModel){
			if(typeof fieldKeys == 'string'){
				fieldKeys = [fieldKeys];
			}
			if(!mesModel){
				mesModel = fieldModel;
			}
			var result = {};
			avalon.each(fieldKeys,function(i,v){
				fieldModel.$fire(v,fieldModel[v]);
				if(mesModel[v + "Mes"]){
					return (result = false);
				}else{
					result[v] = fieldModel[v];
				}
			});
			return result;
		};
	})();
	//ajax模块
	(function(){
		var defaultSetting = {
			cache : false,
			dataType : 'json'
		};
		function doAjax(url,param,callback,$area,setting,mes){
			if($area !== null){
				$area = avalon($area || document.body);
			}
			$area && $area.loading(true);
			setting = avalon.mix({
				url : url,
				complete : function(){
					$area && $area.loading(false);
				},
				data : param,
				error : function(result){
					if(callback){
						callback.call($area,result);
					}else{
						//Base.alert("网络异常,请重试");
					}
					avalon.log(arguments);
					$area && $area.loading(false);
				},
				success : function(result){
					if(callback){
						if(!result){
//							Base.alert("返回数据异常,请重试");
						}else{
							callback.call($area,result);
						}
					}
				}
			},defaultSetting,setting);
			avalon.ajax(setting);
		}
		avalon.ajaxPost = function(){
			defaultSetting.type = "POST";
			doAjax.apply(null,arguments);
		};
		avalon.ajaxGet = function(){
			defaultSetting.type = "GET";
			doAjax.apply(null,arguments);
		};
	})();
	return avalon;
});