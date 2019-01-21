import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {AdService} from "../ad.service";

@Component({
  selector: 'app-ad-detail-dialog',
  templateUrl: './ad-detail-dialog.component.html',
  styleUrls: ['./ad-detail-dialog.component.css']
})
export class AdDetailDialogComponent implements OnInit {

  id:number;
  type:string;
  price:number;
  title:string;
  image:string;
  prodId:number;
  prodTitle:string;
  prodPrice:number;
  mesg:string;

  constructor(
    private adService: AdService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.type = this.data.type;
    this.id = this.data.row.id;
    this.price = this.data.row.price;
    this.title = this.data.row.tittle;
    this.image = this.data.row.image;
    this.prodId = this.data.row.productId;
    if(this.type == "PRODUCT_AD"){
      this.prodTitle = "";
      this.prodPrice = 0;
      this.mesg = "";
      this.adService.getProdById(this.prodId).subscribe(resp=>{
        if(resp.body.success == true){
          this.prodTitle = resp.body.data.title;
          this.prodPrice = resp.body.data.price;
        }
        else{
          this.mesg = "Cannot find the product, it may be removed."
        }
      })
    }
  }

}
