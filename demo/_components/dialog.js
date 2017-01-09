var html = require("./dialog.html");
avalon.define({
	$id : "demo_dialog",
	$htmlconfig : {
		$id : "htmlDialog",
    is : "ms-dialog",
    title : "test"
	},
	showHtmlDialog : function(){
		avalon.vmodels.htmlDialog.open();
	}
});
module.exports = html;