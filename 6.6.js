webpackJsonp([6],{

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./accordion": 56,
		"./accordion.html": 57,
		"./accordion.js": 56,
		"./autocomplete": 58,
		"./autocomplete.html": 59,
		"./autocomplete.js": 58,
		"./datetimepicker": 60,
		"./datetimepicker.html": 61,
		"./datetimepicker.js": 60,
		"./dialog": 62,
		"./dialog.html": 63,
		"./dialog.js": 62,
		"./dropdown": 64,
		"./dropdown.html": 65,
		"./dropdown.js": 64,
		"./overview": 66,
		"./overview.html": 67,
		"./overview.js": 66,
		"./tab": 68,
		"./tab.html": 69,
		"./tab.js": 68,
		"./table": 70,
		"./table.html": 71,
		"./table.js": 70,
		"./tooltip": 72,
		"./tooltip.html": 73,
		"./tooltip.js": 72,
		"./tree": 74,
		"./tree.html": 75,
		"./tree.js": 74,
		"./treedata": 76,
		"./treedata.json": 76
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
	webpackContext.id = 55;


/***/ },

/***/ 56:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(57);
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

/***/ 57:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_accordion\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<h3>从data属性初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget=\"@$config\"></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t    $id : \"accordion\",\r\n\t    is : \"ms-accordion\",\r\n\t    $multipleSel : false,\r\n\t    data : [{\r\n\t      title : \"a1\",\r\n\t      children : [{\r\n\t        title : \"a1-1\"\r\n\t      },{\r\n\t        title : \"a1-2\",\r\n\t        iconCls : \"glyphicon-text-height\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"a2\",\r\n\t      children : [{\r\n\t        title : \"a2-1\",iconCls : \"glyphicon-text-height\"\r\n\t      },{\r\n\t        title : \"a2-2\"\r\n\t      }]\r\n\t    },{\r\n\t      title : \"content\",\r\n\t      content : \"<h1>testtest</h1>\"\r\n\t    }]\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n\t<h3>从html初始化</h3>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$config'>\r\n\t    <div title='a1'><h2>testetst</h2></div>\r\n\t    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n\t    <div title='a3'><h2>dfherhe</h2></div>\r\n\t  </xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t    $id : \"accordion\",\r\n\t    is : \"ms-accordion\"\r\n\t  }\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config1'>\r\n\t\t<div title='a1'><h2>testetst</h2></div>\r\n    <div title='a2'><h2>f3f323e32e</h2><p>wfewwef</p><h3>fewg34h3</h3></div>\r\n    <div title='a3'><h2>dfherhe</h2></div>\r\n\t</xmp>\r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<xmp :widget=\"@$attr_data\"></xmp>\r\n\t<xmp :widget=\"@$attr_data_children\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$method\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 58:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(59);
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

/***/ 59:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_autocomplete\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget=\"@$config\"></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t\t  is : \"ms-autocomplete\",\r\n\t\t  placeholder : \"请输入搜索关键字\",\r\n\t\t  $inputValueKey : '',\r\n\t\t  $source : [3434,2323,5444,3434,232323]\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$eve\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 60:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(61);
	avalon.define({
		$id : "demo_datetimepicker",
		d1 : "",
	  d2 : "",
	  $config1 : {
	    $id : "datetimepicker1",
	    is : "ms-datetimepicker",
	    position : 'top-right',
	    bottom : '100%',
	    top : 'auto',
	    left : 15,
	    onChoose : function(val){
	    	avalon.vmodels.demo_datetimepicker.d1 = val; 
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
	    	avalon.vmodels.demo_datetimepicker.d2 = val; 
	    }
	  },
	  showD2 : function(){
	  	avalon.vmodels.datetimepicker2.open();
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
	      name : 'weekdaysName',type : "array",des : "一周每天的名字",
	      value : "['日','一','二','三','四','五','六']"
	    },{
	      name : "monthName",type : "array",des : "每月的名字",
	      value : '["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]'
	    },{
	      name : "yearText",type : 'string',des : '年的描述名字',
	      value : '年'
	    },{
	      name : "bottom",type : 'number,string',des : '日历div的bottom值',
	      value : 'auto'
	    },{
	      name : "left",type : 'number,string',des : '日历div的left值',
	      value : '0'
	    },{
	      name : "top",type : 'number,string',des : '日历div的top值',
	      value : '100%'
	    },{
	      name : "position",type : 'string',des : '日历边缘端箭头的位置(相对于输入框)',
	      value : 'bottom-right'
	    },{
	      name : "format",type : 'string',des : '日期值格式',
	      value : 'yyyy-MM-dd hh:mm:ss'
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
	      name : "clear",param : "--",value : "undefined",des : "清空日历的值，若open的时候传入了输入框所需的引用值则同时清空输入框"
	    },{
	      name : "setToday",param : "--",value : "undefined",des : "将日历的时间置为当前时间"
	    },{
	      name : "setValue",param : "date:要设置的时间值，必须为date类型",value : "undefined",
	      des : "将日历的时间设置为指定时间"
	    },{
	      name : "getDate",param : "--",value : "当前日历的时间",des : "获取当前日历的时间"
	    },{
	      name : "getValue",param : "--",value : "当前日历的时间经过格式化后的值",des : "获取当前日历的时间格式化值"
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
	      name : "onChoose",param : "value:格式化日期字符串,date:日历当前时间",
	      des : "选择日期时触发的事件"
	    }]
	  }
	});
	module.exports = html;

