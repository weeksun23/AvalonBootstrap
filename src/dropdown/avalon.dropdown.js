var tpl = require("./avalon.dropdown.html");
var hideEventHandle;
AB.preHandlers["ms-dropdown"] = function(vm){
	var obj = {
		//数据项默认配置
		divider : false,
		handler : avalon.noop,
		$clickedHide : true,
		text : ''
	};
	var data = vm.data;
	avalon.each(data,function(i,v){
		for(var j in obj){
			if(v[j] === undefined){
				v[j] = obj[j];
			}
		}
	});
};
avalon.component("ms-dropdown",{
	template: tpl,
	defaults : {
		isOpen : false,
		theme : "default",
		size : "",
		data : [],
		text : "testtest",
		clickItem : function(el){
			el.handler();
			if(el.$clickedHide){
				this.close();
			}
		},
		close : function(){
			this.isOpen = false;
			if(hideEventHandle){
				avalon.unbind(document.body,"click",hideEventHandle);
				hideEventHandle = null;
			}
		},
		clickBtn : function(){
			if(hideEventHandle){
				avalon.unbind(document.body,"click",hideEventHandle);
			}
			this.isOpen = !this.isOpen;
			if(this.isOpen){
				var me = this;
				hideEventHandle = avalon.bind(document.body,"click",function(e){
					if(e.target === me.$element) return false;
					if(AB.isSubNode(e.target,"dropdown-menu")) return;
					me.close();
				});
			}
		}
	}
});