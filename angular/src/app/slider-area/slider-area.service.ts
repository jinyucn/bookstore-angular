import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductAdState } from './Ads';
import { ShopAdState } from './Ads';

@Injectable({
  providedIn: 'root'
})
export class SliderAreaService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  url="http://47.106.108.89:9090/admin/AD/list/ads/";
  constructor( private http: HttpClient) { }
  GetAllProductAd(): Observable<ProductAdState> {
    return this.http.get<ProductAdState>(this.url + 'p');
  }
  GetAllShopAd(): Observable<ShopAdState> {
    return this.http.get<ShopAdState>(this.url + 's');
  }
  getHomeShopAd(){
    return this.http.get<any>(this.url + 's');
  }
}