/***/ },

/***/ 61:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_datetimepicker\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<form class=\"form-horizontal\">\r\n\t\t  <div class=\"form-group\">\r\n\t\t    <label class=\"col-sm-2 control-label\">日期1</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"选择日期\" readonly :click=\"@showD1\" :duplex=\"@d1\">\r\n\t\t      <xmp :widget=\"@$config1\"></xmp>\r\n\t\t    </div>\r\n\t\t    <label class=\"col-sm-2 control-label\">日期2</label>\r\n\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"选择日期\" readonly :click=\"@showD2\" :duplex=\"@d2\">\r\n\t\t      <xmp :widget=\"@$config2\"></xmp>\r\n\t\t    </div>\r\n\t\t  </div>\r\n\t\t</form>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\td1 : \"\",\r\n\t  d2 : \"\",\r\n\t  $config1 : {\r\n\t    $id : \"datetimepicker1\",\r\n\t    is : \"ms-datetimepicker\",\r\n\t    position : 'top-right',\r\n\t    bottom : '100%',\r\n\t    top : 'auto',\r\n\t    left : 15,\r\n\t    onChoose : function(val){\r\n\t    \tavalon.vmodels.demo_datetimepicker.d1 = val; \r\n\t    }\r\n\t  },\r\n\t  showD1 : function(){\r\n\t  \tavalon.vmodels.datetimepicker1.open();\r\n\t  },\r\n\t  $config2 : {\r\n\t  \t$id : \"datetimepicker2\",\r\n\t    is : \"ms-datetimepicker\",\r\n\t    left : 15,\r\n\t    format : \"yyyy-MM-dd\",\r\n\t    onChoose : function(val){\r\n\t    \tavalon.vmodels.demo_datetimepicker.d2 = val; \r\n\t    }\r\n\t  },\r\n\t  showD2 : function(){\r\n\t  \tavalon.vmodels.datetimepicker2.open();\r\n\t  },\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<div calss='row'>\r\n\t\t<div class='col-sm-12'>\r\n\t\t\t<form class=\"form-horizontal\">\r\n\t\t\t  <div class=\"form-group\">\r\n\t\t\t    <label class=\"col-sm-2 control-label\">日期1</label>\r\n\t\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"选择日期\" readonly :click=\"@showD1\" :duplex=\"@d1\">\r\n\t\t\t      <xmp :widget=\"@$config1\"></xmp>\r\n\t\t\t    </div>\r\n\t\t\t    <label class=\"col-sm-2 control-label\">日期2</label>\r\n\t\t\t    <div class=\"col-sm-4 posr\">\r\n\t\t\t      <input type=\"text\" class=\"form-control\" placeholder=\"选择日期\" readonly :click=\"@showD2\" :duplex=\"@d2\">\r\n\t\t\t      <xmp :widget=\"@$config2\"></xmp>\r\n\t\t\t    </div>\r\n\t\t\t  </div>\r\n\t\t\t</form>\r\n\t\t</div>\r\n\t</div>\r\n\t<h2>配置项说明</h2>\r\n\t<xmp :widget=\"@$attr\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$method\"></xmp>\r\n\t<hr>\r\n\t<xmp :widget=\"@$eve\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(63);
	avalon.define({
		$id : "demo_dialog",
		$htmlconfig : {
			$id : "htmlDialog",
	    is : "ms-dialog",
	    title : "htmlDialog",
	    bodyStyle : {backgroundColor : '#eee'}
		},
		showHtmlDialog : function(){
			avalon.vmodels.htmlDialog.open();
		},
		$jsconfig : {
			$id : 'jsDialog',
			is : "ms-dialog",
			title : 'jsDialog',
			content : "<h1>rr444rrr</h1><h2>regergrg</h2>",
			buttons : [{text : 'ok',close : true}]
		},
		showJsDialog : function(){
			avalon.vmodels.jsDialog.open();
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
	      name : "buttons",type:"array",des : "dialog按钮数组",value : "[]"
	    },{
	      name : "title",type : "string",des : "dialog标题",value : "''"
	    },{
	      name : "content",type : "string",des : "dialog html内容",value : "''"
	    },{
	      name : "btnAlign",type : "string",des : "按钮对齐方向(left,center,right)",value : "''(向右对齐)"
	    },{
	    	name : "bodyStyle",type : "object",des : "应用在modal-body上的样式对象",value : '{}'
	    }]
		},
		$attr_buttons : {
			title : "button属性",
	    is : "ms-table",
	    pagination : false,
	    columns : [
	      {field : "name",title : "属性名"},
	      {field : "type",title : "类型"},
	      {field : "des",title : "说明"},
	      {field : "value",title : "默认值"}
	    ],
	    $frontPageData : [{
	      name : "close",type:"bool",des : "点击按钮后是否自动关闭dialog(若有handler则先执行handler,如果close为true但是handler返回false，则不关闭dialog)",
	      value : "false"
	    },{
	      name : "theme",type : "string",des : "按钮样式",value : "default"
	    },{
	      name : "handler",type : "function",des : "按钮点击事件处理方法，方法内部上下文为dialog vm，并传入按钮vm对象参数(el.handler.call(this,el))",
	      value : "avalon.noop"
	    },{
	      name : "text",type : "string",des : "按钮文字",value : "''"
	    },{
	    	name : "iconCls",type : "string",des : "按钮图标",value : "''"
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
	      name : "open",param:"无",des : "打开dialog",value : "undefined"
	    },{
	      name : "close",param : "无",
	      des : "关闭dialog",
	      value : "undefined"
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
	      name : "onBeforeOpen",param:"无",des : "窗口打开前触发，返回false中断打开"
	    },{
	    	name : "onOpen",param : "无",des : "窗口打开后触发(动画效果结束后)"
	    },{
	    	name : "onBeforeClose",param : "无",des : "窗口关闭前触发，返回false中断关闭"
	    },{
	    	name : 'onClose',param : "无",des : "窗口关闭后触发(动画效果开始前)"
	    }]
	  }
	});
	module.exports = html;

