define(["text!./tree.html","tree/avalon.tree"],function(tpl){
	return function(node){
		node.innerHTML = tpl;
		var vmodel = avalon.define({
			$id : +new Date,
			$treeOpts : {
				checkbox : true,
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
					text : "asd"
				}],
				onContextMenu : function(e,el){
					console.log(e,el);
					/*var menu = document.getElementById("menu");
					menu.style.display = 'block';
					menu.style.left = e.pageX + 'px';
					menu.style.top = e.pageY + 'px';
					var offset = avalon(menu).offset();
					menu.style.left = (offset.left - e.pageX) + "px";
					menu.style.top = (offset.top - e.pageY) + "px";
					var fn = avalon.bind(document.body,"click",function(e){
						if(!avalon.mUtil.isSubNode(e.target,"dropdown-menu")){
							menu.style.display = 'none';
							avalon.unbind(document.body,"click",fn);
						}
					});*/
				}
			},
			tree1Opts : {
				treeList : []
			},
			view : function(){
				var ltree = avalon.vmodels.$tree;
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
				var rtree = avalon.vmodels.$tree1;
				rtree.treeList = copyArr;
			},
			doCheck : function(checked){
				var tree = avalon.vmodels.$tree;
				avalon.each(tree.treeList,function(i,v){
					tree.toggleCheck(v,checked);
				});
			}
		});
		avalon.scan(node,vmodel);
	};
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
});