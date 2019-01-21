import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShopInfoService} from "../shop-info/shop-info.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-so-main-menu',
  templateUrl: './so-main-menu.component.html',
  styleUrls: ['./so-main-menu.component.css']
})
export class SoMainMenuComponent implements OnInit {

  show:boolean = true;

  step = -1;

  nick:string="";
  role:string="";
  shopName:string="";
  shopStatus:string="";

  constructor(
    private shopInfoService: ShopInfoService,
    private router:Router,
  ) { }

  ngOnInit() {
    this.isShow();
  }

  isShow(){
    this.shopInfoService.getStatus().subscribe(res=>{
      if(res.body.success == true){
        let auth = res.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);

        if (res.body.data.role=='NONE'|| res.body.data.role == 'blocked'){
          this.role = 'NO';
        }
        else {this.role = 'YES'}
        this.nick = res.body.data.nick;
        this.shopName = res.body.data.shopName;
        this.shopStatus = res.body.data.shopStatus;

        if(this.shopStatus == "NORMAL"){
          this.show = false;
        }
        else if(this.shopStatus == "BLOCKED"){
          this.show = true;
        }
        else{
          alert("Login has expired, please login again.");
          this.router.navigate(['login']);
        }
      }
      else{
        console.log("Failed to get shop ifo.");
      }
    })
  }

}
