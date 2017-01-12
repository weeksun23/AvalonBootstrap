var html = require("./dropdown.html");
function getData(){
	return [{
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
  }];
}
avalon.define({
	$id : "demo_dropdown",
	$config : {
	is : "ms-dropdown",
	data : getData()
	},
	$config1 : {
	is : "ms-dropdown",
	data : getData(),
	split : true,
	dropup : true
	},
	$config2 : {
	is : "ms-dropdown",
	data : getData(),
	split : true,
	dropup : true,
	size : 'lg',
	theme : "success",
	handler : function(){
		alert("clickbtn");
		}
	}
});
module.exports = html;