import { Component, OnInit } from '@angular/core';
import {OrderManageService} from "../order-manage/order-manage.service";
import {IncomeManageService} from "./income-manage.service";

@Component({
  selector: 'app-income-manage',
  templateUrl: './income-manage.component.html',
  styleUrls: ['./income-manage.component.css']
})
export class IncomeManageComponent implements OnInit {

  constructor(
    private orderManageService:OrderManageService,
    private incomeManageService: IncomeManageService
  ) {
  }

  ngOnInit() {
    // this.getOrderList();
    this.getAllOrders();
    this.incomeManageService.getCommissionRate().subscribe(resp=>{
      if(resp.body.status==200){
        this.rate = resp.body.data.commissionRate;
      }
    })
  }

  rate:number = 0;
  allOrders:any;
  allMerchandise = [];
  allUnAndDoneMerchandise = [];
  allDoneMerchandise = [];
  allOrderId:number[] = [];
  merchandiseByDate = [];
  merchandiseByWeek = [];
  merchandiseByMonth = [];
  merchandiseByYear = [];
  todayYear: number = new Date().getFullYear();
  todayMonth: number = new Date().getMonth();
  todayDate: number = new Date().getDate();
  today = new Date(this.todayYear,this.todayMonth,this.todayDate);

  getAllOrders(){
    this.orderManageService.getOrderList().subscribe(resp=>{
      // console.log(resp.body);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.allOrders = resp.body.data;
        for(let item of this.allOrders){
          this.allOrderId.push(item['id']);
        }
        this.incomeManageService.getIncome(this.allOrderId).subscribe(resp=>{
          if(resp.body.success == true){
            // console.log(resp.body.data);
            for(let i of this.allOrderId){
              let year = parseInt(resp.body.data[i].gmtCreate.substring(0,4));
              let month = parseInt(resp.body.data[i].gmtCreate.substring(5,7));
              let date = parseInt(resp.body.data[i].gmtCreate.substring(8,10));
              let time = new Date(year,month-1,date);
              for(let merch of resp.body.data[i].merchandises){
                if(resp.body.data[i].paid&&resp.body.data[i].delivered){
                  this.allDoneMerchandise.push({id:resp.body.data[i].id,
                                                paid:resp.body.data[i].paid,
                                                delivered:resp.body.data[i].delivered,
                                                amount:merch.amount,
                                                unitPrice:merch.unitPrice,
                                                totalPrice:Math.floor(merch.unitPrice*merch.amount*(1+this.rate)),
                                                year:year,
                                                month:month,
                                                date:date,
                                                time:time})
                }
                this.allUnAndDoneMerchandise.push({id:resp.body.data[i].id,
                                          paid:resp.body.data[i].paid,
                                          delivered:resp.body.data[i].delivered,
                                          amount:merch.amount,
                                          unitPrice:merch.unitPrice,
                                          totalPrice:Math.floor(merch.unitPrice*merch.amount*(1+this.rate)),
                                          year:year,
                                          month:month,
                                          date:date,
                                          time:time});
              }
            }
            this.allUnAndDoneMerchandise.sort(this.sortByTime);
            this.allDoneMerchandise.sort(this.sortByTime);
            // console.log(this.allMerchandise);
            // console.log(this.allDoneMerchandise);
            this.allMerchandise = this.allUnAndDoneMerchandise;
            this.getIncomeEveryDay();
            this.getIncomeEveryWeek();
            this.getIncomeEveryMonth();
            this.getIncomeEveryYear();

          }
          else{
            console.log(resp.body.message);
          }
        })
      }
      else{
        console.log(resp.body.message);
      }
    })
  }

  sortByTime(x,y){
    let year = x.year-y.year;
    if(year) return year;
    else{
      let month = x.month-y.month;
      if(month) return month;
    }
    return x.date-y.date;
  }
  sortByTimeDesc(x,y){
    let year = y.year-x.year;
    if(year) return year;
    else{
      let month = y.month-x.month;
      if(month) return month;
    }
    return y.date-x.date;
  }

  ddata: any;
  dlabels:string[] = [];
  dincome:number[] = [];
  showDay:boolean = true;

  getIncomeEveryDay(){
    this.merchandiseByDate = [];
    this.dlabels = [];
    this.dincome = [];
    let tempy = this.allMerchandise[0].year;
    let tempm = this.allMerchandise[0].month;
    let tempd = this.allMerchandise[0].date;
    let temptime = this.allMerchandise[0].time;
    let incomePerday = 0;
    for(let item of this.allMerchandise){
      if(item.year==tempy && item.month==tempm && item.date==tempd){
        incomePerday += item.totalPrice;
      }
      else{
        this.merchandiseByDate.push({year:tempy,month:tempm,date:tempd,dayIncome:incomePerday,time:temptime});
        tempy = item.year;
        tempm = item.month;
        tempd = item.date;
        temptime = item.time;
        incomePerday = item.totalPrice;
      }
    }
    this.merchandiseByDate.push({year:tempy,month:tempm,date:tempd,dayIncome:incomePerday,time:temptime});

    // console.log(this.merchandiseByDate);

    let j = 0;
    for(let i=this.merchandiseByDate[0].time;i<=this.today;){
      // console.log(i);
      this.dlabels.push((i.getMonth()+1)+"/"+i.getDate());
      if(this.merchandiseByDate[j]&&this.merchandiseByDate[j].year==i.getFullYear()&&this.merchandiseByDate[j].month==i.getMonth()+1&&this.merchandiseByDate[j].date==i.getDate()){
        this.dincome.push(this.merchandiseByDate[j].dayIncome);
        j++;
      }
      else{
        this.dincome.push(0);
      }
      let y = i.getFullYear();
      let m = i.getMonth();
      let d = i.getDate();
      let day = new Date(y,m,d);
      day.setDate(d+1);
      i = day;
    }

    this.ddata = {
      labels: this.dlabels,
      datasets: [
        {
          label: 'IncomePerDay',
          backgroundColor: '#7781AF',
          borderColor: '#7781AF',
          data: this.dincome,
        }
      ]
    };
  }

  wdata: any;
  wlabels:string[] = [];
  wincome:number[] = [];
  showWeek:boolean = false;

  getIncomeEveryWeek(){
    // this.allMerchandise.sort(this.sortByTimeDesc);
    // console.log(this.allMerchandise);
    this.merchandiseByWeek = [];
    this.wlabels = [];
    this.wincome = [];
    let timefrom = new Date(this.todayYear,this.todayMonth,this.todayDate);
    timefrom.setDate(this.todayDate-6);
    let timeto = new Date(this.todayYear,this.todayMonth,this.todayDate);
    let tempyfrom = timefrom.getFullYear();
    let tempmfrom = timefrom.getMonth();
    let tempdfrom = timefrom.getDate();
    let tempyto = timeto.getFullYear();
    let tempmto = timeto.getMonth();
    let tempdto = timeto.getDate();
    let incomePerweek = 0;

    let temp = [];
    for(let item of this.allMerchandise){
      temp.push(item);
    }
    temp.sort(this.sortByTimeDesc);

    for(let item of temp){
      if(item.time >= timefrom){
        incomePerweek += item.totalPrice;
      }
      else{
        this.merchandiseByWeek.unshift({yearFrom:tempyfrom,yearTo:tempyto,monthFrom:tempmfrom+1,monthTo:tempmto+1,dateFrom:tempdfrom,dateTo:tempdto,timeFrom:timefrom,timeTo:timeto,weekIncome:incomePerweek});
        timefrom = new Date(tempyfrom,tempmfrom,tempdfrom);
        timefrom.setDate(tempdfrom-7);
        timeto = new Date(tempyto,tempmto,tempdto);
        timeto.setDate(tempdto-7);
        tempyfrom = timefrom.getFullYear();
        tempmfrom = timefrom.getMonth();
        tempdfrom = timefrom.getDate();
        tempyto = timeto.getFullYear();
        tempmto = timeto.getMonth();
        tempdto = timeto.getDate();
        incomePerweek = item.totalPrice;
      }
    }
    this.merchandiseByWeek.unshift({yearFrom:tempyfrom,yearTo:tempyto,monthFrom:tempmfrom+1,monthTo:tempmto+1,dateFrom:tempdfrom,dateTo:tempdto,timeFrom:timefrom,timeTo:timeto,weekIncome:incomePerweek});
    // console.log(this.merchandiseByWeek);
    let j = 0;
    for(let ifrom=this.merchandiseByWeek[0].timeFrom,ito=this.merchandiseByWeek[0].timeTo;ito<=this.today;){
      this.wlabels.push((ifrom.getMonth()+1)+"/"+ifrom.getDate()+"-"+(ito.getMonth()+1)+"/"+ito.getDate());
      if(this.merchandiseByWeek[j]&&this.merchandiseByWeek[j].yearFrom==ifrom.getFullYear()&&this.merchandiseByWeek[j].monthFrom==ifrom.getMonth()+1&&this.merchandiseByWeek[j].dateFrom==ifrom.getDate()){
        this.wincome.push(this.merchandiseByWeek[j].weekIncome);
        j++;
      }
      else{
        this.wincome.push(0);
      }
      let y = ifrom.getFullYear();
      let m = ifrom.getMonth();
      let d = ifrom.getDate();
      let day = new Date(y,m,d);
      day.setDate(d+7);
      ifrom = day;
      y = ito.getFullYear();
      m = ito.getMonth();
      d = ito.getDate();
      day = new Date(y,m,d);
      day.setDate(d+7);
      ito = day;
    }

    this.wdata = {
      labels: this.wlabels,
      datasets: [
        {
          label: 'IncomePerWeek',
          backgroundColor: '#7781AF',
          borderColor: '#7781AF',
          data: this.wincome,
        }
      ]
    };
  }

  mdata: any;
  mlabels:string[] = [];
  mincome:number[] = [];
  showMonth:boolean = false;

  getIncomeEveryMonth(){
    this.merchandiseByMonth = [];
    this.mlabels = [];
    this.mincome = [];
    let tempy = this.allMerchandise[0].year;
    let tempm = this.allMerchandise[0].month;
    let incomePermonth = 0;
    for(let item of this.allMerchandise){
      if(item.year==tempy && item.month==tempm){
        incomePermonth += item.totalPrice;
      }
      else{
        this.merchandiseByMonth.push({year:tempy,month:tempm,monthIncome:incomePermonth});
        tempy = item.year;
        tempm = item.month;
        incomePermonth = item.totalPrice;
      }
    }
    this.merchandiseByMonth.push({year:tempy,month:tempm,monthIncome:incomePermonth});
    // console.log(this.merchandiseByMonth);
    let j = 0;
    for(let i=0;i<12;i++){
      this.mlabels.push(((i+this.todayMonth+1)%12+1).toString());
      if(this.merchandiseByMonth[j]&&this.merchandiseByMonth[j].month == (i+this.todayMonth+1)%12+1){
        this.mincome.push(this.merchandiseByMonth[j].monthIncome);
        j++;
      }
      else{
        this.mincome.push(0);
      }
    }

    this.mdata = {
      labels: this.mlabels,
      datasets: [
        {
          label: 'IncomePerMonth',
          backgroundColor: '#7781AF',
          borderColor: '#7781AF',
          data: this.mincome,
        }
      ]
    };
  }

  ydata: any;
  ylabels:string[] = [];
  yincome:number[] = [];
  showYear:boolean = false;

  getIncomeEveryYear(){
    this.merchandiseByYear = [];
    this.ylabels = [];
    this.yincome = [];
    let tempy = this.allMerchandise[0].year;
    let incomePeryear = 0;
    for(let item of this.allMerchandise){
      if(item.year==tempy){
        incomePeryear += item.totalPrice;
      }
      else{
        this.merchandiseByYear.push({year:tempy,yearIncome:incomePeryear});
        tempy = item.year;
        incomePeryear = item.totalPrice;
      }
    }
    this.merchandiseByYear.push({year:tempy,yearIncome:incomePeryear});
    // console.log(this.merchandiseByYear);
    let j = 0;
    for(let i=2015;i<=this.todayYear;i++){
      this.ylabels.push(i.toString());
      if(this.merchandiseByYear[j]&&this.merchandiseByYear[j].year == i){
        this.yincome.push(this.merchandiseByYear[j].yearIncome);
        j++;
      }
      else{
        this.yincome.push(0);
      }
    }

    // for(let item of this.merchandiseByDate){
    //   this.labels.push("12/"+item.date);
    //   this.income.push(item.dayIncome);
    // }

    this.ydata = {
      labels: this.ylabels,
      datasets: [
        {
          label: 'IncomePerYear',
          backgroundColor: '#7781AF',
          borderColor: '#7781AF',
          data: this.yincome,
        }
      ]
    };
  }



  showDayIncome(){
    this.showDay = true;
    this.showWeek = false;
    this.showMonth = false;
    this.showYear = false;
  }

  showWeekIncome(){
    this.showDay = false;
    this.showWeek = true;
    this.showMonth = false;
    this.showYear = false;
  }


  showMonthIncome(){
    this.showDay = false;
    this.showWeek = false;
    this.showMonth = true;
    this.showYear = false;
  }

  showYearIncome(){
    this.showDay = false;
    this.showWeek = false;
    this.showMonth = false;
    this.showYear = true;
  }

  selectAll(){
    this.allMerchandise = this.allUnAndDoneMerchandise;
    this.getIncomeEveryDay();
    this.getIncomeEveryWeek();
    this.getIncomeEveryMonth();
    this.getIncomeEveryYear();
  }

  selectDelivered(){
    this.allMerchandise = this.allDoneMerchandise;
    this.getIncomeEveryDay();
    this.getIncomeEveryWeek();
    this.getIncomeEveryMonth();
    this.getIncomeEveryYear();

  }
}
