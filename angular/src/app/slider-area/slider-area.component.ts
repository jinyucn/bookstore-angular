import {Component, Input, OnInit} from '@angular/core';
import { ProductAdState } from './Ads';
import { SliderAreaService } from './slider-area.service';
import { ProductAdContent } from './Ads';
import { ShopAdContent } from './Ads';
import { ShopAdState } from './Ads';
import { window } from "@angular/platform-browser/src/browser/tools/browser";


@Component({
  selector: 'app-slider-area',
  templateUrl: './slider-area.component.html',
  styleUrls: ['./slider-area.component.css']
})
export class SliderAreaComponent implements OnInit {
  cando1: boolean;
  cando2: boolean = true;
  numsofproductad: number;
  numsofshopad: number;
  productadstate: ProductAdState = new ProductAdState();
  shopadstate: ShopAdState = new ShopAdState();
  count: number;
  countt:number;
  // count2: number;
  cnt15: number;
  shopAds:string[] = [];
  constructor(
    private sliderareaservice: SliderAreaService
  ) { }

  ngOnInit() {
    // this.count2 = -1;
    this.cnt15 = -1;
    this.GetAllProductAd();
    this.GetAllShopAd();
    // this.changepic();
    this.changepic2();
    this.showHomeShopAd()
  }
  showHomeShopAd(){
    this.sliderareaservice.getHomeShopAd().subscribe(resp=>{
      console.log(resp);
      if(resp.status == 200){
        this.shopAds = resp.data;
        console.log(this.shopAds);
        console.log(this.cando2);
      }
      else{
        console.log(resp.message);
      }

    })
  }
  GetAllProductAd(): void {
    this.sliderareaservice.GetAllProductAd().subscribe(productadstate => {
      if(productadstate.data){
        this.productadstate = productadstate;
        this.numsofproductad = this.productadstate.data.length;
        this.count = this.productadstate.data.length;
        /*console.log(this.productadstate.data);
        console.log(this.cando1);
        console.log(this.numsofproductad);*/
        while(this.numsofproductad < 10) {
          var newItem: ProductAdContent = new ProductAdContent();
          newItem.id = 10000;
          newItem.price = 0;
          newItem.tittle = '-';
          newItem.image = 'bcf450fa19d24ac79b991b0f0b2870aa.jpg';
          this.productadstate.data.push(newItem);
          this.numsofproductad += 1;
        }
        this.cando1 = true;
      }
    });
  }

  GetAllShopAd(): void {
    this.sliderareaservice.GetAllShopAd().subscribe(shopadstate => {
      this.shopadstate = shopadstate;
      this.numsofshopad = this.shopadstate.data.length;
      this.countt = this.shopadstate.data.length;
      this.count = 5;
      /*console.log(this.numsofshopad);*/
      /*while(this.numsofshopad < 10) {
        var newItem: ShopAdContent = new ShopAdContent();
        newItem.image = 'bcf450fa19d24ac79b991b0f0b2870aa.jpg';
        this.shopadstate.data.push(newItem);
        this.numsofshopad += 1;
      }*/
      this.cando2 = true;
    });
  }

  //循环方法
  // changepic() {
  //   if (this.count2 > 3)
  //     this.count2 = -1;
  //   this.count2 += 1;
  //   setTimeout(() => {
  //     this.changepic()
  //   }, 3000);
  // }

  changepic2() {
    if(this.cnt15 > 3)
      this.cnt15 = -1;
    this.cnt15 += 1;
    setTimeout(() => {
      this.changepic2()
    }, 3000);
  }

}
