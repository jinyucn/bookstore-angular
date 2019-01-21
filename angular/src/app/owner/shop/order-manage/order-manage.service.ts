import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class OrderManageService {

  constructor(
    private httpService: HttpService,
  ) { }

  getOrderOne(id:number): Observable<any> {
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/"+id);
  }
  getOrderList(): Observable<any> {
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/all");
  }
  putShipment(id,companyId): Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/order/"+id+"/deliver",
      {deliverServiceProviderId:companyId});
  }
  search(keyword): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/search?keyword="+keyword)
  }
  dateFilter(a,b,c): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/all/duration?unit="+a+"&offset="+b+"&interval="+c)
  }
  getOrderSome(index): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/"+index)
  }
  getOrderDelivered(): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/order/list/delivered")
  }
  putPrepare(id):Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/order/"+id+"/deliver",
      {deliverServiceProviderId: 0});
  }

}
