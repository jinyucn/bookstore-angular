import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderNowList } from './orderstate';
import {CustomerHttpService} from '../Customer-http/customer-http.service';


@Injectable({
  providedIn: 'root'
})
export class OrderlistService {

  url="http://47.106.108.89:8081/customer/";
  localurl='http://47.106.108.89:8081/customer/';
  constructor( private http: HttpClient,private customerhttp:CustomerHttpService) { }

  GetNowOrder(): Observable<any> {
    return this.customerhttp.httpGet(this.url + 'order/get');
    // return this.http.get<OrderNowList> (
    //   this.url + 'order/get',
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': "application/json;charset=UTF-8",
    //       'Access-Control-Allow-Origin': "*",
    //       'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //     })
    //   }
    // )
  }
  GetSomeOrder(keyword: string): Observable<any> {
    return this.customerhttp.httpGet(this.url + 'order/search?keyword='+keyword);
  }
  ConfirmReceive(Order_id:number): Observable<any>{
    return this.customerhttp.httpPost(this.localurl+'order/receive',{order_id:Order_id});
  }

}
