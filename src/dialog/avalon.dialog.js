define(["avalon","text!./avalon.dialog.html"],function(avalon,templete){
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
		var dgs = modalBackDrop.curDialogs;
		dgs.pop();
		var len = dgs.length;
		if(len > 0){
			dgs[len - 1].style.zIndex = '';
		}else{
			avalon(document.body).removeClass("modal-open");
		}
	}
	var modalBackDrop;
	var widget = avalon.ui.dialog = function(element, data, vmodels){
		if(!modalBackDrop){
			modalBackDrop = document.createElement("div");
			modalBackDrop.className = "modal-backdrop fade hide";
			document.body.appendChild(modalBackDrop);
			if(avalon.support.transitionend){
				modalBackDrop.addEventListener(avalon.support.transitionend,function(e){
					e.stopPropagation();
					if(e.target !== this) return;
					if(!avalon(this).hasClass("in")){
						avalon(this).addClass("hide");
					}
				});
			}
			modalBackDrop.curDialogs = [];
		}
		var options = data.dialogOptions;
		initButtons(options.buttons);
		if(!options.content){
			options.content = element.innerHTML;
		}
		if(!options.title){
			options.title = element.title || '';
		}
		var vmodel = avalon.define(data.dialogId,function(vm){
			avalon.mix(vm,options);
			vm.widgetElement = element;
			vm.$skipArray = ['widgetElement','close','open','show'];
			vm.$init = function(){
				avalon(element).addClass("modal fade");
				element.innerHTML = templete;
				avalon.scan(element, vmodel);
				if(avalon.support.transitionend){
					var isInit = true;
					element.addEventListener(avalon.support.transitionend,function(e){
						e.stopPropagation();
						if(e.target !== this) return;
						if(!avalon(this).hasClass("in")){
							this.style.display = 'none';
							dealCloseDialog();
						}else{
							vmodel.afterShow.call(element,vmodel,isInit);
							isInit = false;
						}
					});
				}
				avalon.bind(element,"click",function(e){
					if(e.target === this){
						vmodel.close();
					}
				});
				if(vmodel.show){
					vmodel.open(true);
				}
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
			vm.$clickBtn = function(el){
				if(el.close){
					vmodel.close();
				}else{
					el.handler && el.handler.call(this,vmodel);
				}
			};
			vm.close = function(){
				var len = modalBackDrop.curDialogs.length;
				if(avalon.support.transitionend){
					avalon(element).removeClass("in");
					len === 1 && avalon(modalBackDrop).removeClass('in');
				}else{
					element.style.display = 'none';
					len === 1 && avalon(modalBackDrop).addClass('in');
					dealCloseDialog();
				}
				vmodel.onClose.call(element,vmodel);
			};
			vm.open = function(isInit){
				element.style.display = 'block';
				var $modalBack = avalon(modalBackDrop).removeClass("hide");
				avalon(document.body).addClass("modal-open");
				if(avalon.support.transitionend){
					//强制reflow
					element.offsetWidth;
					modalBackDrop.offsetWidth;
					setTimeout(function(){
						avalon(element).addClass('in');
						$modalBack.addClass('in');
					});
				}else{
					vmodel.afterShow.call(element,vmodel,isInit);
					$modalBack.addClass('in');
				}
				//处理重叠窗口
				var dgs = modalBackDrop.curDialogs;
				var len = dgs.length;
				if(len > 0){
					var last = dgs[len - 1];
					last.style.zIndex = 500;
				}
				dgs.push(element);
			};
		});
		return vmodel;
	};
	widget.version = 1.0;
	widget.defaults = {
		buttons : [],
		title : null,
		content : null,
		show : false,
		afterShow : avalon.noop,
		onClose : avalon.noop,
		paddingBottom : "",
		btnAlign : ""
	};
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