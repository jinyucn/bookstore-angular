import { Component, OnInit } from '@angular/core';
import {Orders, OrderOne, OrderList, OrderAll} from "./order-manage";
import { OrderManageService} from "./order-manage.service";
import { MatSnackBar } from "@angular/material";
import { DatePipe} from "@angular/common";

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  constructor(
    private orderManageService:OrderManageService,
    public snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit() { this.getOrderList();
  }
  orders = new Orders();
  orderOne = new OrderOne();
  orderList = new OrderList();
  orderAll = new OrderAll();
  nothing = 'You have no orders at the moment'
  delivered;
  amount: number;
  unitPrice: number;
  customerNick: string;
  customerId: string;
  paid: boolean;
  deliverAddress :string;
  deliverServicePic:string;
  status: string;
  total_price: number;
  deliverId;
  products =[] ;
  merchandises = [];
  gmtCreate:Date;
  OrderDate:Date;
  deliverBillNo;
  deliverReceiver;
  deliverPhone;
  unit;
  offset: Date;
  interval;
  date = null; // new Date();
  selectedStatus = 'all';
  getOrderSome(index):void{
    this.selectedStatus = index;
    this.orderManageService.getOrderSome(this.selectedStatus).subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        this.snackBar.open('You find '+resp.body.data.length+' results', 'Ok', {
          duration: 3000
        });
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll = resp.body;

        for (let i=0;i<resp.body.data.length;i++){
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'Processing'
          }
          else if(resp.body.data[i].deliverId == 0)
          { this.orderAll.data[i].status = 'Preparing for shipment'}
          else {
            if(resp.body.data[i].delivered == false)
            {
              this.orderAll.data[i].status = 'Shipped'
            }
            else
            {
              this.orderAll.data[i].status = 'Complete'
            }
          }
        }
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  dateFilter(a,b,c):void{
    this.unit = a;
    this.offset = b;
    console.log(this.datePipe.transform(this.offset,'yyyy-MM-dd'));
    this.interval = c-1;
    this.orderManageService.dateFilter(this.unit,this.datePipe.transform(this.offset,'yyyy-MM-dd'),this.interval).subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        this.snackBar.open('You find '+resp.body.data.length+' results', 'Ok', {
            duration: 3000
          });
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll = resp.body;

        for (let i=0;i<resp.body.data.length;i++){
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'Processing'
          }
          else if(resp.body.data[i].deliverId == 0)
          { this.orderAll.data[i].status = 'Preparing for shipment'}
          else {
            if(resp.body.data[i].delivered == false)
            {
              this.orderAll.data[i].status = 'Shipped'
            }
            else
            {
              this.orderAll.data[i].status = 'Complete'
            }
          }
        }
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  pageIndex = 1;
  loading = true;
  getOrderList(): void{
    this.orderManageService.getOrderList().subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll = resp.body;

        for (let i=0;i<resp.body.data.length;i++){
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'Processing'
          }
          else if(resp.body.data[i].deliverId == 0)
          { this.orderAll.data[i].status = 'Preparing for shipment'}
          else {
            if(resp.body.data[i].delivered == false)
            {
              this.orderAll.data[i].status = 'Shipped'
            }
            else
            {
              this.orderAll.data[i].status = 'Complete'
            }
          }
        }
      }
      else{
        console.log("Failed to get order list");
      }
    })

  }

  id:number;
  visible:boolean = false;
  keyword;
  close(): void{
    this.visible = false;
  }
  checkOne(index:number):void{
    this.visible = true;
    this.id = index;
  }

  search(index):void{
    this.keyword = index;
    this.orderManageService.search(this.keyword).subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        this.snackBar.open('You find '+resp.body.data.length+' results', 'Ok', {
          duration: 3000
        });
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll = resp.body;
        for (let i=0;i<resp.body.data.length;i++){
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'Processing'
          }
          else if(resp.body.data[i].deliverId == 0)
          { this.orderAll.data[i].status = 'Preparing for shipment'}
          else {
            if(resp.body.data[i].delivered == false)
            {
              this.orderAll.data[i].status = 'Shipped'
            }
            else
            {
              this.orderAll.data[i].status = 'Complete'
            }
          }
        }
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  getOrderOne(index:number): void{
    this.id = index;
    this.orderManageService.getOrderOne(this.id).subscribe((resp) =>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        console.log(resp.body);
        this.orders = resp.body;
        // console.log(resp.body.data);
        this.deliverReceiver = resp.body.data.deliverReceiver;
        this.deliverPhone = resp.body.data.deliverPhone;
        this.deliverBillNo = resp.body.data.deliverBillNo.substring(0,8).toUpperCase();
        this.customerNick = resp.body.data.customerNick;
        this.customerId = resp.body.data.customerId;
        this.gmtCreate = resp.body.data.gmtCreate;
        this.deliverAddress = resp.body.data.deliverAddress;
        this.deliverServicePic = resp.body.data.deliverServicePic;
        this.products = resp.body.data.merchandises;
        this.deliverId = resp.body.data.deliverId;
        if(resp.body.data.deliverId == -1 ){
          this.status = 'Processing'
        }
        else if(resp.body.data.deliverId == 0)
        {this.status = 'Preparing'}
        else {
          if(resp.body.data.delivered == false)
          {
            this.status = 'Shipped';
          }
          else {
            this.status = 'Complete'
          }
        }
        this.total_price = 0;
        for(let i =0;i< resp.body.data.merchandises.length;i++){
          this.total_price = this.total_price + resp.body.data.merchandises[i].amount * resp.body.data.merchandises[i].unitPrice
        }
      }
      else{
        console.log("Failed to get one order.");
      }
    })

}
  company;
  selectedCompany:string;
  companies=['1 ShunFeng','2 YuanTong','3 ShenTong','4 ZhongTong','5 EMS','6 YouZheng']

  arrange(id,company):void{
    this.id = id;
    this.company = company;
    console.log(this.company);
   if(this.company == '1 ShunFeng'){
     this.deliverId = 1;
   }
   else if(this.company =='2 YuanTong'){
     this.deliverId = 2;
   }
   else if(this.company == '3 ShenTong'){
     this.deliverId = 3
   }
   else if(this.company == '4 ZhongTong'){
     this.deliverId = 4
   }
   else if(this.company == '5 EMS'){
     this.deliverId = 5
   }
   else{this.deliverId = 6}
   this.orderManageService.putShipment(this.id,this.deliverId).subscribe((resp)=>{
     console.log(resp.body);
     if(resp.body.success == true){
       let auth = resp.headers.get('Set-Auth-Jwt');
       console.log(auth);
       localStorage.setItem('Set-Auth-Jwt',auth);

       alert( 'Shipment arrange successfully');
       this.getOrderOne(this.id);
       this.getOrderSome(this.selectedStatus);
       this.selectedCompany = '';
     }
   })
  }
  prepare( id):void{
    this.id = id;
    this.orderManageService.putPrepare(this.id).subscribe((resp)=>{
      if(resp.body.success==true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);

        alert( 'Preparing for shipment Now');
        this.getOrderOne(this.id);
        this.getOrderSome(this.selectedStatus);
      }
    })
  }

}
