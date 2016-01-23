define(["avalon.extend","text!./avalon.dialog.html"],function(avalon,template){
	if(avalon.support.transitionend){
		avalon.effect("dialog-effect",{
			beforeEnter : function(el){
				el.style.display = 'block';
				el.offsetWidth;
				avalon(el).addClass('in');
			},
			afterEnter : function(el){
				var vmodel = el._vmodel;
				if(vmodel){
					vmodel.onOpen.call(el,vmodel);
					if(!vmodel.hasInit){
						vmodel.hasInit = true;
					}
				}
			},
			beforeLeave : function(el){
				avalon(el).removeClass('in');
			}
		});
	}
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
		var dgs = modalBackDropVM.$curDialogs;
		dgs.pop();
		var len = dgs.length;
		if(len > 0){
			dgs[len - 1].style.zIndex = '';
		}else{
			avalon(document.body).removeClass("modal-open");
		}
	}
	var modalBackDropVM;
	avalon.component("ab:dialog",{
		$template: template,
		$replace : true,
		$container : document.body,
		$ready: function(vmodel, element){
			element._vmodel = vmodel;
			if(!modalBackDropVM){
				modalBackDropVM = avalon.define({
					$id : "modalBackDrop",
					$curDialogs : [],
					isOpen : false
				});
				var modalBackDrop = document.createElement("div");
				modalBackDrop.className = "modal-backdrop fade";
				modalBackDrop.setAttribute("ms-effect","dialog-effect");
				modalBackDrop.setAttribute("ms-visible","isOpen");
				document.body.appendChild(modalBackDrop);
				avalon.scan(modalBackDrop,modalBackDropVM);
			}
			vmodel.$clickBtn = function(el){
				if(el.close){
					vmodel.close();
				}else{
					el.handler && el.handler.call(this,vmodel);
				}
			};
			vmodel.close = function(e){
				if(e && e.target !== this){
					return;
				}
				var len = modalBackDropVM.$curDialogs.length;
				vmodel.isOpen = false;
				if(len === 1){
					modalBackDropVM.isOpen = false;
				}
				dealCloseDialog();
				vmodel.onClose.call(element,vmodel);
			};
			vmodel.open = function(isInit){
				avalon(document.body).addClass("modal-open");
				vmodel.isOpen = true;
				modalBackDropVM.isOpen = true;
				if(!avalon.support.transitionend){
					vmodel.onOpen.call(element,vmodel);
				}
				//处理重叠窗口
				var dgs = modalBackDropVM.$curDialogs;
				var len = dgs.length;
				if(len > 0){
					var last = dgs[len - 1];
					last.style.zIndex = 500;
				}
				dgs.push(element);
			};
			if(vmodel.show){
				vmodel.open(true);
			}
		},
		$construct : function(opts,vmOpts,elemOpts){
			initButtons(vmOpts.buttons);
			if(!vmOpts.content){
				vmOpts.content = this.innerHTML;
			}
			if(!vmOpts.title){
				vmOpts.title = this.title || '';
			}
			return avalon.mix(opts,vmOpts,elemOpts);
		},
		$skipArray : ['widgetElement','close','open','show','hasInit'],
		//属性
		hasInit : false,
		buttons : [],
		title : null,
		content : null,
		show : false,
		isOpen : false,
		paddingBottom : "",
		btnAlign : "",
		//方法
		$clickBtn : avalon.noop,
		close : avalon.noop,
		open : avalon.noop,
		//事件
		onOpen : avalon.noop,
		onClose : avalon.noop
	});
	/*
	avalon.showDialog.xxx : {
		vmodel : 生成的dialog的vmodel,
		options : dialog的配置对象options
	} 
	*/
	avalon.initDialog = function(id,options){
		var win = document.getElementById(id);
		if(win){
			win.parentNode.removeChild(win);
			win = null;
			var vmodel = avalon.showDialog[id].vmodel;
			if(vmodel){
				var $id = vmodel.$id;
				delete avalon.vmodels[$id];
				delete avalon.vmodels["temp" + $id];
			}
		}
		win = document.createElement("div");
		win.id = id;
		win.style.display = 'none';
		win.setAttribute("ms-skip",'');
		document.body.appendChild(win);
		avalon.showDialog[id] = {
			options : options
		};
	};
	avalon.showDialog = function(id,params){
		var target = avalon.showDialog[id];
		if(!target){
			avalon.error("请先配置avalon.showDialog." + id + "对象");
		}
		var win = document.getElementById(id);
		if(win.getAttribute("avalonctrl")){
			target.vmodel.$params = params;
			target.vmodel.open();
		}else{
			win.removeAttribute("ms-skip");
			var options = {
				$params : params,
				show : true
			};
			avalon.mix(options,target.options);
			var $id = 'dialog' + (+new Date);
			var vmodel = avalon.define({
				$id : "temp" + $id,
				$dialogOptions : options
			});
			win.setAttribute("ms-widget",['dialog',$id,'$dialogOptions'].join(","));
			avalon.scan(win,vmodel);
			target.vmodel = avalon.vmodels[$id];
		}
	};
});