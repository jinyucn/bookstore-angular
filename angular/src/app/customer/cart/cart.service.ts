import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of} from 'rxjs';
import { Cartdeletestate } from './Cartdeletestate';
import { Cproductstate } from './Cartstate';
import { Responsestate } from './Responsestate';
import {CartContent, OrderNotPaid} from './cart';
import {CustomerHttpService} from '../Customer-http/customer-http.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient,private customerhttp:CustomerHttpService) { }
  url="http://47.106.108.89:8081/customer/";
  localurl="http://47.106.108.89:8081/customer/";
  GetAllCart(): Observable<any> {
    /*console.log(localStorage.getItem('Set-CAuth-Jwt'));*/
    return this.customerhttp.httpPost(this.url+"cart/showall",
      {});
    // return this.http.post<Cproductstate>(
    //   this.url+"cart/showall",
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

  RemoveCart(cartid: number): Observable<any> {
    return this.customerhttp.httpPost(this.url + "cart/delete?merchandise_id=" + cartid.toString(),
      {});
    // return this.http.post<Cartdeletestate> (
    //   this.url + "cart/delete?merchandise_id=" + cartid.toString(),
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
  Checkout(carts: CartContent[], Address: string,Name:string,Phone:string): Observable<any> {
    return this.customerhttp.httpPost(this.localurl + "order/create",
      {list: carts, address: Address,name:Name,phone:Phone});
    // return this.http.post<Responsestate> (
    //   this.url + "order/create",
    //   {list: carts, address: Address},
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': "application/json;charset=UTF-8",
    //       'Access-Control-Allow-Origin': "*",
    //       'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //     })
    //   }
    // )
  }
  payNow(order): Observable<any>{
    return this.customerhttp.httpPost(this.url+"order/paid",
      {
        list: order
      });
    // return this.http.post(
    //   this.url+"order/paid",
    //     {
    //      list: order
    //     },{
    //     headers: new HttpHeaders({
    //       'Content-Type': "application/json;charset=UTF-8",
    //       'Access-Control-Allow-Origin': "*",
    //       'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
    //     })
    //   }
    // )
    }

}
