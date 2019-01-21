import { Component, OnInit } from '@angular/core';
import {LogOutService} from "../log-out/log-out.service";

@Component({
  selector: 'app-so-header',
  templateUrl: './so-header.component.html',
  styleUrls: ['./so-header.component.css']
})
export class SoHeaderComponent implements OnInit {

  constructor(
    private logOutService: LogOutService,
  ) { }

  ngOnInit() {

  }

  logout() {
    this.logOutService.logout();
  }

}