/***/ },

/***/ 63:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_dialog\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$htmlconfig'>\r\n\t    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n\t  </xmp>\r\n\t  <xmp :widget='@$jsconfig'></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$htmlconfig : {\r\n\t\t\t$id : \"htmlDialog\",\r\n\t    is : \"ms-dialog\",\r\n\t    title : \"htmlDialog\"\r\n\t\t},\r\n\t\tshowHtmlDialog : function(){\r\n\t\t\tavalon.vmodels.htmlDialog.open();\r\n\t\t},\r\n\t\t$jsconfig : {\r\n\t\t\t$id : 'jsDialog',\r\n\t\t\tis : \"ms-dialog\",\r\n\t\t\ttitle : 'jsDialog',\r\n\t\t\tcontent : \"<h1>rr444rrr</h1><h2>regergrg</h2>\",\r\n\t\t\tbuttons : [{text : 'ok',close : true}]\r\n\t\t},\r\n\t\tshowJsDialog : function(){\r\n\t\t\tavalon.vmodels.jsDialog.open();\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<button class='btn btn-default' :click=\"@showHtmlDialog\">从html初始化的dialog</button>\r\n\t<button class='btn btn-default' :click=\"@showJsDialog\">从js初始化的dialog</button>\r\n\t<xmp ms-widget='@$htmlconfig'>\r\n    <h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1><h1>wefwefwef</h1>\r\n  </xmp>\r\n  <xmp ms-widget='@$jsconfig'></xmp>\r\n  <h2>配置项说明</h2>\r\n  <xmp :widget=\"@$attr\"></xmp>\r\n  <xmp :widget=\"@$attr_buttons\"></xmp>\r\n  <hr>\r\n  <xmp :widget=\"@$method\"></xmp>\r\n  <hr>\r\n  <xmp :widget=\"@$eve\"></xmp>\r\n</div>\r\n";

