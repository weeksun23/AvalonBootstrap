require("./avalon.datetimepicker.css");
var tpl = require("./avalon.datetimepicker.html");
var now = new Date();
function padd0(val){
  return val < 10 ? ("0" + val) : val;
}
avalon.component("ms-datetimepicker",{
	template: tpl,
	defaults : {
		isShow : true,
		showDays : true,
    position : "bottom-right",
    year : now.getFullYear(),
    month : now.getMonth() + 1,
    hour : padd0(now.getHours()),
    minute : padd0(now.getMinutes()),
    second : padd0(now.getSeconds()),
    weekdaysName : ['日','一','二','三','四','五','六'],
    monthName : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    yearText : "年",
    yearScope : [],
    data : [],
    isMonthyearShow : false,
    $hideEventHandle : null,
    focusInput : function(e){
      var el = e.srcElement;
      el.select();
    },
    setMonth : function(month){
      this.month = month;
      this.isMonthyearShow = false;
      this.dealData();
    },
    setYear : function(year){
      this.year = year;
      this.isMonthyearShow = false;
      this.dealData();
    },
    setYearScope : function(d){
      var me = this;
      avalon.each(this.yearScope,function(i,v){
        v.value = v.value + d;
      });
    },
    toggleMonthyear : function(){
      if(this.$hideEventHandle){
        avalon.unbind(document.body,"click",this.$hideEventHandle);
        this.$hideEventHandle = null;
      }
    	this.isMonthyearShow = !this.isMonthyearShow;
      var me = this;
      if(this.isMonthyearShow){
        var years = [];
        for(var i=this.year - 2;i<=this.year + 3;i++){
          years.push({value : i});
        }
        this.yearScope = years;
        this.$hideEventHandle = avalon.bind(document.body,"click",function(e){
          if(AB.isSubNode(e.target,"datetimepicker-monthyear")) return;
          me.isMonthyearShow = false;
        });
      }
    },
    dealYear : function(d){
    	this.year += d;
    	this.dealData();
    },
    dealMonth : function(d){
    	if(d === 1 && this.month === 12){
    		this.month = 1;
    		this.year++
    	}else if(d === -1 && this.month === 1){
    		this.month = 12;
    		this.year--;
    	}else{
    		this.month += d;
    	}
    	this.dealData();
    },
    dealData : function(){
    	var date = new Date();
    	date.setFullYear(this.year);
    	//不减1 直接设置到下一个月
    	date.setMonth(this.month);
    	//当月的最后一天
    	date.setDate(0);
    	var days = date.getDate();
    	//最后一天星期几
    	var lastDay = date.getDay();
    	date.setDate(1);
    	// console.log(avalon.filters.date(date));
    	var data = [];
    	//第一天星期几
    	var firstDay = date.getDay();
    	if(firstDay === 0){
        //第一天是星期日 则上月最后7日组成一行
    		date.setDate(date.getDate() - 7);
    	}else{
    		date.setDate(date.getDate() - firstDay);
    	}
    	var j=0;
    	for(var i=1;i<=42;i++){
    		var target = data[j];
    		if(!target){
    			target = data[j] = [];
    		}
    		if(target.length < 7){
    			target.push({
    				value : date.getDate(),
    				month : date.getMonth() + 1
    			});
    			date.setDate(date.getDate() + 1);
    		}else{
    			j++;
    			i--;
    		}
    	}
    	this.data = data;
    },
    onReady : function(){
    	this.dealData();
    },
    setDateTime : function(date){
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    },
    keyup : function(e,type){
      var value = this[type] + '';
      value = value.replace(/([^\d]+$)|(^[^\d]+)/g,'');
      if(!/^\d+$/.test(value)){
        this[type] = '00';
      }else{
        value = parseInt(value);
        if(value < 10){
          value = '0' + value;
        }else{
          if(type === 'hour'){
            if(value > 23){
              value = 23;
            }
          }else{
            if(value > 59){
              value = 59;
            }
          }
          this[type] = value + '';
        }
      }
    }
	}
});
function dealTimeValue(vm,value,type){
  console.log(value);
  if(!/^\d+$/.test(value)){
    vm[type] = '00';
  }
}