import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Shopwish } from './shopwish';
import { CmywishService } from './cmywish.service';
import { Shopdeletestate } from './shopdelete';
import { Productwish } from './productwish';
import {Routes, RouterModule} from '@angular/router';

@Component({
  selector: 'app-cmywish',
  templateUrl: './cmywish.component.html',
  styleUrls: ['./cmywish.component.css']
})
export class CmywishComponent implements OnInit {
  shopdeletestate: Shopdeletestate = new Shopdeletestate();
  shopwish: Shopwish = new Shopwish();
  productwish: Productwish = new Productwish();
  cando: boolean;
  arr: string[] = ["TV & Home Theater", "Computers & Tablets", "Cell Phones", "Cameras & Camcorders", "Audio", "Car Electronics & GPS", "Video, Games, Movies & Music", "Health, Fitness & Sports", "Home & Office"];
  category: string;
  isshop: boolean;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private wishservice: CmywishService,
  ) { }

  ngOnInit() {
    this.category = this.route.snapshot.paramMap.get('category');
    if(this.category == 'shop') {
      this.isshop = true;
      this.GetWishShop();
    }
    if(this.category == 'product') {
      this.isshop = false;
      this.GetWishProduct();
    }
    this.cando = true;
    /*console.log(this.isshop);*/
  }

  GetWishShop(): void {
    this.wishservice.GetWishShop().subscribe(shopwish => {
      let auth = shopwish.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      console.log(shopwish);
      this.shopwish = shopwish.body;
    });
  }

  RemoveWishShop(shopid: number): void {
    this.wishservice.RemoveWishShop(shopid).subscribe(shopdeletestate => {
      let auth = shopdeletestate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        alert('Delete successful!');
        /*window.location.reload();*/
       this.GetWishShop();
    });
  }

  GetWishProduct(): void {
    this.wishservice.GetWishProduct().subscribe(productwish => {
      let auth = productwish.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      this.productwish = productwish.body;
    });
  }

  RemoveWishProduct(productid: number): void {
    this.wishservice.RemoveWishProduct(productid).subscribe(productdeletestate => {
      let auth = productdeletestate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
      alert('Delete successful!');
      this.GetWishProduct();
    })
  }

  Click(): void {
    this.category = this.route.snapshot.paramMap.get('category');
    if(this.category == 'shop') {
      this.isshop = false;
      this.GetWishProduct();
    }
    if(this.category == 'product') {
      this.isshop = true;
      this.GetWishShop();
    }
  }

  cancel(): void {

  }
  sayhello(): void {
    console.log('hello');
  }
}
