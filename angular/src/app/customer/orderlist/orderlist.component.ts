import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {OrderContent, OrderNowList} from './orderstate';
import { OrderlistService } from './orderlist.service';
import { en_US, zh_CN, NzI18nService } from 'ng-zorro-antd';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  cando: boolean;
  cando2: boolean;
  isnow: boolean;
  category: string;
  keyword: string;
  ordernowlist: OrderNowList = new OrderNowList();
  displayData: OrderContent[];
  date = null; // new Date();
  nothing = 'You have no orders at the moment';
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private orderlistService: OrderlistService,
    private i18n: NzI18nService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.isnow = true;
    this.cando = false;
    this.GetNowOrder();
    this.category = this.route.snapshot.paramMap.get('category');
    if(this.category=='now') {
      this.isnow = true;
    }
    if(this.category!='now') {
      this.isnow = false;
    }
    this.cando2 = true;
    this.i18n.setLocale(en_US);
  }
  companies=['0','1 ShunFeng','2 YuanTong','3 ShenTong','4 ZhongTong','5 EMS','6 ChinaPost']
  arr: string[] = ["", "ShunFeng", "YuanTong", "ShenTong", "ZhongTong", "EMS", "ChinaPost"];

  company;
  ordernow;
  GetNowOrder(): void {
    this.orderlistService.GetNowOrder().subscribe(resp => {
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(resp)
      if(resp.body.success == true){
        this.snackBar.open('You find '+resp.body.data.length+' results', 'Ok', {
          duration: 3000
        });
      }
      this.ordernowlist = resp.body;
      this.displayData=this.ordernowlist.data;
      console.log(this.displayData);
      this.cando = true;
    })
  }
  Receive(id: number): void{
    this.orderlistService.ConfirmReceive(id).subscribe((resp) => {
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      if(resp.body.success==true){
        alert("Confirm successfully!");
        this.GetNowOrder();
      }
    })
  }

  cancel(): void {

  }

  Click(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    if(this.category == 'now') {
      this.isnow = false;
    }
    if(this.category != 'now') {
      this.isnow = true;
    }
  }

  sortName = null;
  sortValue = null;
  searchAddress = [];
  searchValue = '';
  sortMap = {
    id: null,
    create_time: null,
    customer_id: null,
    deliver_address: null,
    deliver_id: null,
    deliver_phone:null,
    deliver_receiver:null,
    delivered: null,
    paid: null,

  };
  sort(sortName: string, value: boolean): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.searchByAddress();
  }

  filterAddressChange(value: string[]): void {
    this.searchAddress = value;
    this.searchByAddress();
  }

  searchByAddress(): void {
    const filterFunc = (item) => {
      return (this.searchAddress.length ? this.searchAddress.some(address => item.deliver_address.indexOf(address) !== -1) : true) &&
        (item.deliver_address.indexOf(this.searchValue) !== -1);
    };
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  searchNameList = [];
  searchAddressList = [];
  sortByid(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    for (const key in this.sortMap) {
      this.sortMap[ key ] = (key === sortName ? value : null);
    }
    this.search1(this.searchNameList, this.searchAddressList);
  }


  search1(searchNameList: string[], searchAddressList: string[]): void {
    this.searchNameList = searchNameList;
    this.searchAddressList = searchAddressList;
    const filterFunc = item => (this.searchAddressList.length ? this.searchAddressList.some(address => item.address.indexOf(address) !== -1) : true) && (this.searchNameList.length ? this.searchNameList.some(name => item.name.indexOf(name) !== -1) : true);
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
    } else {
      this.displayData = data;
    }
  }

  searchAddress1 = [];
  searchValue1:number;
  searchByid(): void {
    const filterFunc = (item) => {
      return (this.searchAddress1.length ? this.searchAddress1.some(address => item.id.indexOf(address) !== -1) : true) &&
        (item.id==this.searchValue1||!this.searchValue1);
    };
    console.log(this.searchValue1);
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }
  searchAddressNick = [];
  searchValueNick:number;
  searchByNick():void{
    const filterFunc = (item) => {
      return (this.searchAddressNick.length ? this.searchAddressNick.some(address => item.deliver_address.indexOf(address) !== -1) : true) &&
        (item.deliver_receiver.indexOf(this.searchValueNick) !== -1);
    };
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  onChange(result: Date): void {
    console.log('onChange0: ', result[0].getTime());
    console.log('onChange1: ', result[1].getTime());
  }
  DateOk():void{
    this.changeDate();
    this.searchByDate();
  }

  searchAddressDate = [];
  dateRange = []; // [ new Date(), addDays(new Date(), 3) ];
  searchByDate(): void {
    const filterFunc = (item) => {
      return (this.searchAddressDate.length ? this.searchAddressDate.some(address => item.id.indexOf(address) !== -1) : true) &&
        (item.create_time>=this.todate1&&item.create_time<=this.todate2);
    };
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  datemonth1:number;
  datemonth2:string;
  datemonth3:number;
  datemonth4:string;
  dateday1:number;
  dateday2:string;
  dateday3:number;
  dateday4:string;
  datehour1:number;
  datehour2:string;
  datehour3:number;
  datehour4:string;
  datemin1:number;
  datemin2:string;
  datemin3:number;
  datemin4:string;
  datesec1:number;
  datesec2:string;
  datesec3:number;
  datesec4:string;
  todate1:string;
  todate2:string;
  changeDate():void{
     this.datemonth1=this.dateRange[0].getMonth()+1;
     if(this.datemonth1>=1&&this.datemonth1<=9){
       this.datemonth2='-0'+this.datemonth1;
     }
     else{
       this.datemonth2='-'+this.datemonth1;
     }
     this.datemonth3=this.dateRange[1].getMonth()+1;
     if(this.datemonth3>=1&&this.datemonth3<=9){
       this.datemonth4='-0'+this.datemonth3;
     }
     else{
       this.datemonth4='-'+this.datemonth3;
     }

     this.dateday1=this.dateRange[0].getDate();
     if(this.dateday1>=1&&this.dateday1<=9){
       this.dateday2='-0'+this.dateday1;
     }
     else{
       this.dateday2='-'+this.dateday1;
     }
    this.dateday3=this.dateRange[1].getDate();
    if(this.dateday3>=1&&this.dateday3<=9){
      this.dateday4='-0'+this.dateday3;
    }
    else{
      this.dateday4='-'+this.dateday3;
    }

    this.datehour1=this.dateRange[0].getHours();
    if(this.datehour1>=0&&this.datehour1<=9){
      this.datehour2=' 0'+this.datehour1;
    }
    else{
      this.datehour2=' '+this.datehour1;
    }
    this.datehour3=this.dateRange[1].getHours();
    if(this.datehour3>=0&&this.datehour3<=9){
      this.datehour4=' 0'+this.datehour3;
    }
    else{
      this.datehour4=' '+this.datehour3;
    }

    this.datemin1=this.dateRange[0].getMinutes();
    if(this.datemin1>=0&&this.datemin1<=9){
      this.datemin2=':0'+this.datemin1;
    }
    else{
      this.datemin2=':'+this.datemin1;
    }
    this.datemin3=this.dateRange[1].getMinutes();
    if(this.datemin3>=0&&this.datemin3<=9){
      this.datemin4=':0'+this.datemin3;
    }
    else{
      this.datemin4=':'+this.datemin3;
    }

    this.datesec1=this.dateRange[0].getSeconds();
    if(this.datesec1>=0&&this.datesec1<=9){
      this.datesec2=':0'+this.datesec1;
    }
    else{
      this.datesec2=':'+this.datesec1;
    }
    this.datesec3=this.dateRange[1].getSeconds();
    if(this.datesec3>=0&&this.datesec3<=9){
      this.datesec4=':0'+this.datesec3;
    }
    else{
      this.datesec4=':'+this.datesec3;
    }
     this.todate1=this.dateRange[0].getFullYear()+this.datemonth2 + this.dateday2 +this.datehour2+this.datemin2 +this.datesec2;
    this.todate2=this.dateRange[1].getFullYear()+ this.datemonth4 + this.dateday4 +this.datehour4+this.datemin4  +this.datesec4;
    console.log(this.todate1);
    console.log(this.todate2);
  }
  GetSomeOrder(keyword: string): void {
    this.orderlistService.GetSomeOrder(keyword).subscribe((resp)=>{
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(resp)
      if(resp.body.success == true){
        this.snackBar.open('You find '+resp.body.data.length+' results', 'Ok', {
          duration: 3000
        });
      }
      this.ordernowlist = resp.body;
      this.displayData=this.ordernowlist.data;
      console.log(this.displayData);
    })
  }
  ButtonClick(): void {
    console.log('ok');
    console.log(this.keyword);
    this.GetSomeOrder(this.keyword);
  }
  Turn(bill_no: string): string {
    return bill_no.substring(0, 8).toUpperCase();
  }
  Reset(): void {
    this.GetNowOrder();
  }

  searchAddressPhone = [];
  searchValuePhone:number;
  searchByPhone():void{
    const filterFunc = (item) => {
      return (this.searchAddressPhone.length ? this.searchAddressPhone.some(address => item.deliver_address.indexOf(address) !== -1) : true) &&
        (item.deliver_phone.indexOf(this.searchValuePhone) !== -1);
    };
    const data = this.ordernowlist.data.filter(item => filterFunc(item));
    this.displayData = data.sort((a, b) => (this.sortValue === 'ascend') ? (a[ this.sortName ] > b[ this.sortName ] ? 1 : -1) : (b[ this.sortName ] > a[ this.sortName ] ? 1 : -1));
  }

  clearDate():void{
    this.dateRange = [];
    this.displayData=this.ordernowlist.data;
  }
}
