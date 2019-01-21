import { Injectable } from '@angular/core';
import {CustomerHttpService} from '../Customer-http/customer-http.service';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {OrderProduct} from './orderproduct';
import {catchError} from 'rxjs/operators';
import {HandleErrorService} from '../../owner/shop/handle-error/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class OrderdetailService {

  url="http://47.106.108.89:8081/customer/merchandise/create_comment";
  url2="http://47.106.108.89:8081/customer/order/details"
  constructor(private cutomerhttp:CustomerHttpService,private http: HttpClient,
              private handleErrorService: HandleErrorService) { }
  createComments(Order_id:number,Merchandise_id:number,Content:string,Rating:number): Observable<any>{
    return this.cutomerhttp.httpPost(this.url,{
      order_id:Order_id,merchandise_id:Merchandise_id,content:Content,rating:Rating
    });
  }
  GetOrderDetail(Order_id: number): Observable<any> {
    return this.cutomerhttp.httpPost(this.url2,{
      order_id: Order_id
    });
  }
}
