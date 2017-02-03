//基本样式
var debug = true;
avalon.config({
	debug : debug
});
require("./base.css");
//avalonbootstrap基础库
var AB = window.AB = {
	isSubNode : function(target,pCls){
		if(avalon(target).hasClass(pCls)) return true;
		if(target.tagName && target.tagName.toLowerCase() === "body") return false;
		var p = target.parentNode;
		while(p && p.tagName && p.tagName.toLowerCase() !== "body"){
			if(avalon(p).hasClass(pCls)) return true;
			p = p.parentNode;
		}
		return false;
	},
	support : {
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
	},
	preHandleComVm : function(is,vm,fragment){
		var handler = AB.preHandlers[is];
		if(handler){
			handler(vm,fragment);
		}
	},
	getUUID : function(prefix){
		return String(Math.random() + Math.random()).replace(/\d\.\d{4}/, prefix || "");
	}
};
AB.preHandlers = {};
//获取所有子元素，非文本节点
avalon.fn.children = function(index){
	var children = [];
	avalon.each(this[0].childNodes,function(i,node){
		node.nodeType === 1 && children.push(node);
	});
	if(index === undefined){
		return children;
	}else{
		return children[index];
	}
};
//获取下一个兄弟节点
avalon.fn.next = function(){
	var el = this[0];
	var n = el.nextSibling;
	for (;n;n = n.nextSibling) { 
    if (n.nodeType === 1){
    	return n;
    } 
	}
	return null;
};
avalon.fn.appendHTML = function(htmlStr){
	var div = document.createElement("div");
	var fragment = document.createDocumentFragment();
	div.innerHTML = htmlStr;
	var nodes = div.childNodes;
	var first;
  for (var i=0, length=nodes.length; i<length; i++) {
  	var node = nodes[i].cloneNode(true);
  	if(!first){
  		first = node;
  	}
    fragment.appendChild(node);
  }
  this[0].appendChild(fragment);
  return first;
  //el.insertBefore(fragment, el.firstChild);
  
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