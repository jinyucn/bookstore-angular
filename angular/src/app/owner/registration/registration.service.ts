import { Injectable } from '@angular/core';
import {OwnerRegisterAccount} from "./registration";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(
    private http: HttpClient,
  ) { }

  httpOptions = {
    headers:  new HttpHeaders({
      'Content-Type': 'application/json',})
  }

  private registerURL: string='http://47.106.108.89:8086/owner/account/register';

  private easyRegisterURL: string='http://47.106.108.89:8086/owner/account/JOzIhTFw6gRUtkZ5';

  getResponse(nick:string,password:string): Observable<HttpResponse<any>>{
    return this.http.post(this.easyRegisterURL,{nick:nick,password:password},{ observe:'response'});

  }

  get_verify_code(phone:string): Observable<any>{
    console.log("into service.ts");
    return this.http.get('http://47.106.108.89:8086/owner/sms/send/phone/?phone='+phone);
  }
  tryRegister(data:OwnerRegisterAccount): Observable<any>{
    console.log("into service.ts to register");
    return this.http.post<OwnerRegisterAccount>(this.registerURL,data,this.httpOptions);
    // return this.http.post<OwnerRegisterAccount>(this.easyRegisterURL,data,this.httpOptions);
  }
}
