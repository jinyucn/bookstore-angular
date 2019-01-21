import {Component, Inject, OnInit} from '@angular/core';
import {AdService} from "../ad.service";
import {MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-top-prod-dialog',
  templateUrl: './top-prod-dialog.component.html',
  styleUrls: ['./top-prod-dialog.component.css']
})
export class TopProdDialogComponent implements OnInit {

  id:number;
  price:number;
  title:string;
  picFilename:string;


  constructor(
    private adService: AdService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.id = this.data.id;
    this.adService.getProdById(this.id).subscribe(resp=>{
      if(resp.body.success==true){
        this.title = resp.body.data.title;
        this.price = resp.body.data.price;
        this.picFilename = resp.body.data.picFilename;
      }
    })
  }

}
