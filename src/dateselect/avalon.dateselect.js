define(["avalon.extend","text!./avalon.dateselect.html","css!./avalon.dateselect.css"],function(avalon,tpl){
	function getScope(min,max){
		var re = [];
		for(var i=min;i<=max;i++){
			re.push(i);
		}
		return re;
	}
	function paddingZero(str,len){
    	len = len || 2;
    	str = str + "";
    	var strLen = str.length;
    	if(strLen >= len) return str;
    	return new Array(len - strLen + 1).join('0') + str;
    }
    function setDate(date,vmodel){
		if(typeof date == 'string'){
			date = new Date(date.replace(/\-/g,"/"));
		}else if(typeof date == 'number'){
			date = new Date(date);
		}
		vmodel.year = date.getFullYear();
		vmodel.month = date.getMonth() + 1;
		vmodel.day = date.getDate();
	}
	function getDate(vmodel){
		var format = vmodel.format;
		avalon.each({
			year : "yyyy",
			month : "MM",
			day : "dd"
		},function(k,v){
			var val = vmodel[k];
			format = format.replace(v,paddingZero(val,v.length));
		});
		return format;
	}
	function getDaysInMonth(year,month){
	    month = parseInt(month,10);
	    var temp = new Date(parseInt(year,10),month,0);
	    return temp.getDate();
	}
	var widget = avalon.ui.dateselect = function(element,data,vmodels){
		var options = data.dateselectOptions;
		options.monthData = getScope(1,12);
		options.dayData = getScope(1,31);
		options.year = new Date().getFullYear();
		options.month = 1;
		options.day = 1;
		var vmodel = avalon.define(data.dateselectId,function(vm){
			avalon.mix(vm,options);
			vm.$init = function(){
				avalon(element).addClass("form-group");
				element.innerHTML = tpl;
				avalon.scan(element,vmodel);
				setDate(new Date(),vmodel);
			};
			vm.upYear = function(){
				vmodel.year++;
			};
			vm.downYear = function(){
				vmodel.year--;
			};
			vm.getDate = function(){
				return getDate(vmodel);
			};
		});
		vmodel.$watch("month",function(newVal){
			var newDaysLen = getDaysInMonth(vmodel.year,newVal);
			var dayData = vmodel.dayData;
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
			if(vmodel.day > dayData.length){
				vmodel.day = dayData.length;
			}
		});
		return vmodel;
	};
	widget.getDaysInMonth = getDaysInMonth;
	widget.paddingZero = paddingZero;
	widget.defaults = {
		format : "yyyy-MM-dd"
	};
});