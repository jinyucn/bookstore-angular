import { Component, OnInit } from '@angular/core';
import { LoginService} from "./login.service";
import { Router} from "@angular/router";
import { JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material";
import {OwnerAccount} from "./login";
import { ForgetPwdComponent } from "./forget-pwd/forget-pwd.component";
import {ShopInfoService} from "../shop/shop-info/shop-info.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(
    private jwtHelperService: JwtHelperService,
    private loginService: LoginService,
    private router: Router,
    public dialog: MatDialog,
    private shopInfoService:ShopInfoService,
  ) {
  }
  headers;

  ngOnInit() {
  }


  login_nick: string = "";
  login_password: string = "";
  postData : OwnerAccount = new OwnerAccount();

  shopStatus: string = "";

  email:string;
  openDialog(): void {
    let dialogRef = this.dialog.open(ForgetPwdComponent,
      {
        data:{email:this.email }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  login():
    void {
    console.log(this.login_nick);
    console.log(this.login_password);
    this.postData.nick = this.login_nick;
    this.postData.password = this.login_password;

    console.log(this.postData);

    this.loginService.getResponse(this.postData.nick,this.postData.password)
      .subscribe((resp =>{
        if(resp.body.success == true) {
          const keys = resp.headers.keys();
          console.log(keys);
          console.log(resp);

          let auth = resp.headers.get('Set-Auth-Jwt');
          localStorage.setItem('Set-Auth-Jwt',auth);
          // console.log(auth);

          this.shopInfoService.getStatus().subscribe(resp=>{
            this.shopStatus = resp.body.data.shopStatus;
            console.log("shopstatus="+this.shopStatus);
            if(this.shopStatus == "BLOCKED"){
              this.router.navigate(['ShopOwnerCenter']);
            }
            else{
              this.router.navigate(['Notification']);
            }
          });
        }
        else
        {
          alert(resp.body.message)
        }

      }))
  }
}
