import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cshopstate } from './cshopstate';
import { Cproductstate } from '../cproduct/cproductstate';
import { Addwishstate } from './addwish';
import {CustomerHttpService} from '../Customer-http/customer-http.service';

@Injectable({
  providedIn: 'root'
})
export class CshopService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  url="http://47.106.108.89:8081/customer/";
  constructor( private http: HttpClient,private customerhttp:CustomerHttpService) { }
  AddWishShop(shopid: number): Observable<any> {
    console.log(localStorage.getItem('Set-CAuth-Jwt'));
    return this.customerhttp.httpPost(this.url + "shopwish/create?shop_id="+shopid.toString(),
      {});
    // return this.http.post<Addwishstate>(
    //   this.url + "shopwish/create?shop_id="+shopid.toString(),
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
  getShopCproduct(shopid: number): Observable<Cproductstate> {
    return this.http.get<Cproductstate>(this.url + 'merchandise/get_merchandise_by_shop?shop_id=' + shopid);
  }
}
