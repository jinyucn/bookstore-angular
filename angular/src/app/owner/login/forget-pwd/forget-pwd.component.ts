import {Component, Inject, OnInit} from '@angular/core';
import {CloginService} from "../../../customer/clogin/clogin.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../../../customer/clogin/clogin.component";
import { LoginService} from "../login.service";

@Component({
  selector: 'app-forget-pwd',
  templateUrl: './forget-pwd.component.html',
  styleUrls: ['./forget-pwd.component.css']
})
export class ForgetPwdComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    public dialogRef: MatDialogRef<ForgetPwdComponent>,
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
    this.loginService.get_verify_code(this.input_phone).subscribe((data) => {
      console.log(data);
      if(data.success == true){
        alert('send successful!')
      }
    });
  }
  changeP():void{
    this.loginService.changeP(this.input_nick,this.got_code,this.input_password).subscribe(
      (data) => {
        console.log(data)
        if (data.success == true) {
          alert('reset successful')
        }
      })

    }




  ngOnInit() {
  }

}
