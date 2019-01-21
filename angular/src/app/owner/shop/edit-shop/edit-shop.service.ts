import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class EditShopService {

  constructor(
    private httpService: HttpService,
  ) { }
  seeShop(): Observable<any>{
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/shop");
  }
  editShop(phone,address,email): Observable<any>{
    return this.httpService.httpPut("http://47.106.108.89:8086/owner/shop",
      {newAddress: address,
             newPhone: phone,
             newEmail: email})
  }

}
