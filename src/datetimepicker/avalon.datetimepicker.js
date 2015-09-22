define(["avalon","text!./avalon.datetimepicker.html","dialog/avalon.dialog"],function(avalon,tpl){
	function getScope(min,max){
		var re = [];
		for(var i=min;i<=max;i++){
			re.push(i);
		}
		return re;
	}
	var template = (function(){
		var arr = tpl.split("SPLIT");
		return {
			picker : arr[0],
			input : arr[1]
		};
	})();
	function setPickerTime(date){
		if(typeof date == 'string'){
			date = new Date(date.replace(/\-/g,"/"));
		}else if(typeof date == 'number'){
			date = new Date(date);
		}
		pickerVM.year = date.getFullYear();
		pickerVM.month = date.getMonth() + 1;
		pickerVM.day = date.getDate();
		pickerVM.hour = date.getHours();
		pickerVM.minute = date.getMinutes();
		pickerVM.second = date.getSeconds();
	}
	function paddingZero(str,len){
    	len = len || 2;
    	str = str + "";
    	var strLen = str.length;
    	if(strLen >= len) return str;
    	return new Array(len - strLen + 1).join('0') + str;
    }
	function getPickerTime(vmodel){
		var vmodels = avalon.vmodels;
		var format = vmodel.format;
		avalon.each({
			year : "yyyy",
			month : "MM",
			day : "dd",
			hour : "hh",
			minute : "mm",
			second : "ss"
		},function(k,v){
			var val = pickerVM[k];
			format = format.replace(v,paddingZero(val,v.length));
		});
		return format;
	}
	var pickerVM;
	var widget = avalon.ui.datetimepicker = function(element, data, vmodels){
		var options = data.datetimepickerOptions;
		var vmodel = avalon.define(data.datetimepickerId,function(vm){
			avalon.mix(vm,options);
			vm.$init = function(){
				avalon(element).addClass("input-group");
				element.innerHTML = template.input;
				avalon.scan(element,vmodel);
			};
			vm.show = function(){
				if(!pickerVM){
					var div = document.createElement("div");
					div.setAttribute("ms-widget","dialog,$datatimepickerdialog,$dialogOpts");
					document.body.appendChild(div);
					var m = avalon.define({
						$id : +new Date,
						$dialogOpts : {
							content : template.picker,
							$curVmodel : null,
							title : "选择时间",
							buttons : [{
								text : "取消",theme : "danger",iconCls : "glyphicon-remove",handler : function(){
									pickerVM.close();
								}
							},{
								text : "今天",theme : "success",iconCls : "glyphicon-calendar",handler : function(){
									setPickerTime(new Date());
								}
							},{
								text : "确定",theme : "primary",iconCls : "glyphicon-ok",handler : function(){
									pickerVM.$curVmodel.chooseTime();
									pickerVM.close();
								}
							}],
							yearData : getScope(widget.defaults.$curYear - 10,widget.defaults.$curYear + 10),
							monthData : getScope(1,12),
							dayData : getScope(1,31),
							minuteData : getScope(0,59),
							hourData : getScope(0,23),
							secondData : getScope(0,59),
							year : widget.defaults.$curYear,
							month : 1,
							day : 1,
							hour : 0,
							minute : 0,
							second : 0,
							format : widget.defaults.format,
							paddingBottom : "0px",
							btnAlign : "center"
						}
					});
					avalon.scan(div,m);
					pickerVM = avalon.vmodels.$datatimepickerdialog;
					template.picker = null;
				}
				pickerVM.buttons[1].visible = vmodel.showTodayBtn;
				pickerVM.format = vmodel.format;
				pickerVM.open();
				pickerVM.$curVmodel = vmodel;
				setPickerTime(vmodel.value || new Date());
			};
			vm.clear = function(){
				vmodel.value = '';
			};
			vm.chooseTime = function(){
				vmodel.value = getPickerTime(vmodel);
			};
		});
		return vmodel;
	};
	widget.defaults = {
		showClearBtn : true,
		showDateBtn : true,
		showTodayBtn : true,
		value : "",
		format : "yyyy-MM-dd hh:mm:ss",
		$curYear : new Date().getFullYear()
	};
});