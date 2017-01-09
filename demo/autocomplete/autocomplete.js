require("../../css/bootstrap/bootstrap.css");
require("../../css/demo.css");
require("../../src/avalonbootstrap");
avalon.define({
	$id : "page",
  $config : {
    $id : "autocomplete",
    is : "ms-autocomplete",
    placeholder : "请输入搜索关键字",
    $inputValueKey : '',
    $source : [3434,2323,5444,3434,232323]
    // $source : function(value,cb){
    //   cb([3434,2323,5444,3434,232323]);
    // }
    /*source : function(value,cb){
      avalon.ajaxGet("data.json",{},function(data){
        cb(data);
      },null);
    }*/
  },
  $config1 : {
    $id : "autocomplete1",
    is : "ms-autocomplete",
    placeholder : "请输入搜索关键字",
    $inputValueKey : '',
    $source : [3434,2323,5444,3434,232323]
  }
});
