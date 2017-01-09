require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
avalon.define({
  $id : "page",
  open : function(){
    avalon.vmodels.testDialog.open();
  },
  $config : {
    $id : "dropdown1",
    is : "ms-dropdown",
    data : [{
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
    }]
  }
});
