var html = require("./accordion.html");
avalon.define({
	$id : "demo_accordion",
	$config : {
    $id : "accordion",
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
    $id : "accordion1",
    is : "ms-accordion"
  }
});
module.exports = html;