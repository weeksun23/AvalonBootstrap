webpackJsonp([5],{

/***/ 49:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accordion": 50,
		"./accordion.html": 51,
		"./accordion.js": 50,
		"./autocomplete": 52,
		"./autocomplete.html": 53,
		"./autocomplete.js": 52,
		"./dialog": 54,
		"./dialog.html": 55,
		"./dialog.js": 54,
		"./dropdown": 56,
		"./dropdown.html": 57,
		"./dropdown.js": 56,
		"./tab": 58,
		"./tab.html": 59,
		"./tab.js": 58,
		"./table": 60,
		"./table.html": 61,
		"./table.js": 60,
		"./tooltip": 62,
		"./tooltip.html": 63,
		"./tooltip.js": 62,
		"./tree": 64,
		"./tree.html": 65,
		"./tree.js": 64
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 49;


/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(51);
	var id = 'demo_accordion';
	avalon.define({
		$id : id,
		$config : {
	    is : "ms-accordion",
	    $multipleSel : false,
	    data : [{
	      title : "a1",
	      children : [{
	        title : "a1-1"
	      },{
	        title : "a1-2",
	        iconCls : "glyphicon-text-height"
	      }]
	    },{
	      title : "a2",
	      children : [{
	        title : "a2-1",iconCls : "glyphicon-text-height"
	      },{
	        title : "a2-2"
	      }]
	    },{
	      title : "content",
	      content : "<h1>testtest</h1>"
	    }]
	  },
	  $config1 : {
	    is : "ms-accordion"
	  },
	  $attr : {
	    title : "属性",
	    is : "ms-table",
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "$multipleSel",type:"bool",des : "是否能同时展开多个panel",value : "false"
	    },{
	      name : "data",type : "array",des : "面板数据数组",value : "[]"
	    }]
	  },
	  $attr_data : {
	    title : "data属性",
	    is : 'ms-table',
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "title",type:"string",des : "panel标题",value : "''"
	    },{
	      name : "content",type : "string",des : "若children数组为空，则取content作为panel的html",value : "''"
	    },{
	      name : "iconCls",type : "string",des : '标题左则Glyphicons图标',value : "''"
	    },{
	      name : "children",type : 'array',des : "列表数据",value : "[]"
	    }]
	  },
	  $attr_data_children : {
	    title : "children属性",
	    is : 'ms-table',
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "title",type:"string",des : "列表项标题",value : "''"
	    },{
	      name : "selected",type : "bool",des : "列表项是否被选中",value : "false"
	    },{
	      name : "iconCls",type : "string",des : '标题左则Glyphicons图标',value : "''"
	    }]
	  },
	  $method : {
	    title : "方法",
	    is : 'ms-table',
	    pagination : false,
	    columns : [
	      {field : "name",title : "方法名"},
	      {field : "param",title : "参数"},
	      {field : "value",title : "返回值"},
	      {field : "des",title : "说明"}
	    ],
	    $frontPageData : [{
	      name : "selectItem",param:"ch:列表项vm",des : "选中panel下的指定的列表项",value : "undefined"
	    },{
	      name : "findItem",param : "func(ch,itemIndex,panelIndex):遍历列表项时的处理函数",
	      des : "遍历每个panel下的item",
	      value : "若处理函数返回真则返回遍历到的列表项，否则返回null"
	    },{
	      name : "getSelectedItem",param : "无",
	      des : '获取选中的列表项vm',value : "选中的列表项vm"
	    },{
	      name : "selectItemByText",param : "列表项title",
	      des : '根据列表项title选中相应的列表项',
	      value : "undefined"
	    }]
	  }
	});
	module.exports = html;

/***/ },

