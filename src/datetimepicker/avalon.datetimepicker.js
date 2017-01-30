require("./avalon.datetimepicker.css");
var tpl = require("./avalon.datetimepicker.html");
var now = new Date();
function padd0(val){
  return val < 10 ? ("0" + val) : val;
}
avalon.component("ms-datetimepicker",{
	template: tpl,
	defaults : {
		isShow : false,
    year : now.getFullYear(),
    month : now.getMonth() + 1,
    day : now.getDate(),
    hour : padd0(now.getHours()),
    minute : padd0(now.getMinutes()),
    second : padd0(now.getSeconds()),
    yearScope : [],
    data : [],
    isMonthyearShow : false,
    $hideEventHandle : null,
    $date : now,
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
      var date =  new Date();
      date.setFullYear(this.year);
      date.setDate(1);
      date.setMonth(this.month - 1);
      //二维数组
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
          var value = date.getDate();
          var month = date.getMonth() + 1;
          target.push({
            value : value,
            month : month,
            selected : !!(this.$date && value === this.$date.getDate() && month === this.$date.getMonth() + 1 
             && date.getFullYear() === this.$date.getFullYear())
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
    },
    chooseDay : function(day){
      if(day.month !== this.month) return;
      for(var i=0,ii;ii=this.data[i++];){
        var isBreak = false;
        for(var j=0,jj;jj=ii[j++];){
          if(jj.selected){
            jj.selected = false;
            isBreak = true;
            break;
          }
        }
        if(isBreak){
          break;
        }
      }
      day.selected = true;
      this.day = day.value;
      var date = this.$date;
      if(date){
        date.setFullYear(this.year);
        date.setMonth(this.month - 1);
        date.setDate(day.value);
        date.setHours(this.hour);
        date.setMinutes(this.minute);
        date.setSeconds(this.second);
      }else{
        date = this.$date = this.getDate();
      }
      var value = this.getValue();
      if(this.$targetKey && this.$target){
        this.$target[this.$targetKey] = value;
      }
      this.onChoose(value,date);
      this.isShow = false;
    },
    $target : null,
    $targetKey : null,
    $hideEventHandle : null,
    //属性
    weekdaysName : ['日','一','二','三','四','五','六'],
    monthName : ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    yearText : "年",
    bottom : "auto",
    left : 0,
    top : '100%',
    position : "bottom-right",
    format : "yyyy-MM-dd hh:mm:ss",
    //方法
    clear : function(){
      this.$date = null;
      if(this.$target && this.$targetKey){
        this.$target[this.$targetKey] = '';
      }
      this.dealData();
      this.isShow = false;
    },
    setToday : function(){
      this.setValue(this.$date = new Date());
    },
    open : function(target,targetKey){
      this.$target = target;
      this.$targetKey = targetKey;
      if(this.$hideEventHandle){
        avalon.unbind(document.body,"click",this.$hideEventHandle);
        this.$hideEventHandle = null;
      }
      if(this.isShow){
        this.isShow = false;
        return;
      }
      var me = this;
      this.$hideEventHandle = avalon.bind(document.body,"click",function(e){
        if(AB.isSubNode(e.target,"datetimepicker")) return;
        me.isShow = false;
      });
      me.isShow = true;
    },
    setValue : function(date){
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
      this.hour = padd0(date.getHours());
      this.minute = padd0(date.getMinutes());
      this.second = padd0(date.getSeconds());
      this.dealData();
    },
    getDate : function(){
      return new Date(this.year + "/" + this.month + "/" + this.day + " " + this.hour + ":" + 
        this.minute + ":" + this.second);
    },
    getValue : function(){
      var date = this.getDate();
      return avalon.filters.date(date,this.format);
    },
    //事件
    onChoose : avalon.noop
	}
});