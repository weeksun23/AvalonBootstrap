define(["avalon.extend","text!./avalon.table.html","css!./avalon.table.css"],function(avalon,templete){
	function initColumns(columns){
		for(var j=0,column;column=columns[j++];){
			var obj = {
				field : "",
				formatter : null,
				title : ""
			};
			for(var i in obj){
				if(column[i] === undefined){
					column[i] = obj[i];
				}else{
					if(i === 'formatter'){
						if(column.formatter === 'datetime'){
							column.formatter = function(v,r){
								return avalon.filters.date(v,"yyyy-MM-dd HH:mm:ss");
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
		var vmodel = avalon.define(data.tableId,function(vm){
			avalon.mix(vm,options);
			vm.widgetElement = element;
			vm.$skipArray = ['widgetElement','pageSizeArr','totalKey','rowsKey','loadData','frontPageData','queryParams'];
			vm.$init = function(){
				avalon(element).addClass("panel panel-default panel-table");
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				if (typeof options.onInit === "function") {
					options.onInit.call(element, vmodel, options, vmodels);
				}
				if(vmodel.url){
					loadDataByPage(1);
				}
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
				if(avalon(this).hasClass("disabled")) return;
				if(typeof p == 'number'){
					var page = vmodel.curPage + p;
				}else if(p == 'first'){
					page = 1;
				}else if(p == 'last'){
					page = vmodel.sumPage;
				}
				loadDataByPage(page);
			};
			vm.load = function(param){
				ajaxLoad(1,param || {});
			};
		});
		function loadDataByPage(page,func){
			if(!vmodel.url){
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
				if(data.code === 0){
					vmodel.data[vmodel.rowsKey] = data.result.list;
					vmodel.data[vmodel.totalKey] = data.result.totalCount;
					vmodel.changeCurPage = vmodel.curPage = page;
					updatePagination();
				}else{
					vmodel.data[vmodel.rowsKey] = [];
					vmodel.data[vmodel.totalKey] = 0;
					vmodel.changeCurPage = vmodel.curPage = 1;
					updatePagination();
				}
			},vmodel.widgetElement);
		}
		//初始化前台分页数据
		function initFrontPageData(opts){
			if(opts.url) return;
			var frontPageData = opts.frontPageData;
			if(!frontPageData) return;
			var re = [];
			for(var i=0;i<opts.pageSize;i++){
				var item = frontPageData[i];
				if(!item) break;
				re.push(item);
			}
			opts.data[opts.totalKey] = frontPageData.length;
			opts.data[opts.rowsKey] = re;
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
		return vmodel;
	};
	function setEmptyData(opts){
		var data = opts.data = {};
		data[opts.totalKey] = 0;
		data[opts.rowsKey] = 0;
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
		frontPageData : null,
		data : {
			total : 0,
			rows : []
		},
		//pagination options
		pagination : true,
		sumPage : 0,
		curPage : 0,
		changeCurPage : 1,
		start : 0,
		end : 0,
		pageSize : 10,
		pageSizeArr : [10,20,30,40]
	};
});