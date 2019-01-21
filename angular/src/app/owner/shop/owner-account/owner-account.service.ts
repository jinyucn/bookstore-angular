import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OwnerAccountService {

  constructor(
    private httpService: HttpService,
    private http: HttpClient
  ) { }
  getBalance():Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/balance/balance")
  }
  getHistory(): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/balance/history")
  }
  withdraw(withdrawM): Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/balance/withdraw",
      { absDelta: withdrawM}
      )
  }
  recharge(rechargeM): Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/balance/recharge",
      { absDelta: rechargeM}
    )
  }
  checkAd(index): Observable<any>{
    return this.http.get("http://47.106.108.89:9090/admin/AD/search/ad/id?id="+index,
      {
        headers: {
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
        }
      })
  }
}
