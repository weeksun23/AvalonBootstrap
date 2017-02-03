var html = require("./accordion.html");
var id = 'demo_accordion';
avalon.define({
	$id : id,
	$config : {
    is : "ms-accordion",
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
      name : 'selectPanel',param : "i:面板的索引值",des : "选中指定面板",value : "undefined"
    },{
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