var html = require("./table.html");
avalon.define({
	$id : "demo_table",
	$config : {
		is : "ms-table",
		title : "test",
		$singleSelect : true,
		columns : [
			{field : "a1",title : "a1",sort : true},
			{field : "a2",title : "a1"},
			{field : "a3",title : "a1"},
			{field : "a4",title : "a1"},
			{field : "a5",title : "a1"},
			{field : "a6",title : "a1"}
		],
		$frontPageData : [{
			a1 : "rgwrtwrwerewrewrwerewrwerewr"
		},{
			a1 : 33
		},{
			a1 : 35567
		},{
			a1 : 233577
		},{
			a1 : 123
		},{
			a1 : 33
		},{
			a1 : "wefgf324"
		},{
			a1 : 33
		},{
			a1 : 33345
		},{
			a1 : 234535
		},{
			a1 : 32343
		},{
			a1 : 3345
		},{
			a1 : 3643
		},{
			a1 : 3387
		},{
			a1 : 345345435
		},{
			a1 : 34533
		},{
			a1 : 3382
		},{
			a1 : 345345
		},{
			a1 : 33356
		},{
			a1 : 32133
		},{
			a1 : 3378
		},{
			a1 : 234234234
		},{
			a1 : 33
		},{
			a1 : 33
		}]
	}
});
module.exports = html;