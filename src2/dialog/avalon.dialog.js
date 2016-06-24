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
	function dealCloseDialog(){
		var dgs = modalBackDrop.$curDialogs;
		dgs.pop();
		var len = dgs.length;
		if(len > 0){
			dgs[len - 1].zIndex = '1000';
		}else{
			avalon(document.body).removeClass("modal-open");
		}
	}
	avalon.me.defines.dialog = function(vm,defaults,htmlOpts,jsOpts){
		initButtons(jsOpts.buttons);
	};
	var modalBackDrop;
	avalon.component("ab-dialog",{
		template: tpl,
		// getTemplate : function(){
		// 	avalon.log(this,arguments);
		// },
		defaults : {
			$skipArray : ['show','hasInit'],
			//属性
			hasInit : false,
			buttons : [],
			title : null,
			content : null,
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
				if(this.onBeforeClose() === false) return;
				if(e && e.target !== this){
					return;
				}
				var len = modalBackDrop.$curDialogs.length;
				this.isIn = false;
				if(len === 1){
					avalon(modalBackDrop).removeClass("in");
				}
				dealCloseDialog();
				this.onClose();
			},
			open : function(isInit){
				if(this.onBeforeOpen() === false) return;
				avalon(document.body).addClass("modal-open");
				this.isOpen = true;
				var vm = this;
				setTimeout(function(){
					vm.isIn = true;
					modalBackDrop.style.display = 'block';
					modalBackDrop.offsetWidth;
					avalon(modalBackDrop).addClass("in");
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
				});
			},
			onReady : function(obj){
				var name = avalon.me.support.transitionend;
				var vm = this;
				if(name){
					obj.target.addEventListener(name,function(e){
						if(!avalon(e.target).hasClass("modal-dialog")){
							return;
						}
						//窗口打开或结束后事件
						if(vm.isIn){
							vm.onOpen();
						}else{
							vm.isOpen = false;
						}
					});
				}
				if(!modalBackDrop){
					modalBackDrop = document.createElement("div");
					modalBackDrop.$curDialogs = [];
					modalBackDrop.className = "modal-backdrop fade";
					document.body.appendChild(modalBackDrop);
					if(name){
						modalBackDrop.addEventListener(name,function(e){
							if(!avalon(this).hasClass("in")){
								this.style.display = 'none';
							}
						});
					}
				}
				if(this.show){
					this.open(true);
				}
			}
		}
	});
});