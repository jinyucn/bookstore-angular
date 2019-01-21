import { Component, OnInit } from '@angular/core';
import { EditShopService} from "./edit-shop.service";
import { option} from "../../../customer/place";

@Component({
  selector: 'app-edit-shop',
  templateUrl: './edit-shop.component.html',
  styleUrls: ['./edit-shop.component.css']
})
export class EditShopComponent implements OnInit {

  constructor(
    private editShopService: EditShopService
  ) {

  }
  options;
  option=option;
  selectedProvince;
  selectedCity;
  city;
  cities;

  ngOnInit( ) {
    this.seeShop();
  }
  newPhone ;
  newAddress;
  newEmail;
  oldPhone ;
  oldAddress;
  oldEmail;
  seeShop():void{
    this.editShopService.seeShop().subscribe((resp)=>{
      console.log(resp);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.oldAddress = resp.body.data.shopAddress;
        this.oldEmail = resp.body.data.shopEmail;
        this.oldPhone = resp.body.data.shopPhone;
        this.newEmail = this.oldEmail;
        this.newAddress = this.oldAddress;
        this.newPhone = this.oldPhone;
      }
      else{
        alert("Failed to see shop.");
      }
    })
  }


  public values: string[] = null;

  public onChanges(values: any): void {
    console.log(values, this.values);

  }
  street: string;

  editShop(newPhone,newEmail):void{
    this.newAddress = "";
    for(let request of this.values){
      this.newAddress=this.newAddress+request+',';
    }
    this.newAddress=this.newAddress+this.street;
    console.log(this.newAddress);
    this.newPhone = newPhone;
        this.newEmail = newEmail;
        this.editShopService.editShop(this.newPhone,this.newAddress,this.newEmail).subscribe((resp)=>{
          console.log(resp);
          if(resp.body.success == true){
            let auth = resp.headers.get('Set-Auth-Jwt');
            localStorage.setItem('Set-Auth-Jwt',auth);
            alert('success');
            this.seeShop();
          }
          else{
            alert("Failed to edit shop.");
          }
    })
  }
}
