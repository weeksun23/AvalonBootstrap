var html = require("./dialog.html");
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