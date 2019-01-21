import {Component, Inject, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {CloginService} from "../clogin/clogin.service";
import {DialogData, DialogselfComponent, RegisterDialogselfComponent} from '../clogin/clogin.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";
import { CartService } from './cart.service';
import { Cproductstate } from './Cartstate';
import { Responsestate } from './Responsestate';
import {first} from 'rxjs/operators';
import {Loginstate} from '../clogin/loginstate';
import {CloginAccount} from '../clogin/clogin';
import {option} from '../place';
import { NzModalService } from 'ng-zorro-antd';
import { OrderNotPaid} from './cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cproductstate: Cproductstate = new Cproductstate();
  responsestate: Responsestate = new Responsestate();
  Address: string;
  email:string;
  allprice: number;
  orderNotPaid: OrderNotPaid = new OrderNotPaid();
  constructor(
    public dialog: MatDialog,
    private cartService: CartService,
    private modalService: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    /*
      this should be modified.
     */
    this.Address = '209 left';
    this.GetAllCart();
  }
  GetAllCart(): void {
    this.cartService.GetAllCart().subscribe(cproductstate => {
      /*console.log(cproductstate);*/
      let auth = cproductstate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        this.cproductstate = cproductstate.body;
        this.allprice = 0;
        this.cproductstate.data.forEach(ele => {
          ele.num = 1;
          this.allprice += ele.price;
        });

    });
  }
  REmoveCart(cartid: number): void {
    this.cartService.RemoveCart(cartid).subscribe(cartdeletestate => {
      let auth = cartdeletestate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        alert('Delete successful!');
        this.GetAllCart();
        /*window.location.reload();tt*/
    });
  }

  REMOVECART(cartid: number): void {
    this.cartService.RemoveCart(cartid).subscribe(cartdeletestate => {});
  }

  cancel(): void {

  }

  Func(productid: number): void {
    this.cproductstate.data.forEach(ele => {
      if(ele.id == productid) {
        this.allprice -= ele.num * ele.price;
        var obvalue = <HTMLInputElement>document.getElementById('Getvalue' + ele.id.toString());
        if( +obvalue.value <= 0) {

          obvalue.value = "1";
        }
        ele.num = +obvalue.value;
        this.allprice += ele.num * ele.price;
      }
    })
  }
  CheckOut(): void {
    if(this.cproductstate.data.length == 0) {
      alert('No products.Please shopping first.');
      return;
    }
    this.Address="";
    for(let request of this.values){
      this.Address=this.Address+request+'/';
    }
    this.Address=this.Address+this.street;
    console.log(this.Address);
    this.cartService.Checkout(this.cproductstate.data, this.Address,this.order_nick,this.order_phone).subscribe(responsestate => {
      let auth = responsestate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(responsestate);
        if(responsestate.body.success == true) {
          alert('Order submitted.');
          this.cproductstate.data.forEach(ele => {
            this.REMOVECART(ele.id);
          });
          this.responsestate = responsestate.body;
          this.orderNotPaid = responsestate.body.data;
          this.pay();
          /*window.location.reload();*/
        }
        else {
          console.log('Unknown problem.');
        }
    })
  }


  nzOptions = option;

  /** ngModel value */
  public values: string[] = null;
  public order_phone: string;
  public order_nick:string;
  public onChanges(values: any): void {
    console.log(values, this.values);

  }
   street: string;
  isVisible = false;
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.CheckOut();
    this.isVisible = false;
    console.log(this.street);
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  visible:boolean = false;
  close(): void{
    this.visible = false;
  }
  pay():void{
    this.visible = true;
  }
  payNow(): void{
    this.cartService.payNow(this.orderNotPaid).subscribe((resp)=>{
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(resp);
      if(resp.body.success == true){
        alert('Pay successfully');
        location.href = '/orderlist/now';
      }
    })
  }
  codNow():void{
    this.cartService.payNow(this.orderNotPaid).subscribe((resp)=>{
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(resp);
      if(resp.body.success == true){
        alert('Successful');
        this.router.navigate(['orderlist']);
      }
    })
  }

}

