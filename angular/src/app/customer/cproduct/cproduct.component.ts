import { Component, OnInit } from '@angular/core';
import { CproductService } from './cproduct.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {CloginAccount} from '../clogin/clogin';
import {CproductContent} from './cproduct';
import { Cproductstate } from './cproductstate';
import { SearchService } from '../../main-header/search.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CshopService } from '../cshop/cshop.service';
import { Oneshopstate } from './oneshopstate';
import { ShareService } from './share.service';

@Component({
  selector: 'app-cproduct',
  templateUrl: './cproduct.component.html',
  styleUrls: ['./cproduct.component.css']
})
export class CproductComponent implements OnInit {
  arr: string[] = ["TV & Home Theater", "Computers & Tablets", "Cell Phones", "Cameras & Camcorders", "Audio", "Car Electronics & GPS", "Video, Games, Movies & Music", "Health, Fitness & Sports", "Home & Office"];
  category: number;
  keyword: string;
  tmp: boolean;
  tmp2: boolean;
  shopid: number;
  shopname: string;
  cando: boolean;
  cproductstate: Cproductstate = new Cproductstate();
  topstate: Cproductstate = new Cproductstate();
  oneshopstate: Oneshopstate;
  constructor(
    private cproductService: CproductService,
    private searchService: SearchService,
    private cshopService: CshopService,
    private route: ActivatedRoute,
    private location: Location,
    private shareService: ShareService
  ) { }

  ngOnInit() {
    this.oneshopstate = new Oneshopstate();
    this.tmp = this.route.snapshot.paramMap.has('category');
    /*console.log(this.tmp);*/
    if(this.tmp == false) {
      this.tmp2 = this.route.snapshot.paramMap.has('shopid');
      if(this.tmp2 == false) {
        this.getAllCproduct();
      }
      if(this.tmp2 == true) {
        this.cando = false;
        this.getShopidname();
        this.getShopCproduct();
        this.getTopCproduct();
      }
    }
    if(this.tmp == true) {
      this.getParam();
      this.getSomeCproduct();
    }
  }

  getShopidname(): void {
    /*this.shopname = this.route.snapshot.paramMap.get('shopname');*/
    console.log('now');
    this.shopid = +this.route.snapshot.paramMap.get('shopid');
    this.getOneshop(this.shopid);
  }

  getParam(): void {
    this.category = +this.route.snapshot.paramMap.get('category');
    this.keyword = this.route.snapshot.paramMap.get('keyword');
    /*console.log(this.category.toLocaleString()+this.keyword.toString());*/
  }

  getShopCproduct(): void {
    this.cproductService.getShopCproduct(this.shopid).subscribe(cproductstate => this.cproductstate = cproductstate);
  }

  getTopCproduct(): void {
    this.cproductService.getTopCproduct(this.shopid).subscribe(topstate => {
      this.topstate = topstate;
      console.log(this.topstate);
    });
  }

  getAllCproduct(): void {
    this.searchService.getAllCproduct().subscribe(cproductstate => this.cproductstate = cproductstate);
  }

  getSomeCproduct(): void {
    /*console.log(this.category + this.keyword);*/
    this.searchService.getSomeCproduct(this.category, this.keyword).subscribe(cproductstate => this.cproductstate = cproductstate);
  }

  getOneshop(shopid: number): void {
    this.cproductService.getOneshop(shopid).subscribe(oneshopstate => {
      this.oneshopstate = oneshopstate;
      this.cando = true;
    });
  }

  AddWish(shopid: number): void {
    this.cshopService.AddWishShop(shopid).subscribe(addwishstate => {
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

  AddWish2(productid: number): void {
    this.cproductService.AddWishProduct(productid).subscribe(addwishstate => {
      let auth = addwishstate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        if (addwishstate.body.success == true) {
          alert('Add successful!');
          this.shareService.componentOneFn();
        }
        else {
          alert('Something wrong! You have already add it.');
        }

    });
  }

  AddToCart(productid: number): void {
    this.cproductService.AddToCart(productid).subscribe(addwishstate => {
      let auth = addwishstate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        if (addwishstate.body.success == true) {
          alert('Add successful!');
          /*this.shareService.componentOneFn();*/
        }
        else {
          alert('Something wrong! You have already add it.');
        }

    })
  }
}
