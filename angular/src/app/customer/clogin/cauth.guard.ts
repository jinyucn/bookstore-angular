import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CutomerGuard implements CanActivate {
  constructor(private  router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    if (localStorage.getItem('Set-CAuth-Jwt')) {
      return true;
    }
    this.router.navigate(['clogin']);
    return false;
  }
}