/***/ },

/***/ 64:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(65);
	function getData(){
		return [{
		text : 'rewr32r3r',
		handler : function(){
		  alert(1);
		}
	  },{
		text : '13f32f',$clickedHide : false
	  },{
		text : 'd12fgew'
	  },{
		text : '23r32r32r'
	  }];
	}
	avalon.define({
		$id : "demo_dropdown",
		$config : {
		is : "ms-dropdown",
		data : getData()
		},
		$config1 : {
		is : "ms-dropdown",
		data : getData(),
		split : true,
		dropup : true
		},
		$config2 : {
		is : "ms-dropdown",
		data : getData(),
		split : true,
		dropup : true,
		size : 'lg',
		theme : "success",
		handler : function(){
			alert("clickbtn");
			}
		}
	});
	module.exports = html;

/***/ },

/***/ 65:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_dropdown\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$config'></xmp>\r\n\t\t<xmp :widget='@$config1'></xmp>\r\n\t\t<xmp :widget='@$config2'></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\tfunction getData(){\r\n\t\t\treturn [{\r\n\t      text : 'rewr32r3r',\r\n\t      handler : function(){\r\n\t        alert(1);\r\n\t      }\r\n\t    },{\r\n\t      text : '13f32f',$clickedHide : false\r\n\t    },{\r\n\t      text : 'd12fgew'\r\n\t    },{\r\n\t      text : '23r32r32r'\r\n\t    }];\r\n\t\t}\r\n\t\t...\r\n\t\t$config : {\r\n\t    is : \"ms-dropdown\",\r\n\t    data : getData()\r\n\t\t},\r\n\t\t$config1 : {\r\n\t    is : \"ms-dropdown\",\r\n\t    data : getData(),\r\n\t    split : true,\r\n\t    dropup : true\r\n\t\t},\r\n\t\t$config2 : {\r\n\t    is : \"ms-dropdown\",\r\n\t    data : getData(),\r\n\t    split : true,\r\n\t    dropup : true,\r\n\t    size : 'lg',\r\n\t    theme : \"success\",\r\n\t    handler : function(){\r\n\t    \talert(\"clickbtn\");\r\n\t\t\t}\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n\t<xmp :widget='@$config1'></xmp>\r\n\t<xmp :widget='@$config2'></xmp>\r\n</div>\r\n";

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(67);
	avalon.define({
		$id : "demo_overview"
	});
	module.exports = html;

/***/ },

/***/ 67:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_overview\" class='demo'>\r\n\t<h2>AvalonBootstrap</h2>\r\n\t<ul>\r\n\t\t<li>\r\n\t\t\t基于avalon2.2.3和Bootstrap3\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t内置基于reqwest.js的ajax模块\r\n\t\t</li>\r\n\t\t<li>\r\n\t\t\t使用webpack构建\r\n\t\t</li>\r\n\t</ul>\r\n</div>";

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(69);
	avalon.define({
		$id : "demo_tab",
		$htmlTab : {
	    is : "ms-tab"
		},
		$jsTab : {
	    is : "ms-tab",
	    headerData : [{title : "a1",iconCls : "ok"},{title : "a2",closeable : true}],
	    contentData : [{html : "<h1>gwgewerer</h1>"},{html : "<h1>gwweewgewerer</h1>"}]
		}
	});
	module.exports = html;

/***/ },

