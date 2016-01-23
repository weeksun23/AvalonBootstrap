define(["avalon.extend","text!./avalon.datetimepicker.html","../dialog/avalon.dialog"],function(avalon,tpl){
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
	function getDaysInMonth(year,month){
	    month = parseInt(month,10);
	    var temp = new Date(parseInt(year,10),month,0);
	    return temp.getDate();
	}
	function dealDays(year,month){
		var newDaysLen = getDaysInMonth(year,month);
		var dayData = pickerVM.dayData;
		var curDaysLen = dayData.length;
		var d = Math.abs(newDaysLen - curDaysLen);
		if(d === 0) return;
		if(newDaysLen > curDaysLen){
			var arr = [];
			var last = dayData[curDaysLen - 1];
			for(var i=0;i<d;i++){
				arr.push(++last);
			}
			dayData.pushArray(arr);
		}else if(newDaysLen < curDaysLen){
			dayData.splice(curDaysLen - d,d);
		}
		if(pickerVM.day > dayData.length){
			pickerVM.day = dayData.length;
		}
	}
	var pickerVM;
	avalon.component("ab:datetimepicker",{
		$template: template.input,
		$replace : true,
		$ready : function(vmodel,element){
			if(!pickerVM){
				var component = document.createElement("div");
				component.innerHTML = "<ab:dialog config='$dialogOpts' identifier='$datetimepickerdialog'></ab:dialog>";
				document.body.appendChild(component);
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
						monthData : getScope(1,12),
						dayData : getScope(1,31),
						minuteData : getScope(0,59),
						hourData : getScope(0,23),
						secondData : getScope(0,59),
						year : '',
						month : 1,
						day : 1,
						hour : 0,
						minute : 0,
						second : 0,
						format : "yyyy-MM-dd hh:mm:ss",
						paddingBottom : "0px",
						btnAlign : "center",
						dealUpDown : function(type,d){
							var val = +pickerVM[type];
							if(type === 'month'){
								var min = 1;
								var max = 12;
							}else if(type === 'day'){
								min = 1;
								max = 31;
							}else if(type === 'hour'){
								min = 0;
								max = 23;
							}else if(type === 'minute' || type === 'hour'){
								min = 0;
								max - 59;
							}
							if(d < 0){
								if(min !== undefined && val <= min){
									pickerVM[type] = min;
									return;
								}
							}else{
								if(max !== undefined && val >= max){
									pickerVM[type] = max;
									return;
								}
							}
							pickerVM[type] = val + d;
						}
					}
				});
				avalon.scan(component,m);
				pickerVM = {};
				component.parentNode.removeChild(component);
				setTimeout(function(){
					pickerVM = avalon.vmodels.$datetimepickerdialog;
					pickerVM.$watch("year",function(newVal){
						dealDays(newVal,pickerVM.month);
					});
					pickerVM.$watch("month",function(newVal){
						dealDays(pickerVM.year,newVal);
					});
					template.picker = null;
				});
			}
			vmodel.show = function(){
				pickerVM.buttons[1].visible = vmodel.showTodayBtn;
				pickerVM.format = vmodel.format;
				pickerVM.open();
				pickerVM.$curVmodel = vmodel;
				setPickerTime(vmodel.value || new Date());
			};
			vmodel.clear = function(){
				vmodel.value = '';
			};
			vmodel.chooseTime = function(){
				vmodel.value = getPickerTime(vmodel);
			};
		},
		$skipArray : [],
		//属性
		showClearBtn : true,
		showDateBtn : true,
		showTodayBtn : true,
		value : "",
		format : "yyyy-MM-dd hh:mm:ss",
		curYear : new Date().getFullYear(),
		//方法
		show : avalon.noop,
		clear : avalon.noop,
		chooseTime : avalon.noop
		//事件
	});
});