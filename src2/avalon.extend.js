define(function (require, exports, module) {
	require("./base.css");
	avalon.me = {
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
		}
	};
	(function(){
		avalon.me.defines = {};
		var _define = avalon.directives.widget.define;
		avalon.directives.widget.define = function(vm,defaults,htmlOpts,jsOpts){
			var target = htmlOpts.is.replace("ab-","");
			target = avalon.me.defines[target];
			if(target){
				target.apply(this,arguments);
			}
			return _define.apply(this,arguments);
		};
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
});