define(function(require){
	require("../avalon.extend");
  var tpl = require("./avalon.dialog.html");
	function initButtons(buttons){
		avalon.each(buttons,function(i,el){
			var obj = {
				close : false,
				theme : 'default',
				handler : null,
				text : "",
				iconCls : null
			};
			for(var i in obj){
				if(el[i] === undefined){
					el[i] = obj[i];
				}
			}
		});
	}
	avalon.me.defines.dialog = function(vm,defaults,htmlOpts,jsOpts){
		initButtons(jsOpts.buttons);
	};
	// var modalBackDrop;
	avalon.component("ab-dialog",{
		template: tpl,
		soleSlot: 'content',
		defaults : {
			$skipArray : ['show','hasInit'],
			//窗口正在关闭中标志，以防重复关闭
			$isClosing : false,
			//属性
			hasInit : false,
			buttons : [],
			title : null,
			content : '',
			show : false,
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
				if(avalon.me.support.transitionend){
					this.$isClosing = true;
				}else{
					this.isOpen = false;
				}
				var modalBackDrop = avalon.me.getBodyElVm("modalBackDrop");
				var dgs = modalBackDrop.$curDialogs;
				dgs.pop();
				var len = dgs.length;
				if(len > 0){
					dgs[len - 1].zIndex = 1050;
				}else{
					avalon(document.body).removeClass("modal-open");
					modalBackDrop.isIn = false;
					// avalon(modalBackDrop).removeClass("in");
					if(!avalon.me.support.transitionend){
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
				var modalBackDrop = avalon.me.getBodyElVm("modalBackDrop");
				modalBackDrop.visible = true;
				// modalBackDrop.style.display = 'block';
				var vm = this;
				setTimeout(function(){
					vm.isIn = true;
					modalBackDrop.isIn = true;
					// avalon(modalBackDrop).addClass("in");
					if(!avalon.me.support.transitionend){
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
			onReady : function(e){
				var name = avalon.me.support.transitionend;
				var vm = this;
				if(name){
					e.target.addEventListener(name,function(e){
						if(!avalon(e.target).hasClass("modal-dialog")){
							return;
						}
						//窗口打开或结束后事件
						if(vm.isIn){
							vm.onOpen();
						}else{
							vm.isOpen = false;
							vm.$isClosing = false;
						}
					});
				}
				var modalBackDrop = avalon.me.getBodyElVm("modalBackDrop");
				// var elements = avalon.vmodels.avalonbootstrap.elements;
				// var modalBackDrop = elements.modalBackDrop;
				if(!modalBackDrop){
					avalon.me.addBodyEl("modalBackDrop",{
						cls : {
							"modal-backdrop" : 1,
							fade : 1,
							"in" : "@isIn"
						},
						isIn : false,
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
					// elements.modalBackDrop = {
					// 	cls : "modal-backdrop fade",
					// 	visible : false
					// };
					// modalBackDrop = document.createElement("div");
					// modalBackDrop.$curDialogs = [];
					// modalBackDrop.className = "modal-backdrop fade";
					// modalBackDrop.style.display = 'none';
					// document.body.appendChild(modalBackDrop);
					// avalon(modalBackDrop).bind("transitionend",function(e){
					// 	if(!avalon(this).hasClass("in")){
					// 		this.style.display = 'none';
					// 	}
					// });
				}
				if(this.show){
					this.open(true);
				}
			}
		}
	});
});