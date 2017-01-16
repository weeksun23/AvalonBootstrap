webpackJsonp([3],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(49);


/***/ },

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2);
	__webpack_require__(11);
	__webpack_require__(13);
	avalon.define({
	  $id : "body",
	  open : function(){
	    avalon.vmodels.testDialog.open();
	  },
	  $config : {
	    $id : "testDialog",
	    is : "ms-dialog",
	    show : false,
	    title : "test",
	    openSub : function(){
	      avalon.vmodels.subDialog.open();
	    }
	  },
	  $subDialogConfig : {
	    $id : "subDialog",
	    is : "ms-dialog",
	    title : "subDialog",
	    buttons : [{
	      text : "close",
	      close : true
	    }],
	    onOpen : function(){
	      
	    }
	  }
	});


/***/ }

});