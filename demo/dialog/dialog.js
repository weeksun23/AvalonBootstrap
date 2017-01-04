require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
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
