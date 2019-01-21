import { Component, OnInit } from '@angular/core';
import { Router} from "@angular/router";
import { JwtHelperService} from "@auth0/angular-jwt";
import {MatDialog} from "@angular/material";
import {OwnerRegisterAccount} from "./registration";
import {RegistrationService} from "./registration.service";
import {LoginService} from "../login/login.service";
import {option} from "../../customer/place";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {

  constructor(
    private jwtHelperService: JwtHelperService,
    private registrationService: RegistrationService,
    private router: Router,
    public dialog: MatDialog,
    private loginService:LoginService,
  ) {
  }
  headers;

  ngOnInit() {
  }
  register_nick:string = "";
  register_password:string = "";
  register_email:string = "";
  register_address:string = "";
  register_phone:string = "";
  register_verifyCode:string = "";
  options;
  option=option;
  public values: string[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);

  }
  street: string;
  postRegisterData: OwnerRegisterAccount=new OwnerRegisterAccount();

  register():void{
    for(let request of this.values){
      this.register_address=this.register_address+request+',';
    }
    this.register_address=this.register_address+this.street;
    console.log(this.register_address);
    this.postRegisterData.nick=this.register_nick;
    this.postRegisterData.address=this.register_address;
    this.postRegisterData.email=this.register_email;
    this.postRegisterData.password=this.register_password;
    this.postRegisterData.phone=this.register_phone;
    this.postRegisterData.verifyCode=this.register_verifyCode;
    this.registrationService.tryRegister(this.postRegisterData).subscribe((resp) => {
        console.log(resp);
        if (resp.success == true) {
          alert('Register successful, login automatic and going to your shop owner center now')
          this.loginService.getResponse(this.postRegisterData.nick, this.postRegisterData.password)
            .subscribe((resp =>{
              this.router.navigate(['Notification'])
              const keys = resp.headers.keys();
              console.log(keys);
              // console.log(resp);
              // const geta = resp.headers.get('content-type')
              // console.log(geta);
              let auth = resp.headers.get('Set-Auth-Jwt');
              localStorage.setItem('Set-Auth-Jwt',auth);
              // console.log(this.jwtHelperService.tokenGetter())
            }))
        }
        else {
          alert(resp.message)
        }
      }

    )
  }

  send_verify_code():void{
    console.log("send_verify_code");
    this.registrationService.get_verify_code(this.register_phone).subscribe((resp) => {
      if(resp.success == true){
        alert('send successfully, please wait')
      }
    });
  }

}
