import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Shopwish } from './shopwish';
import { Shopdeletestate } from './shopdelete';
import { Productwish } from './productwish';
import {CustomerHttpService} from '../Customer-http/customer-http.service';
import {catchError} from 'rxjs/operators';
import {HandleErrorService} from '../../owner/shop/handle-error/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class CmywishService {
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': "application/json;charset=UTF-8",
      'Access-Control-Allow-Origin': "*",
      'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    })
  }
  url="http://47.106.108.89:8081/customer/";
  constructor( private http: HttpClient,private customerhttp:CustomerHttpService,
               private handleErrorService:HandleErrorService) { }
  GetWishShop(): Observable<any> {
    /*console.log(localStorage.getItem('Set-CAuth-Jwt'));*/
    return this.customerhttp.httpPost(this.url+"shopwish/showall", {});
    // return this.http.post<Shopwish>(this.url+"shopwish/showall", {},{
    //   headers: new HttpHeaders({
    //     'Content-Type': "application/json;charset=UTF-8",
    //     'Access-Control-Allow-Origin': "*",
    //     'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //   })
    // })
  }
  RemoveWishShop(shopid: number): Observable<any> {
    return this.customerhttp.httpPost(this.url + "shopwish/delete?shop_id="+shopid.toString(),{});
    // return this.http.post<Shopdeletestate> (
    //   this.url + "shopwish/delete?shop_id="+shopid.toString(),
    //   {},
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': "application/json;charset=UTF-8",
    //       'Access-Control-Allow-Origin': "*",
    //       'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //     })
    //   }
    // )
  }
  GetWishProduct(): Observable<any> {
    return this.customerhttp.httpPost(this.url + "merwish/showall",
      {});
    // return this.http.post<Productwish>(
    //   this.url + "merwish/showall",
    //   {},
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': "application/json;charset=UTF-8",
    //       'Access-Control-Allow-Origin': "*",
    //       'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //     })
    //   }
    // )
  }
  RemoveWishProduct(productid: number): Observable<any> {
    return this.customerhttp.httpPost(this.url + "merwish/delete?merchandise_id="+productid.toString(),
      {});
  }
}
