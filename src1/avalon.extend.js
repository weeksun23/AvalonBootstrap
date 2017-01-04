define(["./mmRequest","css!./base.css"],function (avalon) {
	"use strict";
	/*
	avalon.component("ab:table",{
		$template: template,
		$replace : true,
		$construct : function(opts,vmOpts,elemOpts){

		},
		$ready : function(){
			
		},
		$skipArray : [],
		//属性
		//方法
		//事件
	});
	*/
	avalon.library("ab", {
		//ie
	    $init: function(vm){
	    	for(var i in vm){
		        if(vm.hasOwnProperty(i) && typeof vm[i] === "function"){
		             vm[i] = vm[i].bind(vm);
		       }
		   }
	    },
	    $childReady: function(){},
	    $ready: function(){},
	    $dispose: function(){}
	});
	(function(){
		var _oncontextmenu;
		avalon.directive("contextmenu",{
			init : function(binding){
				binding.binded = false;
			},
			update : function(contextmenu){
				if(this.binded || !contextmenu) return;
				this.binded = true;
				var el = this.element;
				avalon.bind(el,"mousedown",function(e){
					if(e.button === 2){
						_oncontextmenu = document.oncontextmenu;
						document.oncontextmenu = function(){
							_oncontextmenu && _oncontextmenu.apply(this,arguments);
							return false;
						};
					}
				});
				avalon.bind(el,"mouseup",function(e){
					if(e.button === 2){
						setTimeout(function(){
							document.oncontextmenu = _oncontextmenu;
						});
						contextmenu.call(this,e);
					}
				});
			}
		});
	})();
	//获取所有子元素，非文本节点
	avalon.fn.children = function(){
		var children = [];
		avalon.each(this[0].childNodes,function(i,node){
			node.nodeType === 1 && children.push(node);
		});
		return children;
	};
	/*loading*/
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
	avalon.fn.appendHTML = function(htmlStr){
		var div = document.createElement("div");
		var fragment = document.createDocumentFragment();
		div.innerHTML = htmlStr;
		var nodes = div.childNodes;
	    for (var i=0, length=nodes.length; i<length; i++) {
	       fragment.appendChild(nodes[i].cloneNode(true));
	    }
	    this[0].appendChild(fragment);
	    //el.insertBefore(fragment, el.firstChild);
	    nodes = null;
	    fragment = null;
	};
	avalon.directive.getSetting = function(binding,Defaults){
		var expr = binding.expr;
		if(expr){
			var vms = binding.vmodels;
			for(var i=0,ii;ii=vms[i++];){
				if(ii[expr]){
					var targetVm = ii;
					var options = ii[expr];
					break;
				}
			}
		}
		var element = binding.element;
		var defaults = avalon.mix({},Defaults);
		//提取定义在dom上的属性
		var elemOptsStr = element.getAttribute("data-options");
		var elemOpts = elemOptsStr ? new Function("return {" + elemOptsStr + "}")() : {};
		//合并
		options = avalon.mix(defaults,elemOpts,options);
		//vm必须定义$id
		options.$id = +new Date;
		return {
			targetVm : targetVm,
			options : options
		};
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
	//工具帮助对象
	avalon.mUtil = {
		//target以及其上级节点(不包含body)中任意一个是否含pCls
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
			avalon.log("发送参数",url,param);
			setting = avalon.mix({
				url : url,
				complete : function(){
					$area && $area.loading(false);
				},
				data : param,
				error : function(result){
					callback && callback.call($area,null,result);
					avalon.log('接收错误',url,arguments);
					$area && $area.loading(false);
				},
				success : function(result){
					avalon.log("接收数据",url,result);
					callback && callback.call($area,result);
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