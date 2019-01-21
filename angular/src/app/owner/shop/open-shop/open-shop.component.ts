import {Component, Input, OnInit} from '@angular/core';
import { CATEGORIES } from "./all-categories";
import { OpenShopService} from "./open-shop.service";
import { ShopApplyReq} from "./ShopApplyReq";
import {FileUploader} from "ng2-file-upload";
import {Router} from "@angular/router";
import {option} from "../../../customer/place";

@Component({
  selector: 'app-open-shop',
  templateUrl: './open-shop.component.html',
  styleUrls: ['./open-shop.component.css']
})
export class OpenShopComponent implements OnInit {

  categories = CATEGORIES;

  postData : ShopApplyReq = new ShopApplyReq();

  imgFaceWithIdFilename : string="abc";
  applyShopCategory : number;
  applyShopName : string="";
  applyShopAddress : string="";
  applyShopEmail : string="";
  applyShopPhone: string="";


  mesg: string="sadas";

  options;
  option=option;
  public city: string[] = null;
  street: string;

  constructor(
    private openShopService: OpenShopService,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  categoryChange(id:number):void {
    console.log(this.categories[id]);
    this.applyShopCategory = id;
  }

  public uploader:FileUploader = new FileUploader({
    url:"http://47.106.108.89:8086/owner/upload",
    method: "POST",
    headers:[
      {name:"Auth-Jwt",value:localStorage.getItem('Set-Auth-Jwt')},
      {name:'Access-Control-Allow-Origin',value:'*'}
    ],
    allowedFileType: ["image"],
  });


  public selectedFileOnChanged(event){
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }

  public hasBaseDropZoneOver:boolean = false;

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  public uploadPic(item){
    item.upload();
    item.onSuccess = (response, status, headers) => {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        this.imgFaceWithIdFilename = tempRes.data;
        let auth = headers['set-auth-jwt'];
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
      }else {
        alert("Upload Unsuccessfully, please unload again.");
      }
    }
  }


  apply():void{
    for(let request of this.city){
      this.applyShopAddress=this.applyShopAddress+request+',';
    }

    this.applyShopAddress = this.applyShopAddress+this.street;

    this.postData.imgFaceWithIdFilename = this.imgFaceWithIdFilename;
    this.postData.applyShopCategory = this.applyShopCategory;
    this.postData.applyShopName = this.applyShopName;
    this.postData.applyShopAddress = this.applyShopAddress;
    this.postData.applyShopEmail = this.applyShopEmail;
    this.postData.applyShopPhone = this.applyShopPhone;

    this.openShopService.sendApplication(
      this.postData.imgFaceWithIdFilename,
      this.postData.applyShopCategory,
      this.postData.applyShopName,
      this.postData.applyShopAddress,
      this.postData.applyShopEmail,
      this.postData.applyShopPhone).subscribe((data)=>{
      console.log(data.body);
      if(data.body.success == true){
        let auth = data.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        alert('Apply successful, please wait for permission.');
        this.router.navigate(['Notification']);
      }
      else{
        alert("Failed to apply a shop.")
      }
    });
  }

}

