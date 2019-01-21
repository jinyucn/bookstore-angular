import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class AdService {

  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': "application/json",
      'Access-Control-Allow-Origin': "*",
      'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
    })
  };

  constructor(
    private http: HttpClient,
    private httpService: HttpService,
  ) { }

  changePrice(requestId,newPrice,adType):Observable<any>{
    return this.http.post<any>("http://47.106.108.89:9090/admin/AD/request/update/price?requestId="+requestId+"&price="+newPrice+"&adType="+adType,{})
  }

  getMerchaniseList():Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/merchandise/list")
  }

  putTopShop(str):Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/shop/top",str)
  }

  getTopShop():Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/shop/top")
  }

  getShopId(){
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/shop")
  }

  addShopAd(shopId,stitle,sdescription,sprice,simage):Observable<any>{
    return this.http.post<any>("http://47.106.108.89:9090/admin/AD/add/s",
      {shopId:shopId,
        tittle:stitle,
        content:sdescription,
        price:sprice,
        image:simage},
      this.httpOption)
  }

  addProdAd(shopId,ptitle,pdescription,pprice,pimage,productId):Observable<any>{
    return this.http.post<any>("http://47.106.108.89:9090/admin/AD/add/p",
      {shopId:shopId,
        tittle:ptitle,
        content:pdescription,
        price:pprice,
        image:pimage,
        productId:productId},
      this.httpOption)
  }

  getShopAdRequest():Observable<any>{
    return this.http.get<any>("http://47.106.108.89:9090/admin/AD/list/requests/s",this.httpOption);
  }

  getProdAdRequest():Observable<any>{
    return this.http.get<any>("http://47.106.108.89:9090/admin/AD/list/requests/p",this.httpOption);
  }

  getShopAdHistory(shopId):Observable<any>{
    return this.http.get<any>("http://47.106.108.89:9090/admin/AD/history/requests?id="+shopId+"&adType=SHOP_AD",this.httpOption)
  }

  getProdAdHistory(shopId):Observable<any>{
    return this.http.get<any>("http://47.106.108.89:9090/admin/AD/history/requests?id="+shopId+"&adType=PRODUCT_AD",this.httpOption)
  }

  getProdById(prodId){
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/merchandise/"+prodId);
  }


}
