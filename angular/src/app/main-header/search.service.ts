import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MainHeaderComponent } from './main-header.component';
import { SearchContent } from './search';
import { Cshopstate } from '../customer/cshop/cshopstate';
import { Cproductstate } from '../customer/cproduct/cproductstate';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor( private http: HttpClient) { }
  getSomeCshop(category: number, keyword: string): Observable<Cshopstate> {
    return this.http.get<Cshopstate>('http://47.106.108.89:8081/customer/shop/'+'search_shops?category='+category+'&keyword='+keyword);
  }
  getAllCshop(): Observable<Cshopstate> {
    /*console.log('http://47.106.108.89:8081/customer/shop/search_shops?category=-1&keyword=null');
    console.log('http://localhost:8081/customer/shop/search_shops?category=-1&keyword=null');*/
    return this.http.get<Cshopstate>('http://47.106.108.89:8081/customer/shop/search_shops?category=-1&keyword=none');
  }
  getSomeCproduct(category: number, keyword: string): Observable<Cproductstate> {
    return this.http.get<Cproductstate>('http://47.106.108.89:8081/customer/merchandise/'+'search_merchandises?category='+category+'&keyword='+keyword);
  }
  getAllCproduct(): Observable<Cproductstate> {
    return this.http.get<Cproductstate>('http://47.106.108.89:8081/customer/merchandise/search_merchandises?category=-1&keyword=none');
  }

}
