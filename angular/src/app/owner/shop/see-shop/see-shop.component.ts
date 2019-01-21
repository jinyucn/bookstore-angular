import { Component, OnInit } from '@angular/core';
import { SeeShopService} from "./see-shop.service";

@Component({
  selector: 'app-see-shop',
  templateUrl: './see-shop.component.html',
  styleUrls: ['./see-shop.component.css']
})
export class SeeShopComponent implements OnInit {

  constructor(
    private seeShopService: SeeShopService
  ) { }

  ngOnInit() {
    this.seeShop()
  }
  ownerId;
  shopCategory;
  shopName;
  shopAddress;
  shopEmail;
  shopPhone;
  id;
  nothing = 'No information'
  cat = ["TV & Home Theater", "Computers & Tablets", "Cell Phones", "Cameras & Camcorders", "Audio", "Car Electronics & GPS", "Video, Games, Movies & Music", "Health, Fitness & Sports", "Home & Office"]
  seeShop():void{
    this.seeShopService.seeShop().subscribe((resp)=>{
      console.log(resp);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.id = resp.body.data.id;
        this.ownerId = resp.body.data.ownerId;
        this.shopCategory = resp.body.data.shopCategory;
        this.shopName = resp.body.data.shopName;
        this.shopAddress = resp.body.data.shopAddress;
        this.shopEmail = resp.body.data.shopEmail;
        this.shopPhone = resp.body.data.shopPhone;
        this.shopCategory = this.cat[resp.body.data.shopCategory]
      }
      else{
        console.log("Failed to see shop");
      }
    })
  }


}
