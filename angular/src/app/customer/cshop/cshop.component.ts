import { Component, Inject, OnInit } from '@angular/core';
import { CshopService } from './cshop.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CloginAccount} from '../clogin/clogin';
import {CshopContent} from './cshop';
import { Cshopstate } from './cshopstate';
import { SearchService } from '../../main-header/search.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cshop',
  templateUrl: './cshop.component.html',
  styleUrls: ['./cshop.component.css']
})
export class CshopComponent implements OnInit {
  arr: string[] = ["TV & Home Theater", "Computers & Tablets", "Cell Phones", "Cameras & Camcorders", "Audio", "Car Electronics & GPS", "Video, Games, Movies & Music", "Health, Fitness & Sports", "Home & Office"];
  realcategory: string;
  category: number;
  keyword: string;
  tmp: boolean;
  cshopstate: Cshopstate = new Cshopstate();
  constructor(
    private cshopService: CshopService,
    private searchService: SearchService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    this.tmp = this.route.snapshot.paramMap.has('category');
    console.log( this.tmp);
    if(this.tmp == false) {
      this.getAllCshop();
    }
    if(this.tmp == true) {
      this.getParam();
      this.getSomeCshop();
    }
  }

  getParam(): void {
    this.category = +this.route.snapshot.paramMap.get('category');
    this.keyword = this.route.snapshot.paramMap.get('keyword');
    /*console.log(this.category.toLocaleString()+this.keyword.toString());*/
  }

  getAllCshop(): void {
    this.searchService.getAllCshop().subscribe(cshopstate => this.cshopstate = cshopstate);
  }

  getSomeCshop(): void {
    /*console.log(this.category + this.keyword);*/
    this.searchService.getSomeCshop(this.category, this.keyword).subscribe(cshopstate => this.cshopstate = cshopstate);
  }

  getShopname(shopname: string): string {
    return shopname;
  }

  AddWish(shopid: number): void {
    this.cshopService.AddWishShop(shopid).subscribe(addwishstate => {
      console.log(addwishstate);
      let auth = addwishstate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        if (addwishstate.body.success == true) {
          alert('Add successful!');
        }
        else {
          alert('Something wrong! You have already add it.');
        }

    });
  }
}