/***/ 69:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tab\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$htmlTab'>\r\n\t\t\t<div title='dddd'>qwe</div>\r\n\t\t\t<div title='wewe'>vewvewfw</div>\r\n\t\t\t<div title='htth'>3f223</div>\r\n\t\t\t<div title='qwe2'>qweasadasd</div>\r\n\t\t\t<div title='cfda'>\r\n\t\t\t\t<h1>dsgse</h1>\r\n\t\t\t\t<h1>dsgse</h1>\r\n\t\t\t</div>\r\n\t\t</xmp>\r\n\t\t<xmp :widget='@$jsTab'></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$htmlTab : {\r\n\t    is : \"ms-tab\"\r\n\t\t},\r\n\t\t$jsTab : {\r\n\t    is : \"ms-tab\",\r\n\t    headerData : [{title : \"a1\",iconCls : \"ok\"},{title : \"a2\",closeable : true}],\r\n\t    contentData : [{html : \"<h1>gwgewerer</h1>\"},{html : \"<h1>gwweewgewerer</h1>\"}]\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$htmlTab'>\r\n\t\t<div title='dddd'>qwe</div>\r\n\t\t<div title='wewe'>vewvewfw</div>\r\n\t\t<div title='htth'>3f223</div>\r\n\t\t<div title='qwe2'>qweasadasd</div>\r\n\t\t<div title='cfda'>\r\n\t\t\t<h1>dsgse</h1>\r\n\t\t\t<h1>dsgse</h1>\r\n\t\t</div>\r\n\t</xmp>\r\n\t<xmp :widget='@$jsTab'></xmp>\r\n</div>\r\n";

/***/ },

/***/ 70:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(71);
	avalon.define({
		$id : "demo_table",
		$config : {
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
	module.exports = html;

/***/ },

/***/ 71:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_table\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$config'></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t\t\tis : \"ms-table\",\r\n\t\t\ttitle : \"test\",\r\n\t\t\t$singleSelect : true,\r\n\t\t\tcolumns : [\r\n\t\t\t\t{field : \"a1\",title : \"a1\",sort : true},\r\n\t\t\t\t{field : \"a2\",title : \"a1\"},\r\n\t\t\t\t{field : \"a3\",title : \"a1\"},\r\n\t\t\t\t{field : \"a4\",title : \"a1\"},\r\n\t\t\t\t{field : \"a5\",title : \"a1\"},\r\n\t\t\t\t{field : \"a6\",title : \"a1\"}\r\n\t\t\t],\r\n\t\t\t$frontPageData : [{\r\n\t\t\t\ta1 : \"rgwrtwrwerewrewrwerewrwerewr\"\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33\r\n\t\t\t},{\r\n\t\t\t\ta1 : 35567\r\n\t\t\t},{\r\n\t\t\t\ta1 : 233577\r\n\t\t\t},{\r\n\t\t\t\ta1 : 123\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33\r\n\t\t\t},{\r\n\t\t\t\ta1 : \"wefgf324\"\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33345\r\n\t\t\t},{\r\n\t\t\t\ta1 : 234535\r\n\t\t\t},{\r\n\t\t\t\ta1 : 32343\r\n\t\t\t},{\r\n\t\t\t\ta1 : 3345\r\n\t\t\t},{\r\n\t\t\t\ta1 : 3643\r\n\t\t\t},{\r\n\t\t\t\ta1 : 3387\r\n\t\t\t},{\r\n\t\t\t\ta1 : 345345435\r\n\t\t\t},{\r\n\t\t\t\ta1 : 34533\r\n\t\t\t},{\r\n\t\t\t\ta1 : 3382\r\n\t\t\t},{\r\n\t\t\t\ta1 : 345345\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33356\r\n\t\t\t},{\r\n\t\t\t\ta1 : 32133\r\n\t\t\t},{\r\n\t\t\t\ta1 : 3378\r\n\t\t\t},{\r\n\t\t\t\ta1 : 234234234\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33\r\n\t\t\t},{\r\n\t\t\t\ta1 : 33\r\n\t\t\t}]\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n</div>\r\n";

/***/ },

/***/ 72:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(73);
	avalon.define({
		$id : "demo_tooltip",
		$tooltip1 : {
			position : "bottom",content : "wefwefewf"
		},
		$tooltip2 : {
			content:"<span ms-tooltip='{content : \"hdggrrr\"}'>tooltip</span>",position:'bottom',
			type:'popover',title:'gergergerg',
			triggerOn : 'click'
		}
	});
	module.exports = html;

/***/ },

