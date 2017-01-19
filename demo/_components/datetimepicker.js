var html = require("./datetimepicker.html");
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