import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of} from "rxjs";
import {ShopItemInfo} from "./add-item";
import {catchError} from "rxjs/operators";
import {tokenGetter} from "../../../app.module";
import {HttpService} from "../http-service/http.service";


@Injectable({
  providedIn: "root"
})

export class AddItemService {
  constructor(
    private httpService: HttpService,
  ){}

  url="http://47.106.108.89:8086/owner/merchandise";

  sendApplication(id:number, price:number, picFilename:string, title:string):Observable<any>{
    return this.httpService.httpPost(this.url,
         {id:id,
                price:price,
                picFilename:picFilename,
                title:title});

  }

}
