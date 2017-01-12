webpackJsonp([7],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(71);


/***/ },

/***/ 71:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(13);
	var vmodel = avalon.define({
		$id : "page",
		getSelected : function(){
			avalon.log(avalon.vmodels.demoTable.getSelected());
		},
		getSelections : function(){
			avalon.log(avalon.vmodels.demoTable.getSelections());
		},
		$config : {
			$id : "demoTable",
			is : "ms-table",
			title : "test",
			$singleSelect : true,
			columns : [
				{field : "a1",title : "a1",sort : true},
				{field : "a2",title : "a1"},
				{field : "a3",title : "a1"},
				{field : "a4",title : "a1"},
				{field : "a5",title : "a1"},
				{field : "a6",title : "a1"}
			],
			$frontPageData : [{
				a1 : "rgwrtwrwerewrewrwerewrwerewr"
			},{
				a1 : 33
			},{
				a1 : 35567
			},{
				a1 : 233577
			},{
				a1 : 123
			},{
				a1 : 33
			},{
				a1 : "wefgf324"
			},{
				a1 : 33
			},{
				a1 : 33345
			},{
				a1 : 234535
			},{
				a1 : 32343
			},{
				a1 : 3345
			},{
				a1 : 3643
			},{
				a1 : 3387
			},{
				a1 : 345345435
			},{
				a1 : 34533
			},{
				a1 : 3382
			},{
				a1 : 345345
			},{
				a1 : 33356
			},{
				a1 : 32133
			},{
				a1 : 3378
			},{
				a1 : 234234234
			},{
				a1 : 33
			},{
				a1 : 33
			}]
		}
	});

/***/ }

});