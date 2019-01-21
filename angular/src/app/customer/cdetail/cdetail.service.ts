import { Injectable } from '@angular/core';
import {Observable} from "rxjs/index";
import {Cproductattr} from "./CproductAttr";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {CustomerHttpService} from '../Customer-http/customer-http.service';
import {WrapperCom} from './WrapComments';

@Injectable({
  providedIn: 'root'
})
export class CdetailService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient,private customerhttp:CustomerHttpService) { }
  getProductAttr(id: number): Observable<any> {
    //return this.customerhttp.httpGet('http://47.106.108.89:8081/customer/merchandise/get_merchandise_by_merchandise_id?merchandise_id=' + id);
    return this.http.get<Cproductattr>('http://47.106.108.89:8081/customer/merchandise/get_merchandise_by_merchandise_id?merchandise_id=' + id);
  }
  getComment(id: number): Observable<WrapperCom>{
    return this.http.get<WrapperCom>('http://47.106.108.89:8081/customer/merchandise/get_comments?merchandise_id=' + id);
  }
}
