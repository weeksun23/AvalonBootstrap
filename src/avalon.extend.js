define(["mmRequest","css!./base.css"],function (avalon) {
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
			setting = avalon.mix({
				url : url,
				complete : function(){
					$area && $area.loading(false);
				},
				data : param,
				error : function(result){
					callback && callback.call($area,result);
					avalon.log(arguments);
					$area && $area.loading(false);
				},
				success : function(result){
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