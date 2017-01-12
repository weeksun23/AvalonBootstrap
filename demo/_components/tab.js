var html = require("./tab.html");
avalon.define({
	$id : "demo_tab",
	$htmlTab : {
    is : "ms-tab"
	},
	$jsTab : {
    is : "ms-tab",
    headerData : [{title : "a1",iconCls : "ok"},{title : "a2",closeable : true}],
    contentData : [{html : "<h1>gwgewerer</h1>"},{html : "<h1>gwweewgewerer</h1>"}]
	}
});
module.exports = html;