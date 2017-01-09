var tpl = require("./avalon.table.html");
require("./avalon.table.css");
AB.preHandlers["ms-table"] = function(vm){
	initFrontPageData(vm);
	initColumns(vm.columns);
};
function initColumns(columns){
	for(var j=0,column;column=columns[j++];){
		var obj = {
			//column基本属性
			//字段名
			field : "",
			//格式化函数
			formatter : avalon.noop,
			//标题
			title : "",
			//列宽度
			width : '',
			//排序
			sort : false,
			sortOrder : ''
		};
		for(var i in obj){
			if(column[i] === undefined){
				column[i] = obj[i];
			}else{
				if(i === 'formatter'){
					if(column.formatter === 'datetime'){
						column.formatter = function(v){
							return avalon.filters.date(v,"yyyy-MM-dd HH:mm:ss");
						};
					}else if(column.formatter === 'date'){
						column.formatter = function(v){
							return avalon.filters.date(v,"yyyy-MM-dd");
						};
					}
				}
			}
		}
	}
}
//初始化每一行数据
function initRowsData(data){
	var obj = {
		_selected : false
	};
	for(var i=0,ii;ii=data[i++];){
		for(var j in obj){
			if(ii[j] === undefined){
				ii[j] = obj[j];
			}
		}
	}
}
//初始化前台分页数据
function initFrontPageData(opts){
	if(opts.url) return;
	var frontPageData = opts.$frontPageData;
	if(!frontPageData) return;
	initRowsData(frontPageData);
	opts.data[opts.$totalKey] = frontPageData.length;
	opts.data[opts.$rowsKey] = [];
}
function setEmptyData(opts){
	var data = opts.data = {};
	data[opts.$totalKey] = 0;
	data[opts.$rowsKey] = [];
}
function getSelect(vmodel,isFirst){
	var data = vmodel.data[vmodel.$rowsKey];
	var re = [];
	for(var i=0,ii;ii=data[i++];){
		if(ii._selected){
			if(isFirst){
				return ii;
			}
			re.push(ii);
		}
	}
	return isFirst ? null : re;
}
function loadDataByPage(vmodel,page,func){
	if(!vmodel.url){
		dealFrontPageData(vmodel,page,func);
	}else{
		ajaxLoad(vmodel,page);
	}
}
function dealFrontPageData(vmodel,page,func){
	if(!vmodel.$frontPageData){
		avalon.error("若不定义url，则请将数据源赋值给frontPageData属性");
	}
	vmodel.curPage = vmodel.changeCurPage = page;
	updatePagination(vmodel);
	var start = (page - 1) * vmodel.pageSize;
	var total = vmodel.data[vmodel.$totalKey];
	if(start >= total){
		start = (vmodel.sumPage - 1) * vmodel.pageSize;
	}
	var end = start + vmodel.pageSize;
	var re = [];
	for(;start < end;start++){
		var item = vmodel.$frontPageData[start];
		if(!item) break;
		re.push(item);
	}
	vmodel.data[vmodel.$rowsKey] = re;
	func && func();
}
function ajaxLoad(vmodel,page,obj){
	var param = {};
	param[vmodel.$pageNoKey] = page;
	param[vmodel.$pageSizeKey] = vmodel.pageSize;
	avalon.mix(vmodel.$queryParams,param,obj);
	avalon.ajaxGet(vmodel.url,vmodel.$queryParams,function(data,errorInfo){
		if(!data){
			//错误
			setEmptyData(vmodel);
			vmodel.changeCurPage = vmodel.curPage = 1;
			updatePagination(vmodel);
			vmodel.onLoadError(errorInfo);
			return;
		}
		if(avalon.type(data) === 'array'){
			//前台分页
			vmodel.loadFrontPageData(data);
		}else{
			//后台分页
			if(vmodel.loadFilter){
				var result = vmodel.loadFilter(data,vmodel.$rowsKey,vmodel.$totalKey);
				if(result){
					data = result;
				}
			}
			initRowsData(data[vmodel.$rowsKey]);
			vmodel.data[vmodel.$rowsKey] = data[vmodel.$rowsKey];
			vmodel.data[vmodel.$totalKey] = data[vmodel.$totalKey];
			vmodel.changeCurPage = vmodel.curPage = page;
			updatePagination(vmodel);
			vmodel.onLoadSuccess(data);
		}
	},vmodel.$element);
}
//更新分页信息
function updatePagination(vmodel){
	var total = vmodel.data[vmodel.$totalKey];
	if(total === 0){
		avalon.each(['sumPage','total','curPage','start','end'],function(i,v){
			vmodel[v] = 0;
		});
	}else{
		vmodel.sumPage = parseInt(total / vmodel.pageSize,10) + (total % vmodel.pageSize > 0 ? 1 : 0);
		if(vmodel.curPage === 0){
			vmodel.changeCurPage = vmodel.curPage = 1;
		}else if(vmodel.curPage > vmodel.sumPage){
			vmodel.changeCurPage = vmodel.curPage = vmodel.sumPage;
		}
		vmodel.start = 1 + vmodel.pageSize * (vmodel.curPage - 1);
		if(vmodel.start + vmodel.pageSize > total){
			vmodel.end = total;
		}else{
			vmodel.end = vmodel.start + vmodel.pageSize - 1;
		}
	}
}
avalon.component("ms-table",{
	template: tpl,
	defaults : {
		onReady : function(){
			this.$watch('pageSize',function(val){
				loadDataByPage(this,1);
			});
			loadDataByPage(this,1);
		},
		// $skipArray : ['totalKey','rowsKey','loadData','frontPageData','queryParams',
		// 		'singleSelect','loadFilter',"pageNoKey","pageSizeKey"],
		dealValue : function(item,el,rowIndex){
			var value = item[el.field];
			if(el.formatter && el.formatter !== avalon.noop){
				return el.formatter(value,item,rowIndex);
			}
			if(value === null || value === undefined){
				return "";
			}
			return value;
		},
		//属性
		$queryParams : {},
		title : '',
		striped : true,
		border : true,
		url : '',
		$totalKey : 'total',
		$rowsKey : 'rows',
		columns : [],
		$frontPageData : [],
		data : {
			total : 0,
			rows : []
		},
		$singleSelect : true,
		pagination : true,
		sumPage : 0,
		curPage : 0,
		changeCurPage : 1,
		start : 0,
		end : 0,
		pageSize : 20,
		pageSizeArr : [20,40,60,80,100],
		nowrap : false,
		showColumnTitle : true,
		loadFilter : avalon.noop,
		$pageNoKey : "pageNo",
		$pageSizeKey : "pageSize",
		$lastSelect : null,
		//方法
		$toThePage : function(e){
			if(e.keyCode === 13){
				loadDataByPage(this,this.changeCurPage || 1);
			}
		},
		$toPage : function(e,p){
			if(e.currentTarget.disabled) return;
			if(typeof p == 'number'){
				var page = this.curPage + p;
			}else if(p == 'first'){
				page = 1;
			}else if(p == 'last'){
				page = this.sumPage;
			}
			loadDataByPage(this,page);
		},
		toggleSelect : function(item){
			if(this.$singleSelect){
				if(item._selected){
					item._selected = false;
					this.$lastSelect = null;
				}else{
					if(this.$lastSelect){
						this.$lastSelect._selected = false;
					}

					item._selected = true;
					this.$lastSelect = item;
				}
			}else{
				item._selected = !item._selected;
				if(item._selected){
					this.onSelect(item);
				}
			}
		},
		sort : function(item){
			if(item.sort){
				if(item.sortOrder === 'bottom'){
					item.sortOrder = 'top';
				}else{
					item.sortOrder = 'bottom';
				}
			}
		},
		load : function(param){
			ajaxLoad(this,1,param || {});
		},
		reload : function(){
			ajaxLoad(this,this.curPage);
		},
		loadFrontPageData : function(data,page){
			initRowsData(data);
			this.$frontPageData = data;
			this.data[this.$totalKey] = data.length;
			dealFrontPageData(this,page || 1);
		},
		getSelected : function(){
			//获取所选的第一个行对象
			return getSelect(this,true);
		},
		getSelections : function(){
			//获取所选的所有行对象
			return getSelect(this,false);
		},
		//事件
		onLoadSuccess : avalon.noop,
		onLoadError : avalon.noop,
		onSelect : avalon.noop
	}
});