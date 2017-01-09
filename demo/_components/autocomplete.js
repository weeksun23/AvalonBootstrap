var html = require("./autocomplete.html");
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