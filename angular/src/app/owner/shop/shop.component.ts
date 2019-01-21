import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { LoginService} from "../login/login.service";
import {ShopInfoService} from "./shop-info/shop-info.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(
    private loginService:LoginService,
    private router: Router,
    private shopInfoService: ShopInfoService,
  ) {
  }


  ngOnInit() {

  }

  shopStatus:string = "";
  openShop(){
    this.shopInfoService.getStatus().subscribe(resp=>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.shopStatus = resp.body.data.shopStatus;
        if(this.shopStatus == "BLOCKED"){
          this.router.navigate(['OpenShop']);
        }
        else{
          alert("You have had a shop, you can just own one shop.");
          this.router.navigate(['Notification']);
        }
      }
      else{
        console.log(resp.body.message);
      }
    });
  }


}
