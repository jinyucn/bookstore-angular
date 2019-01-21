import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {OwnerAccount} from "../../owner/login/login";
import {CloginAccount} from './clogin';
import {Loginstate} from './loginstate';
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CloginService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  private loginURL: string='http://47.106.108.89:8081/customer/account/login';
  private loginURL1: string='http://47.106.108.89:8081/customer/account/login';
  private registerURL: string='http://47.106.108.89:8081/customer/account/register';
  private EasyRegister: string='http://47.106.108.89:8081/customer/account/JOzIhTFw6gRUtkZ5';
  login_state;
  constructor(private http: HttpClient,) { }
  // trylogin(data: OwnerAccount) : Observable<Loginstate> {
  //   console.log(data);
  //   return this.http.post<Loginstate>(this.loginURL,data,this.httpOptions);
  // }
  /*
  seeLogin(data:OwnerAccount): Observable<any> {
    return this.http.post<{token: string}>(this.loginURL, {nick:data.nick,password: data.password})
      .pipe(
        map(result => {
          localStorage.setItem('Set-CAuth-Jwt', result.token);
          console.log(result);
          console.log(localStorage.getItem('Set-CAuth-Jwt'));
          this.login_state = result;
          return this.login_state;
        })
      );
      */
  seeLogin(nick:string,password:string): Observable<HttpResponse<any>>{
    return this.http.post(this.loginURL, {nick:nick,password:password},
      {observe:'response'});
  }

  logout(){
    localStorage.removeItem('Set-CAuth-Jwt');
  }
  get_verify_code(phone:string): Observable<any>{
    console.log("into service.ts to get verify code");
      return this.http.get('http://47.106.108.89:8081/customer/sms/send/phone?phone='+phone );
  }
  tryregister(data:CloginAccount): Observable<Loginstate>{
    console.log("into service.ts to register");
    return this.http.post<Loginstate>(this.registerURL,data,this.httpOptions);
  }
  changeP(nick:string,code:string,password:string): Observable<any>{
    return this.http.post('http://47.106.108.89:8081/v2/customer/forget/apply',
      {nick:nick,code:code,password:password},this.httpOptions)
  }
}
