define(["avalon","text!./avalon.form.html","css!./avalon.form"],function(avalon,templete){
	var tpls = templete.split("MS_SPLIT");
	function replace(tpl,obj){
		if(!obj) return tpl;
		for(var i in obj){
			var reg = new RegExp("\\$\\{" + i + "\\}","g");
			var val = obj[i];
			if(val === undefined || val === null){
				val = "";
			}
			tpl = tpl.replace(reg,val);
		}
		return tpl;
	}
	function getSelectOptions(data){
		var html = [];
		var tpl = "<option value='${value}'>${text}</option>"
		for(var i=0,item;item=data[i++];){
			html.push(replace(tpl,item));
		}
		return html.join("");
	}
	function getAttrStr(attr,val){
		return val ? (attr + "='"+val+"'") : "";
	}
	function getItemHtml(tpl,obj,colsnum){
		var type = obj.type || 'text';
		var valid = obj.valid;
		if(valid){
			if (colsnum === 1) {
				valid.sm = 10;
				valid.offset = 2;
			}else if(colsnum === 2){
				valid.sm = 8;
				valid.offset = 4;
			}
			var validStr = replace(tpls[4],valid);
			var validCls = "ms-class='has-error:${cls}'".replace("${cls}",valid.condition);
		}
		if(type === "text"){
			var content = replace(tpls[2],{
				id : getAttrStr("id",obj.id),
				number : obj.number ? "-number" : "",
				readonly : obj.readonly ? "readonly" : "",
				field : obj.field
			});
		}else if(type === "select"){
			var selectOptions = obj.selectOptions;
			content = replace(tpls[3],{
				id : getAttrStr("id",obj.id),
				number : obj.number ? "-number" : "",
				field : obj.field,
				options : typeof selectOptions == 'string' ? selectOptions : getSelectOptions(selectOptions)
			});
		}else if(type === 'date'){
			content = replace(tpls[5],{
				id : getAttrStr("id",obj.id),
				field : obj.field,
				datePickerId : getAttrStr("id",obj.datePickerId)
			});
		}else if(type === "dom"){
			content = replace(document.getElementById(obj.domId).innerHTML,obj.domOptions || {});
		}else if(type === 'spinner'){
			content = replace(tpls[7],{
				id : getAttrStr("id",obj.id),
				field : obj.field,
				readonly : obj.readonly ? "readonly" : "",
				min : obj.min === undefined ? "null" : obj.min,
				max : obj.max === undefined ? "null" : obj.max
			});
		}
		return replace(tpl,{
			content : content,
			text : obj.text,
			forTxt : getAttrStr("for",obj.id),
			valid : validStr,
			validCls : validCls
		});
	}
	var widget = avalon.ui.form = function(element, data, vmodels){
		var options = data.formOptions;
		var html = ["<fieldset>"];
		avalon.each(options.data,function(i,item){
			html.push("<div class='form-group'>");
			var len = item.length;
			if(len === 1){
				html.push(getItemHtml(tpls[0],item[0],len));
			}else if(len === 2){
				html.push(getItemHtml(tpls[1],item[0],len));
				html.push(getItemHtml(tpls[1],item[1],len));
			}
			html.push("</div>");
		});
		html.push(tpls[6]);
		html.push("</fieldset>");
		element.innerHTML = html.join("");
		var vmodel = avalon.define(data.formId,function(vm){
			avalon.mix(vm,options);
			vm.$skipArray = ['data'];
			vm.$init = function(){
				avalon(element).addClass("form-horizontal mform");
				avalon.scan(element, vmodel);
				vmodel.onInit.call(element, vmodel, vmodels);
			};
			vm.$remove = function(){
				element.innerHTML = element.textContent = "";
			};
			vm.clickBtn = function(el){
				el.handler.call(vmodel);
			};
			vm.formSpinner = function(d,field,min,max){
				var target = vmodel.model[field];
				if(d > 0 && max !== null){
					if(target === max) return;
					if(target + d > max){
						return vmodel.model[field] = max;
					}
				}else if(d < 0 && min !== null){
					if(target === min) return;
					if(target + d < min){
						return vmodel.model[field] = min;
					}
				}
				vmodel.model[field] = target + d;
			};
		});
		return vmodel;
	};
	widget.version = 1.0;
	widget.defaults = {
		buttons : [],
		onInit : avalon.noop,
		/*
		[[{
			field : 字段名，对应model中的键值,
			text : label文字,
			type : 类型，目前支持 text select date dom spinner,
			domId : dom类型的模板dom id,
			number : 是否数字,
			selectOptions : 用于select生成option的数据,
			datePickerId : date datePickerId,
			min : spinner min,
			max : spinner max,
			readonly : text spinner,
			id : dom id用于label for属性,
			valid : {
				condition : 验证条件,
				messageField : 字段名，对应vmodel中的键值,
			}
		}],[{},{}]]
		*/
		data : [],
		model : {}
	};
});