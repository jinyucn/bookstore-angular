import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from "@angular/material";
import {AdService} from "../../ad.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private adService: AdService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addPrice(){
    this.adService.changePrice(this.data.requestId,this.data.newPrice,this.data.adType).subscribe(resp=>{
      console.log(resp);
      if(resp.status == 200){
        this.snackBar.open("Add price successfully.Please click REFRESH.","OK",{duration:1800});
      }
      else{
        alert("Failed to add price. Please try again.");
      }
    })
  }

  goToAccount(){
    this.router.navigate(['OwnerAccount']);
    this.dialogRef.close();
  }

}
