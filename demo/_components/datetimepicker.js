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
    $frontPageData : []
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
    $frontPageData : []
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
    $frontPageData : []
  }
});
module.exports = html;