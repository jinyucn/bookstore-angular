import {Component, OnInit, ViewChild} from '@angular/core';
import {OrderAll, OrderList, OrderOne, Orders} from "../order-manage/order-manage";
import { OrderManageService} from "../order-manage/order-manage.service";
import { IncomeManageService} from "../income-manage/income-manage.service";
import { DatePipe} from "@angular/common";
import {MatPaginator, MatSnackBar, MatTableDataSource} from "@angular/material";

@Component({
  selector: 'app-sales-history',
  templateUrl: './sales-history.component.html',
  styleUrls: ['./sales-history.component.css']
})
export class SalesHistoryComponent implements OnInit {

  constructor(
    private orderManageService: OrderManageService,
    private incomeManageService: IncomeManageService,
    private datePipe: DatePipe,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {this.getOrderList();
    this.orderAll.paginator = this.paginator;
  }
  @ViewChild('paginator') paginator: MatPaginator;
  orderAll = new MatTableDataSource<any>();
  orders = new Orders();
  orderOne = new OrderOne();
  orderList = new OrderList();
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
  filterStatus = [
    { text: 'true', value: 'true' },
    { text: 'false', value: 'false' }
  ];
  searchGenderList: string[] = [];
  updateFilter(value: string[]): void {
    this.searchGenderList = value;
  }
  applyFilter(filterValue: string) {
    this.orderAll.filter = filterValue.trim().toLowerCase();

    if (this.orderAll.paginator) {
      this.orderAll.paginator.firstPage();
    }
  }
  dateFilter(a,b,c):void{
    this.unit = a;
    this.offset = b;
    console.log(this.datePipe.transform(this.offset,'yyyy-MM-dd'));
    this.interval = c;
    this.orderManageService.dateFilter(this.unit,this.datePipe.transform(this.offset,'yyyy-MM-dd'),this.interval).subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll.data = resp.body.data;

        for (let i=0;i<resp.body.data.length;i++){
          this.idAll[i] =  this.orderAll.data[i].id;
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'No arrangement'
          }
          else if(resp.body.data[i].delivered == false)
          { this.orderAll.data[i].status= 'On the way'}
          else{
            this.orderAll.data[i].status= 'Already delivered'
          }
        }
        this.getIncome();
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  id;
  idAll=[];
  checked = true;
  getOrderList(): void{
    this.orderManageService.getOrderList().subscribe((resp) =>{
      console.log(resp.body.data);
      // console.log(resp.data);
      if(resp.body.success == true){
        this.checked = true;
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll.data = resp.body.data;
        for (let i=0;i<resp.body.data.length;i++){
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          this.idAll[i] =  this.orderAll.data[i].id;
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'No arrangement'
          }
          else if(resp.body.data[i].delivered == false)
          { this.orderAll.data[i].status= 'On the way'}
          else{
            this.orderAll.data[i].status= 'Already delivered'
          }
        }
        console.log(this.idAll)
        this.getIncome();
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  length;
  getIncome():void{
    this.incomeManageService.getIncome(this.idAll).subscribe((resp) => {
      if (resp.body.success == true) {
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt', auth);
        console.log(resp.body.data);
        this.length = this.idAll.length;
        for (let m = 0; m < this.idAll.length && this.orderAll.data[m]; m++) {
          this.orderAll.data[m].total_price = 0;
          this.orderAll.data[m].id = resp.body.data[this.idAll[m]].id;
          this.orderAll.data[m].delivered = resp.body.data[this.idAll[m]].delivered;
          this.orderAll.data[m].gmtCreate = resp.body.data[this.idAll[m]].gmtCreate.substring(0,10)+' '+ resp.body.data[this.idAll[m]].gmtCreate.substring(11,19);
          this.orderAll.data[m].products = '';
          this.orderAll.data.splice(this.idAll.length,this.orderAll.data.length-this.idAll.length)
          for (let i = 0; i < resp.body.data[this.idAll[m]].merchandises.length; i++) {
             this.orderAll.data[m].products = this.orderAll.data[m].products + '[ '+ resp.body.data[this.idAll[m]].merchandises[i].amount + ', ' + resp.body.data[this.idAll[m]].merchandises[i].title+' ] ';
             this.orderAll.data[m].total_price = this.orderAll.data[m].total_price + resp.body.data[this.idAll[m]].merchandises[i].amount * resp.body.data[this.idAll[m]].merchandises[i].unitPrice;
          }
        }
        this.snackBar.open('You find '+this.orderAll.data.length+' results', 'Ok', {
          duration: 3000
        });
      }
    })
  }

  visible:boolean = false;
  keyword;
  close(): void{
    this.visible = false;
  }
  checkOne(index:number):void{
    this.visible = true;
    this.id = index;
  }

  getOrderOne(index:number): void{
    this.id = index;
    this.incomeManageService.getOrderOne(this.id).subscribe((resp) =>{
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
          this.status = 'No arrangement'
        }
        else if(resp.body.data.delivered == false)
        {this.status = 'On the way'}
        else{
          this.status = 'Already delivered'
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
  search(index):void{
    this.keyword = index;
    this.orderManageService.search(this.keyword).subscribe((resp) =>{
      console.log(resp.body);
      // console.log(resp.data);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.orderAll.data = resp.body.data;
        for (let i=0;i<resp.body.data.length;i++){
          this.idAll[i] =  this.orderAll.data[i].id;
          this.orderAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
          if(resp.body.data[i].deliverId == -1 ){
            this.orderAll.data[i].status = 'No arrangement'
          }
          else if(resp.body.data[i].delivered == false)
          { this.orderAll.data[i].status= 'On the way'}
          else{
            this.orderAll.data[i].status= 'Already delivered'
          }
        }this.getIncome();
      }
      else{
        console.log("Failed to get order list");
      }
    })
  }
  getDelivered():void{
    this.idAll = [];
    for (let i=0;i<this.orderAll.data.length;i++){
      if(this.orderAll.data[i].delivered == true) {
        this.idAll.push(this.orderAll.data[i].id);
      }
    }
    console.log(this.idAll);
    this.getIncome();
  }
}
