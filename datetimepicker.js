webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(48);


/***/ },

/***/ 48:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(13);
	avalon.define({
	  $id : "page",
	  d1 : "",
	  d2 : "",
	  $config1 : {
	    $id : "datetimepicker1",
	    is : "ms-datetimepicker",
	    left : 15,
	    onChoose : function(val){
	    	avalon.vmodels.page.d1 = val; 
	    }
	  },
	  showD1 : function(){
	  	avalon.vmodels.datetimepicker1.open();
	  },
	  $config2 : {
	  	$id : "datetimepicker2",
	    is : "ms-datetimepicker",
	    left : 15,
	    format : "yyyy-MM-dd",
	    onChoose : function(val){
	    	avalon.vmodels.page.d2 = val; 
	    }
	  },
	  showD2 : function(){
	  	avalon.vmodels.datetimepicker2.open();
	  }
	});


/***/ }

});