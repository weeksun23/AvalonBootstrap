webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(46);


/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(13);
	__webpack_require__(47);
	var navData = [{
		title : "起始",
		_selected : true,
		children : [{
			title : '概述',
			$hash : "overview"
		}]
	},{
		title : "UI组件",
		children : [{
			title : "accordion"
		},{
			title : "autocomplete"
		},{
			title : "dialog"
		},{
			title : "dropdown"
		},{
			title : "tab"
		},{
			title : "table"
		},{
			title : "tree"
		}] 
	},{
		title : "扩展指令",
		children : [{
			title : "tooltip"
		}]
	}];
	var demoData = [];
	var pageObj = (function(navData){
		var re = {};
		avalon.each(navData,function(i,v){
			avalon.each(v.children,function(i,v){
				re[v.$hash || v.title] = demoData.length;
				demoData.push({
					name : v.title,
					html : "加载中...",
					$init : false,
					$hash : v.$hash
				});
			})
		});
		return re;
	})(navData);
	function getSingleSpaces(space){
		var len = 0;
		for(var j=0;j<space.length;j++){
			var ch = space[j];
			if(ch === "\t"){
				len += 2;
			}else if(ch === " "){
				len++;
			}
		}
		return new Array(len + 1).join(" ");
	}
	function dealDemoHtml(html){
		var div = document.createElement("div");
		div.innerHTML = html;
		var divs = div.getElementsByTagName('pre');
		for(var i=0,ii;ii=divs[i++];){
			if(avalon(ii).hasClass("demo-code")){
				var str = ii.innerHTML;
				/*.replace(/[<>]/g,function(s){
					if(s === '<')	return "&lt;";
					if(s === '>') return "&gt;";
				});*/
				var arr = str.split("\n");
				var spaces = arr[0].match(/^\s+/);
				var singleSpaces = getSingleSpaces(spaces[0]);
				for(var j=0;j<arr.length;j++){
					spaces = arr[j].match(/^\s+/);
					var s = getSingleSpaces(spaces[0]).replace(singleSpaces,"");
					arr[j] = arr[j].replace(/^\s+/,s);
				}
				var textNode = document.createTextNode(arr.join("\n"));
				ii.innerHTML = '';
				ii.appendChild(textNode);
				// ii.innerHTML = arr.join("<br>");
			}
		}
		return div.innerHTML;
	}
	var vmodel = avalon.define({
		$id : "body",
		curIndex : -1,
		demoData : demoData,
		dealHashChange : function(func){
			var page = location.hash.substring(1);
			var target = pageObj[page];
			if(target === undefined){
				page = 'overview';
				target = 0;
			}
			this.curIndex = target;
			var demo = this.demoData[target];
			if(!demo.$init){
				__webpack_require__.e/* require */(5, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(50)("./"+page)]; (function(html){
					demo.html = dealDemoHtml(html);
					demo.$init = true;
				}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});
			}
			avalon.vmodels.nav.findItem(function(item,i){
				if((item.$hash || item.title) === page){
					this.data[i]._selected = true;
					this.selectItem(item);
					return true;
				}
			});
		},
		$navOpts : {
			is : "ms-accordion",
			$id : 'nav',
			$multipleSel : true,
			onSelectItem : function(item){
				location.hash = item.$hash || item.title;
			},
			data : navData
		}
	});
	vmodel.$watch("onReady",function(){
		var vm = this;
		setInterval(function(){
			var page = document.querySelector("#page");
			if(page && page.contentWindow){
				try{
					var h = page.contentWindow.document.body.offsetHeight;
					page.style.height = h + "px";
				}catch(ex){}
			}
		},200);
		window.onhashchange = function(){
			vm.dealHashChange();
		};
		vm.dealHashChange();
	});

/***/ },

/***/ 47:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(48);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(10)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(48, function() {
				var newContent = __webpack_require__(48);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(4)();
	// imports


	// module
	exports.push([module.id, "#body .navbar{margin-bottom: 10px}\r\n#body .navbar-toggle{margin-right: 0}\r\n.left{position: absolute;left: 10px;top: 0;width: 200px;}\r\n.center{margin-left: 220px;margin-right: 10px;padding-top: 1px;}\r\n.info{padding: 0 10px 10px 10px;font-size: 1.2rem;}\r\n.info i{margin-right: 5px}\r\nselect.flow-sel{height: 250px;}\r\n.flow-oper button{margin-bottom: 5px;}\r\n.flow-info{padding:5px;border: 1px solid #f0f0f0;border-radius: 5px;}\r\n.flow-info p:last-child{margin-bottom: 0}\r\n@media (max-width: 767px) {\r\n\t.left{position: static;width: auto;margin: 0 10px 10px 10px;}\r\n\t.center{margin-left: 10px;}\r\n\t.flow-oper button{margin-top: 5px;margin-left: 5px;margin-right: 5px;}\r\n\t.flow-oper .vbh{display: none;}\r\n}\r\n.github{\r\n\tposition: absolute;top: 0;right: 0;width: 149px;height: 149px;z-index: 100;\r\n\tcursor: pointer;background: url(" + __webpack_require__(49) + ") no-repeat 0 0;display: block;\r\n}", ""]);

	// exports


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "image/github.png";

/***/ }

});