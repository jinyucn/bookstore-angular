import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar, MatSnackBarRef} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {MessageService} from "primeng/api";
import {ConfirmDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {AdService} from "../ad.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-price-dialog',
  templateUrl: './add-price-dialog.component.html',
  styleUrls: ['./add-price-dialog.component.css'],
})
export class AddPriceDialogComponent implements OnInit {

  adTitle:string = "";
  adPrice:number = 0;
  adNewPrice:number = 0;
  delta:number = 0;
  adType:string = "";
  balance:number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adService: AdService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.adTitle = this.data.row.tittle;
    this.adPrice = parseInt((this.data.row.price).toFixed(0));
    this.adNewPrice = parseInt((this.adPrice * 1.05).toFixed(0));
    this.delta = parseInt((this.adNewPrice - this.adPrice).toFixed(0));
    this.adType = this.data.type;
    this.balance = this.data.balance;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPrice(){
    this.adService.changePrice(this.data.row.id,this.adNewPrice,this.adType).subscribe(resp=>{
      console.log(resp);
      if(resp.status == 200){
        this.snackBar.open("Add price successfully.Please click REFRESH.","OK",{duration:1800});
      }
      else{
        alert("Failed to add price. Please try again.");
      }
    })
  }

  openConfirm(){
    this.dialog.open(ConfirmDialogComponent,{
      data:{
        requestId:this.data.row.id,
        newPrice:this.adNewPrice,
        adType:this.adType,
      }
    });
  }

  goToAccount(){
    this.router.navigate(['OwnerAccount']);
    this.dialogRef.close();
  }

}
