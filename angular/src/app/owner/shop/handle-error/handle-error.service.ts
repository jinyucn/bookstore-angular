import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {LogOutService} from "../log-out/log-out.service";

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

  constructor(
    private logOutService:LogOutService,
  ) { }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // console.error(error); // log to console instead
      // alert("Login has expired, please login again.")
      // this.logOutService.logout();
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
