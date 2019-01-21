import { Injectable, Injector } from '@angular/core';
import { Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse,} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private statusURL: string = 'http://47.106.108.89:8086/owner/account/info';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': "application/json;charset=UTF-8",
      'Access-Control-Allow-Origin': "http://localhost/4200",
    })
  };

  constructor(
    private http: HttpClient,
    ) { }

    private loginURL: string = 'http://47.106.108.89:8086/owner/account/login';


  getResponse(nick:string,password:string): Observable<HttpResponse<any>>{
    return this.http.post(this.loginURL,{nick:nick,password:password},{ observe:'response'});

  }
  get_verify_code(phone:string): Observable<any>{
    console.log("into service.ts");
    return this.http.get('http://47.106.108.89:8086/owner/sms/send/phone/?phone='+phone);
  }

  logout() {
    localStorage.removeItem('Set-Auth-Jwt');
  }
  changeP(nick:string,code:string,password:string): Observable<any>{
    return this.http.post('http://47.106.108.89:8086/v2/owner/forget/apply',
      {nick:nick,code:code,password:password},{
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': "*",})
      })
  }


  // tryLogin(params: string): void{
  //   var values = params.split('&');
  //   if(values.length<2) return;
  //
  //   var username = values[0];
  //   var password = values[1];
  //
  //   var url = this.loginURL;
  //
  //   this.http.post(url, {
  //     params: {
  //       nick: username,
  //       password: password
  //     }
  //   }, {
  //
  //   }).subscribe(res=>{
  //     window.alert("login success");
  //   });
  // }

}
