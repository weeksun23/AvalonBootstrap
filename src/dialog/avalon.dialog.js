var tpl = require("./avalon.dialog.html");
function initButtons(buttons){
	avalon.each(buttons,function(i,el){
		var obj = {
			close : false,
			theme : 'default',
			handler : avalon.noop,
			text : "",
			iconCls : ''
		};
		for(var i in obj){
			if(el[i] === undefined){
				el[i] = obj[i];
			}
		}
	});
}
AB.preHandlers["ms-dialog"] = function(vm){
	initButtons(vm.buttons);
};
// var modalBackDrop;
avalon.component("ms-dialog",{
	template: tpl,
	soleSlot: 'content',
	defaults : {
		//窗口正在关闭中标志，以防重复关闭
		$isClosing : false,
		//属性
		buttons : [],
		title : null,
		content : '',
		isOpen : false,
		isIn : false,
		zIndex : 1050,
		paddingBottom : "",
		btnAlign : "",
		//事件
		onBeforeOpen : avalon.noop,
		onOpen : avalon.noop,
		onBeforeClose : avalon.noop,
		onClose : avalon.noop,
		clickBtn : function(el){
			if(el.close){
				this.close();
			}else{
				el.handler && el.handler.call(this,this);
			}
		},
		close : function(e){
			if(this.onBeforeClose() === false || this.$isClosing) return;
			if(e && !avalon(e.target).hasClass("modal")){
				return;
			}
			this.isIn = false;
			if(AB.support.transitionend){
				this.$isClosing = true;
			}else{
				this.isOpen = false;
			}
			var modalBackDrop = avalon.vmodels.modalBackDrop;
			var dgs = modalBackDrop.$curDialogs;
			dgs.pop();
			var len = dgs.length;
			if(len > 0){
				dgs[len - 1].zIndex = 1050;
			}else{
				avalon(document.body).removeClass("modal-open");
				modalBackDrop.isIn = false;
				// avalon(modalBackDrop).removeClass("in");
				if(!AB.support.transitionend){
					modalBackDrop.visible = false;
					// modalBackDrop.style.display = 'none';
				}
			}
			this.onClose();
		},
		open : function(isInit){
			if(this.onBeforeOpen() === false) return;
			avalon(document.body).addClass("modal-open");
			this.isOpen = true;
			var modalBackDrop = avalon.vmodels.modalBackDrop;
			modalBackDrop.visible = true;
			// modalBackDrop.style.display = 'block';
			var vm = this;
			setTimeout(function(){
				vm.isIn = true;
				modalBackDrop.isIn = true;
				// avalon(modalBackDrop).addClass("in");
				if(!AB.support.transitionend){
					vm.onOpen();
				}
				//处理重叠窗口
				var dgs = modalBackDrop.$curDialogs;
				var len = dgs.length;
				if(len > 0){
					var last = dgs[len - 1];
					last.zIndex = 1000;
				}
				dgs.push(vm);
			},100);
		},
		transitionend : function(e){
			//窗口打开或结束后事件
			if(this.isIn){
				this.onOpen();
			}else{
				this.isOpen = false;
				this.$isClosing = false;
			}
		}
	}
});
avalon(document.body).appendHTML("<div :controller='modalBackDrop' class='modal-backdrop fade' "+
	":class='{in : @isIn}' :on-transitionend='@transitionend' :click='@click' :visible='@visible'></div>");
avalon.define({
	$id : "modalBackDrop",
	isIn : false,
	visible : false,
	transitionend : function(){
		if(!this.isIn){
			this.visible = false;
		}
	},
	click : function(){
		this.$curDialogs[this.$curDialogs.length - 1].close();
	},
	$curDialogs : []
});