import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { OwnerAccountService} from "./owner-account.service";
import { HistoryAll,History} from "./owner-account";
import {OrderAll, OrderList, OrderOne, Orders} from "../order-manage/order-manage";
import { IncomeManageService} from "../income-manage/income-manage.service";
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
@Component({
  selector: 'app-owner-account',
  templateUrl: './owner-account.component.html',
  styleUrls: ['./owner-account.component.css']
})
export class OwnerAccountComponent implements OnInit {

  constructor(
    private ownerAccountService: OwnerAccountService,
    private incomeManageService: IncomeManageService
  ) { }
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;
  historyAll = new MatTableDataSource<any>();
  ngOnInit() {this.getBalance();
  this.getHistory();

    this.historyAll.paginator = this.paginator;

  }
  balance;

  history = new History();
  cause;
  gmtCreate;
  id;
  delta;
  adReqId;
  orderId;
  orders = new Orders();
  orderOne = new OrderOne();
  orderList = new OrderList();
  orderAll = new OrderAll();
  nothing = 'No information';
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
  deliverBillNo;
  deliverReceiver;
  deliverPhone;
  unit;
  offset: Date;
  interval;
  selected;
  applyFilter(filterValue: string) {
    this.historyAll.filter = filterValue.trim().toLowerCase();
    // if(this.selected=="cause"){
    //   this.historyAll.filterPredicate = (data:any,filter:string):boolean=> {
    //     return data.cause.indexOf(filter) !== -1;
    //   }
    // }
    // else if(this.selected=="delta"){
    //   this.historyAll.filterPredicate = (data:any,filter:string):boolean=> {
    //     return data.delta.indexOf(filter) !== -1;
    //   }
    // }
    if (this.historyAll.paginator) {
      this.historyAll.paginator.firstPage();
    }
  }
  getBalance():void{
    this.ownerAccountService.getBalance().subscribe((resp)=>{
      console.log(resp.body);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.balance = resp.body.data;
      }
    })
  }
  length;
  getHistory():void{
    this.ownerAccountService.getHistory().subscribe((resp)=>{
      console.log(resp.body);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth)
        console.log(resp.body.data);
        this.historyAll.data = resp.body.data;
        this.length = resp.body.data.length;
        for( let i =0;i<resp.body.data.length;i++){
          this.historyAll.data[i].cause = resp.body.data[i].cause;
          this.historyAll.data[i].delta= resp.body.data[i].delta;
          if(this.historyAll.data[i].delta>0){
            this.historyAll.data[i].delta = '+'+ resp.body.data[i].delta;
          }
          this.historyAll.data[i].gmtCreate=resp.body.data[i].gmtCreate.substring(0,10)+' '+resp.body.data[i].gmtCreate.substring(11,19);
        }
      }
    })
  }
  withdrawM;
  cardNumber1;
  cardNumber2;
  withdraw(index):void{
    this.withdrawM=index;
    if(this.balance<this.withdrawM){
      alert('Your balance is not enough!')
    }
    else {
      if (this.cardNumber1 > 0) {
        this.ownerAccountService.withdraw(this.withdrawM).subscribe((resp) => {
          if (resp.body.success == true) {
            let auth = resp.headers.get('Set-Auth-Jwt');
            console.log(auth);
            localStorage.setItem('Set-Auth-Jwt', auth);
            console.log(resp.body);
            alert('Withdraw successful')
            this.withdrawM = '';
            this.cardNumber1 = '';
            this.getHistory();
            this.getBalance();
          }
        })
      }
      else {
        alert('please input card number')
      }
    }
  }
  rechargeM;
  recharge(index):void{
    if(this.cardNumber2>0){
      this.rechargeM = index;
      this.ownerAccountService.recharge(this.rechargeM).subscribe((resp)=>{
        if(resp.body.success == true) {
          let auth = resp.headers.get('Set-Auth-Jwt');
          console.log(auth);
          localStorage.setItem('Set-Auth-Jwt', auth);
          console.log(resp.body);
          alert('Recharge successful')
          this.rechargeM = '';
          this.cardNumber2='';
          this.getHistory();
          this.getBalance();
        }
      })
    }
    else{
      alert('please input card number')
    }
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
  checkAd(index):void{
    this.ownerAccountService.checkAd(index).subscribe((resp)=>{
      console.log(resp)
    })
  }
}
