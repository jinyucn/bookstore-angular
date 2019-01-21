import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CdetailService} from "./cdetail.service";
import {Cproductattr} from "./CproductAttr";
import {CproductService} from '../cproduct/cproduct.service';
import {WrapperCom} from './WrapComments';

@Component({
  selector: 'app-cdetail',
  templateUrl: './cdetail.component.html',
  styleUrls: ['./cdetail.component.css']
})
export class CdetailComponent implements OnInit {
  private  pid: number;
  cproductstate: Cproductattr = new Cproductattr();
  product_comments:WrapperCom =new WrapperCom();
  cando: boolean;
  canshow:boolean;
  constructor(private route: ActivatedRoute,
              private cdetailService:CdetailService,
              private cproductService: CproductService,
              ) {   }

  ngOnInit() {
    this.cando = false;
    this.pid= +this.route.snapshot.paramMap.get('id');
    this.getProduct(this.pid);
    this.getComments(this.pid);
  }
  getProduct(id: number): void {
    this.cdetailService.getProductAttr(id).subscribe((cproductattr) => {
      console.log(cproductattr);
        this.cproductstate = cproductattr;
        this.cando = true;
    });
  }
  getComments(id: number): void{
    this.cdetailService.getComment(id).subscribe((resp) => {
      this.product_comments=resp;
      if(this.product_comments.data.length>0){
        this.canshow=true;
      }
      else{
        this.canshow=false;
      }
      console.log(this.product_comments);
    })
  }


  AddWish(productid: number): void {
    this.cproductService.AddWishProduct(productid).subscribe(addwishstate => {
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
  AddToCart(productid: number): void {
    this.cproductService.AddToCart(productid).subscribe(addwishstate => {
      let auth = addwishstate.headers.get('Set-CAuth-Jwt');
      localStorage.setItem('Set-CAuth-Jwt',auth);
        if (addwishstate.body.success == true) {
          alert('Add successful!');
        }
        else {
          alert('Something wrong! You have already add it.');
        }

    })
  }
}
