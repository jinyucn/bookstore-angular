import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {HandleErrorService} from "../handle-error/handle-error.service";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {LogOutService} from "../log-out/log-out.service";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService,
    private jwtHelperService: JwtHelperService,
    private logoutService: LogOutService,
  ) { }

  httpGet(url:string):Observable<any>{
    if(this.jwtHelperService.tokenGetter() && this.jwtHelperService.isTokenExpired()){
      alert("Login has expired, please login again.");
      this.logoutService.logout();
    }
    else{
      // console.log(this.jwtHelperService.getTokenExpirationDate());
      return this.http.get(url,
        {
          headers: new HttpHeaders({
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': "*",
            'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
          }),
          observe:'response'
        }).pipe(
        catchError(this.handleErrorService.handleError('get', []))
      )
    }
  }

  httpPost(url:string,body:any):Observable<any>{
    if(this.jwtHelperService.tokenGetter() && this.jwtHelperService.isTokenExpired()){
      alert("Login has expired, please login again.");
      this.logoutService.logout();
    }
    else{
      return this.http.post<any>(url, body,{
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
        }),
        observe:'response'
      }).pipe(
        catchError(this.handleErrorService.handleError('post', []))
      )
    }
  }

  httpPut(url:string,body:any):Observable<any>{
    if(this.jwtHelperService.tokenGetter() && this.jwtHelperService.isTokenExpired()){
      alert("Login has expired, please login again.");
      this.logoutService.logout();
    }
    else{
      return this.http.put<any>(url, body,{
        headers: new HttpHeaders({
          'Content-Type': "application/json",
          'Access-Control-Allow-Origin': "*",
          'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
        }),
        observe:'response'
      }).pipe(
        catchError(this.handleErrorService.handleError('put', []))
      )
    }
  }

  httpDelete(url:string):Observable<any>{
    if(this.jwtHelperService.tokenGetter() && this.jwtHelperService.isTokenExpired()){
      alert("Login has expired, please login again.");
      this.logoutService.logout();
    }
    else{
      return this.http.delete(url,
        {
          headers: new HttpHeaders({
            'Content-Type': "application/json",
            'Access-Control-Allow-Origin': "*",
            'Auth-Jwt': localStorage.getItem('Set-Auth-Jwt'),
          }),
          observe:'response'
        }).pipe(
        catchError(this.handleErrorService.handleError('delete', []))
      )
    }

  }
}
