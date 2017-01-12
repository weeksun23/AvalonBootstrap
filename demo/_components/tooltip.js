var html = require("./tooltip.html");
avalon.define({
	$id : "demo_tooltip",
	$tooltip1 : {
		position : "bottom",content : "wefwefewf"
	},
	$tooltip2 : {
		content:"<span ms-tooltip='{content : \"hdggrrr\"}'>tooltip</span>",position:'bottom',
		type:'popover',title:'gergergerg',
		triggerOn : 'click'
	}
});
module.exports = html;