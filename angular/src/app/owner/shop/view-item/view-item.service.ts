import { Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of} from "rxjs";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: "root"
})

export class ViewItemService {
  constructor(
    private httpService: HttpService,

  ){}

  url="http://47.106.108.89:8086/owner/merchandise/";

   getProductList(): Observable<any> {
    return this.httpService.httpGet("http://47.106.108.89:8086/owner/merchandise/list");
  }
   editProduct(title: string, price: number,picFilename: string,id:number): Observable<any>{
    return this.httpService.httpPut(this.url+id,
      {
        title: title,
        price: price,
        picFilename: picFilename,
        id: id
      })
   }

  deleteProduct(id:number): Observable<any>
  {
    console.log(id);
    return this.httpService.httpDelete(this.url+id);
  }
}
