import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HandleErrorService} from '../../owner/shop/handle-error/handle-error.service';
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomerHttpService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
  ) { }

  httpGet(url:string):Observable<any>{
    return this.http.get(url,
      {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
        }),
        observe:'response'
      }).pipe(
      catchError(this.handleErrorService.handleError('get', []))
    )
  }

  httpPost(url:string,body:any):Observable<any>{
    return this.http.post<any>(url, body,{
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': "*",
        'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
      }),
      observe:'response'
    }).pipe(
      catchError(this.handleErrorService.handleError('post', []))
    )
  }

  httpPut(url:string,body:any):Observable<any>{
    return this.http.put<any>(url, body,{
      headers: new HttpHeaders({
        'Content-Type': "application/json",
        'Access-Control-Allow-Origin': "*",
        'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
      }),
      observe:'response'
    }).pipe(
      catchError(this.handleErrorService.handleError('put', []))
    )
  }

  httpDelete(url:string):Observable<any>{
    return this.http.delete(url,
      {
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          'CAuth-Jwt': localStorage.getItem('Set-CAuth-Jwt'),
        }),
        observe:'response'
      }).pipe(
      catchError(this.handleErrorService.handleError('delete', []))
    )
  }
}

