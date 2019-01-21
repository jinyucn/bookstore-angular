import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import { CloginService } from '../customer/clogin/clogin.service';
import { CartService } from '../customer/cart/cart.service';
import { Cproductstate } from '../customer/cart/Cartstate';
import { ShareService } from '../customer/cproduct/share.service';
import {NavigationEnd, Router} from '@angular/router';
import {ShopInfoService} from "../owner/shop/shop-info/shop-info.service";

declare var $: any;

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit,OnDestroy {
  cproductstate: Cproductstate = new Cproductstate();
  selectValue: number = -1;
  selectValue2: number = 0;
  allprice: number;
  cartnumber: number;
  keyword: string='';

  navigationSubscription;

  constructor(
    private loginService: CloginService,
    private cartService: CartService,
    private shareService: ShareService,
    private router: Router,
    private shopInfoService:ShopInfoService,
  ) {
    this.shareService.componentOneFn = this.GetAllCart;

  }
  ngOnInit() {
    this.allprice = 0;
    this.GetAllCart();

    this.auth = localStorage.getItem('Set-Auth-Jwt');
    this.cauth = localStorage.getItem('Set-CAuth-Jwt');

    if(this.auth || this.cauth){
      this.show = false;
    }

    if(this.auth&&!this.cauth){
      this.shopper = true;
    }

    // this.shopInfoService.getStatus().subscribe(resp=>{
    //   if(resp.body){
    //     if(resp.body.success == true){
    //       this.shopRole = resp.body.data.role;
    //       console.log("shopRole="+this.shopRole);
    //       this.shopper = ((this.shopRole == "SHOPPER")||(this.shopRole == "NONE"));
    //     }
    //     else{
    //       console.log(resp.body.message);
    //     }
    //   }
    // });

  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  auth: string = "";
  cauth: string = "";
  show: boolean = true;
  shopper: boolean = false;
  shopRole: string = "";

  ButtonClick(): void {
    // if(this.keyword=undefined){
    //   this.keyword='none';
    // }
    if(this.selectValue2==1)

      window.location.href="/cshop/" + this.selectValue.toString() + "/" +this.keyword.toString();

    if(this.selectValue2==0)

      window.location.href="/cproduct/" + this.selectValue.toString() + "/" +this.keyword.toString();

    }

  getValue(): void {
    this.selectValue = $("#select").val();
    console.log(this.selectValue);
  }

  getValue2(): void {
    this.selectValue2 = $("#select2").val();
    console.log(this.selectValue2);
  }

  logout() {
    // this.loginService.logout();
    this.loginService.logout();
    localStorage.removeItem('Set-Auth-Jwt');
    localStorage.removeItem('Set-CAuth-Jwt');
    this.router.navigate(['index']);
    this.navigationSubscription = this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
        console.log(event);
        if(event.urlAfterRedirects == event.url){
          window.location.reload();
        }
      }
    });

  }
  cancel(): void {

  }
  GetAllCart(): void {
    this.allprice = 0;
    this.cartnumber = 0;
    console.log('GetAllCart()');
    this.cartService.GetAllCart().subscribe(cproductstate => {
      if(cproductstate.body){
        console.log(cproductstate);
        let auth = cproductstate.headers.get('Set-CAuth-Jwt');
        localStorage.setItem('Set-CAuth-Jwt',auth);
        this.cproductstate = cproductstate.body;
        this.cproductstate.data.forEach(ele => {
          this.cartnumber += 1;
          ele.num = 1;
          this.allprice += ele.price;
        });
      }
    });
  }
  REmoveCart(cartid: number): void {
    this.cartService.RemoveCart(cartid).subscribe(cartdeletestate => {
      let auth = cartdeletestate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        alert('Delete successful!');
        this.GetAllCart();

    });
  }
  sayhello(): void {
    console.log('hello');
  }
}
