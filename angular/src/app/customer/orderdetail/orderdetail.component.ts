import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderdetailService } from './orderdetail.service';
import { Detailstate } from './orderdetail';
import {OrderProduct} from './orderproduct';
import {OrderlistService} from '../orderlist/orderlist.service';
import {OrderNowList} from '../orderlist/orderstate';

@Component({
  selector: 'app-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.css']
})
export class OrderdetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,private orderdetailService:OrderdetailService) { }
  detailstate: Detailstate = new Detailstate();
  merchandise_id:number;
  orderid:number;
  cando: boolean;
  edit_com:string;
  value=5;
  orderproduct: OrderProduct = new OrderProduct();
  confirm:number;
  ngOnInit() {
    this.cando = false;
    this.orderid =+ this.route.snapshot.paramMap.get('orderid');
    this.confirm =+ this.route.snapshot.paramMap.get('tmp');
    this.GetOrderDetail(this.orderid);
  }
  isVisible = false;
  showModal(id:number): void {
    this.merchandise_id=id;
    this.isVisible = true;
  }

  handleOk(): void {
    console.log(this.edit_com);
    console.log(this.value);
    console.log(this.merchandise_id);
    this.Create_comments(this.merchandise_id);
    this.isVisible = false;
  }

  handleCancel(): void {
    this.edit_com="";
    this.isVisible = false;
  }
  Create_comments(mer_id){
    console.log(mer_id.toString() + 'tt');
    this.orderdetailService.createComments(this.orderid,mer_id,this.edit_com,this.value).subscribe((resp)=>{
      let auth = resp.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      if(resp.body.success == true){
        alert("Comments successfully!");
      }
      this.edit_com="";
    });
  }

  GetOrderDetail(Order_id: number): void {
    this.orderdetailService.GetOrderDetail(Order_id).subscribe((resp)=>{
      this.detailstate = resp;
      console.log(this.detailstate);
      this.cando = true;
    })
  }

}
