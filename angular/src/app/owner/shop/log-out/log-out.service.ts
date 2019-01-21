import { Injectable } from '@angular/core';
import {LoginService} from "../../login/login.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(['login']);
    localStorage.removeItem('Set-Auth-Jwt')
    let test = localStorage.getItem('Set-Auth-Jwt')
    console.log(test)
  }
}
