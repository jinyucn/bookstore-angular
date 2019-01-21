import { Component, OnInit } from '@angular/core';
import {ShopInfoService} from "../shop-info/shop-info.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(
    private shopInfoService:ShopInfoService,
  ) { }

  nick:string="";
  role:string="";
  shopName:string="";
  shopStatus:string="";
  getShopInfo():void{this.shopInfoService.getStatus().subscribe(
    (resp =>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.nick = resp.body.data.nick;
        if (resp.body.data.role=='NONE'|| resp.body.data.role == 'blocked'){
          this.role = 'NO';
        }
        else {this.role = 'YES'}
        this.shopName = resp.body.data.shopName;
        this.shopStatus = resp.body.data.shopStatus;
      }
      else{
        console.log("Failed to get shop info.");
      }
    })
  )}

  ngOnInit() {
    this.getShopInfo()
  }

}
