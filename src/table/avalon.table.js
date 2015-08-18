define(["avalon.extend","text!./avalon.table.html","css!./avalon.table.css"],function(avalon,templete){
	function initColumns(columns){
		for(var j=0,column;column=columns[j++];){
			var obj = {
				//column基本属性
				//字段名
				field : "",
				//格式化函数
				formatter : null,
				//标题
				title : "",
				//列宽度
				width : null,
				//排序
				sort : null,
				sortOrder : null
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
	var widget = avalon.ui.table = function(element, data, vmodels){
		var options = data.tableOptions;
		initFrontPageData(options);
		initColumns(options.columns);
		var lastSelect;
		var vmodel = avalon.define(data.tableId,function(vm){
			avalon.mix(vm,options);
			vm.widgetElement = element;
			vm.$skipArray = ['widgetElement','pageSizeArr','totalKey','rowsKey','loadData','frontPageData','queryParams','singleSelect'];
			vm.$init = function(){
				avalon(element).addClass("panel panel-default mgrid");
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				if (typeof options.onInit === "function") {
					options.onInit.call(element, vmodel, options, vmodels);
				}
				loadDataByPage(1);
			};
			vm.$toThePage = function(e){
				if(e.keyCode === 13){
					loadDataByPage(vmodel.changeCurPage || 1);
				}
			}
			vm.$remove = function(){
				element.innerHTML = element.textContent = ""
			};
			vm.$changePageSize = function(){
				loadDataByPage(vmodel.curPage);
			};
			vm.$toPage = function(p){
				if(this.disabled) return;
				if(typeof p == 'number'){
					var page = vmodel.curPage + p;
				}else if(p == 'first'){
					page = 1;
				}else if(p == 'last'){
					page = vmodel.sumPage;
				}
				loadDataByPage(page);
			};
			vm.toggleSelect = function(item){
				if(vmodel.singleSelect){
					if(item._selected){
						item._selected = false;
						lastSelect = null;
					}else{
						if(lastSelect){
							lastSelect._selected = false;
						}
						item._selected = true;
						lastSelect = item;
					}
				}else{
					item._selected = !item._selected;
				}
			};
			vm.sort = function(item){
				if(item.sort){
					if(item.sortOrder === 'bottom'){
						item.sortOrder = 'top';
					}else{
						item.sortOrder = 'bottom';
					}
				}
			};
			/***/
			vm.load = function(param){
				ajaxLoad(1,param || {});
			};
			vm.reload = function(){
				ajaxLoad(vmodel.curPage);
			};
			vm.loadFrontPageData = function(data,page){
				initRowsData(data);
				vmodel.frontPageData = data;
				vmodel.data[vmodel.totalKey] = data.length;
				dealFrontPageData(page || 1);
			};
			vm.getSelected = function(){
				//获取所选的第一个行对象
				return getSelect(true);
			};
			vm.getSelections = function(){
				//获取所选的所有行对象
				return getSelect(false);
			};
		});
		function getSelect(isFirst){
			var data = vmodel.data[vmodel.rowsKey];
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
		function dealFrontPageData(page,func){
			if(!vmodel.frontPageData){
				avalon.error("若不定义url，则请将数据源赋值给frontPageData属性");
			}
			vmodel.curPage = vmodel.changeCurPage = page;
			updatePagination();
			var start = (page - 1) * vmodel.pageSize;
			var total = vmodel.data[vmodel.totalKey];
			if(start >= total){
				start = (vmodel.sumPage - 1) * vmodel.pageSize;
			}
			var end = start + vmodel.pageSize;
			var re = [];
			for(;start < end;start++){
				var item = vmodel.frontPageData[start];
				if(!item) break;
				re.push(item);
			}
			vmodel.data[vmodel.rowsKey] = re;
			func && func();
		}
		function loadDataByPage(page,func){
			if(!vmodel.url){
				dealFrontPageData(page,func);
			}else{
				ajaxLoad(page);
			}
		}
		function ajaxLoad(page,obj){
			avalon.mix(vmodel.queryParams,{
				pageNo : page,
				pageSize : vmodel.pageSize
			},obj);
			avalon.ajaxGet(vmodel.url,vmodel.queryParams,function(data){
				avalon.log(vmodel.url,"返回数据",data);
				if(avalon.type(data) === 'array'){
					//前台分页
					vmodel.loadFrontPageData(data);
				}else{
					//后台分页
					initRowsData(data[vmodel.rowsKey]);
					vmodel.data[vmodel.rowsKey] = data[vmodel.rowsKey];
					vmodel.data[vmodel.totalKey] = data[vmodel.totalKey];
					vmodel.changeCurPage = vmodel.curPage = page;
					updatePagination();
				}
			},vmodel.widgetElement);
		}
		//初始化前台分页数据
		function initFrontPageData(opts){
			if(opts.url) return;
			var frontPageData = opts.frontPageData;
			if(!frontPageData) return;
			initRowsData(frontPageData);
			opts.data[opts.totalKey] = frontPageData.length;
			opts.data[opts.rowsKey] = [];
		}
		//更新分页信息
		function updatePagination(){
			var total = vmodel.data[vmodel.totalKey];
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
		return vmodel;
	};
	function setEmptyData(opts){
		var data = opts.data = {};
		data[opts.totalKey] = 0;
		data[opts.rowsKey] = [];
	}
	widget.version = 1.0;
	//url frontPageData
	widget.defaults = {
		//table标题
		queryParams : {},
		title : null,
		striped : true,
		border : true,
		url : null,
		totalKey : 'total',
		rowsKey : 'rows',
		/*
		title:标题,field:字段名
		*/
		columns : [],
		frontPageData : [],
		data : {
			total : 0,
			rows : []
		},
		singleSelect : true,
		//pagination options
		pagination : true,
		sumPage : 0,
		curPage : 0,
		changeCurPage : 1,
		start : 0,
		end : 0,
		pageSize : 10,
		pageSizeArr : [10,20,30,40],
		nowrap : false,
		showColumnTitle : true
	};
});