require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
avalon.define({
	$id : "body",
  $config1 : {
    $id : "accordion1",
    is : "ms-accordion"
  },
  $config : {
    $id : "accordion",
    is : "ms-accordion",
    data : [{
      title : "werwer",
      children : [{
        title : "dgfwerwer"
      },{
        title : "dgfwerwer",
        iconCls : "glyphicon-text-height"
      }]
    },{
      title : "werwer",
      children : [{
        title : "dgfwerwer",iconCls : "glyphicon-text-height"
      },{
        title : "greer434"
      },{
        title : "e32e23"
      },{
        title : "gwergr3"
      },{
        title : "21e2e2e"
      }]
    },{
      title : "content",
      content : "<h1>testtest</h1>"
    }]
  }
});