/***/ 73:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tooltip\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<span ms-tooltip=\"@$tooltip1\">tooltip(hover me)</span><br>\r\n\t\t<span ms-tooltip=\"@$tooltip2\">popover(click me)</span>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$tooltip1 : {\r\n\t\t\tposition : \"bottom\",content : \"wefwefewf\"\r\n\t\t},\r\n\t\t$tooltip2 : {\r\n\t\t\tcontent:\"<span ms-tooltip='{content : \\\"hdggrrr\\\"}'>tooltip</span>\",position:'bottom',\r\n\t\t\ttype:'popover',title:'gergergerg',\r\n\t\t\ttriggerOn : 'click'\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<span ms-tooltip=\"@$tooltip1\">tooltip(hover me)</span><br>\r\n\t<span ms-tooltip=\"@$tooltip2\">popover(click me)</span>\r\n</div>\r\n";

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	var html = __webpack_require__(75);
	avalon.define({
		$id : "demo_tree",
		$config : {
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
			}]
		}
	});
	module.exports = html;

/***/ },

/***/ 75:
/***/ function(module, exports) {

	module.exports = "<div :controller=\"demo_tree\" class='demo'>\r\n\t<h2>初始化</h2>\r\n\t<code>html:</code>\r\n\t<pre class='demo-code'>\r\n\t\t<xmp :widget='@$config'></xmp>\r\n\t</pre>\r\n\t<code>js:</code>\r\n\t<pre class='demo-code'>\r\n\t\t$config : {\r\n\t\t\tis : \"ms-tree\",\r\n\t\t\t$url : 'treedata.json',\r\n\t\t\tcheckbox : true,\r\n\t\t\tloadFilter : function(data){\r\n\t\t\t\treturn {\r\n\t\t\t\t\tcode : 1,\r\n\t\t\t\t\tdata : data\r\n\t\t\t\t};\r\n\t\t\t},\r\n\t\t\ttreeList : [{\r\n\t\t\t\ttext : \"asd\"\r\n\t\t\t},{\r\n\t\t\t\ticonCls : \"glyphicon-home\",\r\n\t\t\t\ttext : \"asd\"\r\n\t\t\t},{\r\n\t\t\t\ticonCls : \"glyphicon-home\",\r\n\t\t\t\ttext : \"asd\"\r\n\t\t\t},{\r\n\t\t\t\ttext : \"asd\",\r\n\t\t\t\tstate : \"open\",\r\n\t\t\t\tchildren : [{\r\n\t\t\t\t\ttext : \"asd\",\r\n\t\t\t\t\tstate : \"open\",\r\n\t\t\t\t\tchildren : [{\r\n\t\t\t\t\t\ttext : \"asd\"\r\n\t\t\t\t\t}]\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext : \"asd1\"\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext : \"asd2\"\r\n\t\t\t\t},{\r\n\t\t\t\t\ttext : \"asd3\"\r\n\t\t\t\t}]\r\n\t\t\t},{\r\n\t\t\t\ttext : \"sdfwefwefwe\"\r\n\t\t\t},{\r\n\t\t\t\ttext : \"asd\",\r\n\t\t\t\tstate : \"open\",\r\n\t\t\t\tchildren : [{\r\n\t\t\t\t\ttext : \"asd\",\r\n\t\t\t\t\tstate : \"open\",\r\n\t\t\t\t\tchildren : [{\r\n\t\t\t\t\t\ttext : \"asd\"\r\n\t\t\t\t\t}]\r\n\t\t\t\t}]\r\n\t\t\t},{\r\n\t\t\t\ttext : \"asd\",\r\n\t\t\t\tstate : 'closed'\r\n\t\t\t}]\r\n\t\t}\r\n\t</pre>\r\n\t<code>结果:</code>\r\n\t<xmp :widget='@$config'></xmp>\r\n</div>\r\n";

/***/ },

/***/ 76:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "treedata.json";

/***/ }

});