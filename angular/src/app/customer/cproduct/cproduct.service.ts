import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cproductstate } from './cproductstate';
import { Oneshopstate } from './oneshopstate';
import { Addwishstate } from '../cshop/addwish';
import {CustomerHttpService} from '../Customer-http/customer-http.service';

@Injectable({
  providedIn: 'root'
})
export class CproductService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor( private http: HttpClient,private customerhttp:CustomerHttpService) { }
  private CproductURL: string = 'http://47.106.108.89:8081/customer/merchandise/get_all';
  url="http://47.106.108.89:8081/customer/";

  getShopCproduct(shopid: number): Observable<Cproductstate> {
    return this.http.get<Cproductstate>(this.url + 'merchandise/get_merchandise_by_shop?shop_id=' + shopid);
  }

  getTopCproduct(shopid: number): Observable<Cproductstate> {
    return this.http.get<Cproductstate>(this.url + 'merchandise/get_top_merchandise?shop_id=' + shopid);
  }

  getOneshop(shopid: number): Observable<Oneshopstate> {
    return this.http.get<Oneshopstate>(this.url + 'shop/get_shop_by_shop_id?shop_id=' + shopid);
  }

  AddWishProduct(productid: number): Observable<any> {
    /*console.log(localStorage.getItem('Set-CAuth-Jwt'));*/
    return this.customerhttp.httpPost(this.url + "merwish/create?merchandise_id=" + productid.toString(),
      {});
    // return this.http.post<Addwishstate>(
    //   this.url + "merwish/create?merchandise_id=" + productid.toString(),
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

  AddToCart(productid: number): Observable<any> {
    return this.customerhttp.httpPost(this.url + "cart/create?merchandise_id=" + productid.toString(),
      {});
    // return this.http.post<Addwishstate> (
    //   this.url + "cart/create?merchandise_id=" + productid.toString(),
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
}
