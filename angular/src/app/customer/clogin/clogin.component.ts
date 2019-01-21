import { Component,Inject, OnInit } from '@angular/core';
import {CloginService} from "./clogin.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {OwnerAccount} from '../../owner/login/login';
import {CloginAccount} from './clogin';
import {Loginstate} from './loginstate';
import {first} from "rxjs/operators";
import { Router} from "@angular/router";
import { CustomerJwtService} from "../customer-jwt.service";
import {option} from '../place';

export interface DialogData {
  email:string;
}
@Component({
  selector: 'app-clogin',
  templateUrl: './clogin.component.html',
  styleUrls: ['./clogin.component.css']
})
export class CloginComponent implements OnInit {
  email:string;
  postData : OwnerAccount = new OwnerAccount();
  login_nick: string = "";
  login_password: string = "";
  tmp: boolean;
  constructor(private cloginservice:CloginService,
              public dialog: MatDialog,
              private router: Router
) { }
  customerJwtService = new CustomerJwtService();
  openDialog(): void {
    let dialogRef = this.dialog.open(DialogselfComponent,
      {
        data:{email :this.email}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result ;
    });
  }
  openRegisterDialog(): void {
    let dialogRef = this.dialog.open(RegisterDialogselfComponent,
      {
        data:{email :this.email}
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.email = result;
    });
  }

  login(): void{
    this.postData.nick = this.login_nick;
    this.postData.password = this.login_password;
    console.log(this.postData);
    this.cloginservice.seeLogin(this.postData.nick,this.postData.password).subscribe(
      (resp=>{
      const keys = resp.headers.keys();
      console.log(resp);
      this.tmp = resp.body.success;
      if(this.tmp == true){
         alert("Congratulations,login successful!");
         let auth = resp.headers.get('Set-CAuth-Jwt');
         this.customerJwtService.getJwt(auth);
         console.log(localStorage.getItem('Set-CAuth-Jwt'));
         this.router.navigate(['index']);
         // location.href='index.html';
       }
       if(this.tmp == false) {
        if(resp.body.message=='blocked'){
          alert("Unfortunately,the user is blocked!");
        }
        else if(resp.body.message=='deleted'){
          alert("Unfortunately,no such user!");
        }
        else {
          alert("Unfortunately,failed because: " + resp.body.message);
        }
         localStorage.removeItem('Set-CAuth-Jwt');
       }
      }));
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-dialogself',
  templateUrl: './dialogself.component.html',
})
export class DialogselfComponent{

  constructor(
    private cloginservice: CloginService,
    public dialogRef: MatDialogRef<DialogselfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  input_phone: string;
  got_code: string;
  input_nick:string;
  input_password:string;
  send_verify_code2():void{
    console.log("send_verify_code2");
    this.cloginservice.get_verify_code(this.input_phone).subscribe((data) => {
      console.log(data);
      if(data.success == true){
        alert('send successful!');
      }
    });
  }
  changeP():void{
    this.cloginservice.changeP(this.input_nick,this.got_code,this.input_password).subscribe((data)=>{
      console.log(data)
      if(data.success == true){
        alert('successful!');
        this.dialogRef.close();
      }
    })
  }
}

@Component({
  selector: 'app-register_dialogself',
  templateUrl: './register_dialogself.component.html',
})
export class RegisterDialogselfComponent{

  constructor(
    private cloginservice: CloginService,
    public dialogRef: MatDialogRef<RegisterDialogselfComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  postRegisterData: CloginAccount=new CloginAccount();
  register_state: Loginstate=new Loginstate();
  register_nick:string = "";
  register_password:string = "";
  register_email:string = "";
  register_address:string = "";
  register_phone:string = "";
  register_verifyCode:string = "";
  nzOptions = option;

  /** ngModel value */
  public values: string[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);

  }

  register(): void{
    this.postRegisterData.nick=this.register_nick;
    this.postRegisterData.email=this.register_email;
    this.postRegisterData.password=this.register_password;
    this.postRegisterData.phone=this.register_phone;
    this.postRegisterData.verifyCode=this.register_verifyCode;
    this.postRegisterData.address="";
    for(let request of this.values){
      this.postRegisterData.address=this.postRegisterData.address+request+'/';
    }
    this.postRegisterData.address=this.postRegisterData.address+this.register_address;
    console.log(this.postRegisterData.address);
    this.cloginservice.tryregister(this.postRegisterData).pipe(first()).subscribe((data) => {
      console.log(data);this.register_state = data;
      if(this.register_state.success == true){
        alert("Congratulation, register successful!");
        this.dialogRef.close();
      }
      if(this.register_state.success == false)
        alert("Unfortunately, failed because: "+this.register_state.message);
    });
  }
  send_verify_code():void{
    console.log("send_verify_code");
    this.cloginservice.get_verify_code(this.register_phone).subscribe((data) => {
      console.log(data)
      if(data.success==true){
        alert("send successfully, please check your phone")
      }
    });
  }
}


