import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class IncomeManageService {

  constructor(
    private httpService: HttpService
  ) { }
  url;
  getIncome(idAll): Observable<any>{
    this.url = "orderId="+idAll[0];
    for(var i =1;i<idAll.length;i++){
      this.url=this.url+"&"+"orderId="+idAll[i]
    }
    console.log(this.url)
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/detail?"+this.url)
  }

  getOrderOne(id:number): Observable<any> {
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/"+id);
  }

  getDeliveredOrders():Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/delivered");
  }

  getCommissionRate():Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:9090/admin/commission/rate");
  }

}
