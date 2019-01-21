import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: 'root'
})
export class ShopInfoService {

  private statusURL: string = 'http://47.106.108.89:8086/owner/account/info';

  constructor(
    private httpService:HttpService,
  ) { }

  getStatus(): Observable<any>{
    return this.httpService.httpGet(this.statusURL);
  };

}
