import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerJwtService {

  constructor() { }
  getJwt(cauth) {
    localStorage.setItem('Set-CAuth-Jwt', cauth);

  }
}
