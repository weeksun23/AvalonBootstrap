webpackJsonp([9],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(70);


/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(13);
	__webpack_require__(71);
	var vmodel = avalon.define({
		$id : "page",
		$treeOpts : {
			$id : "tree1",
			is : "ms-tree",
			$url : 'treedata.json',
			checkbox : true,
			loadFilter : function(data){
				return {
					code : 1,
					data : data
				};
			},
			treeList : [{
				text : "asd"
			},{
				iconCls : "glyphicon-home",
				text : "asd"
			},{
				iconCls : "glyphicon-home",
				text : "asd"
			},{
				text : "asd",
				state : "open",
				children : [{
					text : "asd",
					state : "open",
					children : [{
						text : "asd"
					}]
				},{
					text : "asd1"
				},{
					text : "asd2"
				},{
					text : "asd3"
				}]
			},{
				text : "sdfwefwefwe"
			},{
				text : "asd",
				state : "open",
				children : [{
					text : "asd",
					state : "open",
					children : [{
						text : "asd"
					}]
				}]
			},{
				text : "asd",
				state : 'closed'
			}],
			onContextMenu : function(e,el){
				var menu = document.getElementById("menu");
				menu.style.display = 'block';
				menu.style.left = e.pageX + 'px';
				menu.style.top = e.pageY + 'px';
				var fn = avalon.bind(document.body,"click",function(e){
					if(!avalon.mUtil.isSubNode(e.target,"dropdown-menu")){
						menu.style.display = 'none';
						avalon.unbind(document.body,"click",fn);
					}
				});
			}
		},
		$rightTreeOpts : {
			$id : "tree2",
			is : "ms-tree",
			treeList : []
		},
		view : function(){
			var ltree = avalon.vmodels.tree1;
			var arr = [];
			avalon.each(ltree.$model.treeList,function(i,v){
				if(v.checked !== 0){
					arr.push(v);
				}
			});
			//复制数组
			var str = JSON.stringify(arr);
			var copyArr = JSON.parse(str);
			eachNode(copyArr,function(item,i,list){
				if(!item) return;
				if(item.checked === 0){
					item.children = [];
					list.splice(i,1);
				}else{
					avalon.mix(item,{
						loading : false,
						selected : false,
						checked : 0
					});
				}
			});
			var rtree = avalon.vmodels.tree2;
			rtree.treeList = copyArr;
		},
		doCheck : function(checked){
			var tree = avalon.vmodels.tree1;
			avalon.each(tree.treeList,function(i,v){
				tree.toggleCheck(v,checked);
			});
		}
	});
	function eachNode(list,func){
		for(var i=list.length-1;i>=0;i--){
			var item = list[i];
			if(func){
				if(func(item,i,list) === false){
					return false;
				}
			}
			var ch = item.children;
			if(ch.length > 0 && eachNode(ch,func) === false){
				return false;
			}
		}
	}

/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "treedata.json";

/***/ }

});