/***/ 51:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_accordion\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<h3>从data属性初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget=\"@$config\"></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t    $id : \"accordion\",\r\n\t    is : \"ms-accordion\",\r\n\t    $multipleSel : false,\r\n\t    data : [{\r\n\t      title : \"a1\",\r\n\t      children : [{\r\n\t        title : \"a1-1\"\r\n\t      },{\r\n\t        title : \"a1-2\",\r\n\t        iconCls : \"glyphicon-text-height\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"a2\",\r\n\t      children : [{\r\n\t        title : \"a2-1\",iconCls : \"glyphicon-text-height\"\r\n\t      },{\r\n\t        title : \"a2-2\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"content\",\r\n\t      content : \"<h1>testtest</h1>\"\r\n\t    }]\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n\t<h3>从html初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$config'>\r\n\t    <div title='a1'><h2>testetst</h2></div>\r\n\t    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n\t    <div title='a3'><h2>dfherhe</h2></div>\r\n\t  </xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t    $id : \"accordion\",\r\n\t    is : \"ms-accordion\"\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config1'>\r\n\t\t<div title='a1'><h2>testetst</h2></div>\r\n    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n    <div title='a3'><h2>dfherhe</h2></div>\r\n\t</xmp>\r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<xmp :widget=\"@$attr_data\"></xmp>\r\n\t<xmp :widget=\"@$attr_data_children\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$method\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(53);
	var id = 'demo_autocomplete';
	avalon.define({
		$id : id,
		$config : {
	    is : "ms-autocomplete",
	    placeholder : "请输入搜索关键字",
	    $inputValueKey : '',
	    $source : [3434,2323,5444,3434,232323]
	  },
	  $attr : {
	    title : "属性",
	    is : "ms-table",
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "placeholder",type:"string",des : "input placeholder",value : ""
	    },{
	      name : "$inputValueKey",type : "string",
	      des : "如果有值，则data或者source返回的数据必须为对象obj组成的数组，input将由obj[inputValueKey]显示;如果没值，则data或者source返回的数据必须为非对象组成的数组",
	      value : "text"
	    },{
	      name : "value",type : "string",
	      des : "当前的搜索关键字",
	      value : ""
	    },{
	      name : "$textKey",type : "string",
	      des : "后台返回数据项的text键值，取其数据值到列表上显示",
	      value : "text"
	    },{
	      name : "$source",type : "array function:(value:搜索关键字,callback:回调，获取搜索结果后调用该回调)",
	      des : "数据源，若是array则是静态数据源，若是function则是动态数据源",
	      value : "null"
	    },{
	      name : "loadingText",type : "string",
	      des : "在搜索结果出来前结果区域显示的文字",
	      value : "加载中..."
	    },{
	      name : "nonDataText",type : "string",
	      des : "搜索结果为空的时候结果区域显示的文字",
	      value : "暂无数据"
	    }]
	  },
	  $eve : {
	    title : "事件",
	    is : "ms-table",
	    pagination : false,
	    columns : [
	      {field : "name",title : "事件名称"},
	      {field : "param",title : "参数"},
	      {field : "des",title : "说明"}
	    ],
	    $frontPageData : [{
	      name : "onSelect",param:"el:所选的项",des : "选中结果项时触发"
	    }]
	  }
	});
	module.exports = html;

/***/ },

/***/ 53:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_autocomplete\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget=\"@$config\"></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t\t  is : \"ms-autocomplete\",\r\n\t\t  placeholder : \"请输入搜索关键字\",\r\n\t\t  $inputValueKey : '',\r\n\t\t  $source : [3434,2323,5444,3434,232323]\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$eve\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(55);
	avalon.define({
		$id : "demo_dialog",
		$htmlconfig : {
			$id : "htmlDialog",
	    is : "ms-dialog",
	    title : "test"
		},
		showHtmlDialog : function(){
			avalon.vmodels.htmlDialog.open();
		}
	});
	module.exports = html;

/***/ },

/***/ 55:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_dialog\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp ms-widget='@$htmlconfig'>\r\n\t    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n\t  </xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$htmlconfig : {\r\n\t\t\t$id : \"htmlDialog\",\r\n\t    is : \"ms-dialog\",\r\n\t    title : \"test\"\r\n\t\t},\r\n\t\tshowHtmlDialog : function(){\r\n\t\t\tavalon.vmodels.htmlDialog.open();\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<button class='btn btn-default' :click=\"@showHtmlDialog\">从html初始化的dialog</button>\r\n\t<xmp ms-widget='@$htmlconfig'>\r\n    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n  </xmp>\r\n</div>\r\n";

/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(57);
	avalon.define({
		$id : "demo_dropdown"
	});
	module.exports = html;

/***/ },

/***/ 57:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_dropdown\" class='demo'>\r\n\t<h2>开发中，敬请期待</h2>\r\n</div>\r\n";

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(59);
	avalon.define({
		$id : "demo_tab"
	});
	module.exports = html;

/***/ },

/***/ 59:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tab\" class='demo'>\r\n\t<h2>开发中，敬请期待</h2>\r\n</div>\r\n";

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(61);
	avalon.define({
		$id : "demo_table"
	});
	module.exports = html;

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_table\" class='demo'>\r\n\t<h2>开发中，敬请期待</h2>\r\n</div>\r\n";

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(63);
	avalon.define({
		$id : "demo_tooltip"
	});
	module.exports = html;

/***/ },

/***/ 63:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tooltip\" class='demo'>\r\n\t<h2>开发中，敬请期待</h2>\r\n</div>\r\n";

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(65);
	avalon.define({
		$id : "demo_tree"
	});
	module.exports = html;

/***/ },

/***/ 65:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tree\" class='demo'>\r\n\t<h2>开发中，敬请期待</h2>\r\n</div>\r\n";

/***/ }

});