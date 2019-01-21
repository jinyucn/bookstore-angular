import { Component, OnInit } from '@angular/core';
import { AllProducts , RealProducts} from "./view-item";
import { ViewItemService} from "./view-item.service";
import {FileUploader} from "ng2-file-upload";
import { UploadService} from "../add-item/upload.service";

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.css']
})
export class ViewItemComponent implements OnInit {

  constructor(
    private uploadService: UploadService,
    private viewItemService: ViewItemService,

  ) { }

  ngOnInit() {
    this.getAllProducts();
  }
  realProducts = new RealProducts();
  nothing: string="You have no products. Please add some."
  i :number;

  getAllProducts(): void{
    this.viewItemService.getProductList().subscribe((resp) => {
      console.log(resp.body);
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.realProducts = resp.body;
        console.log(resp.body.data)
      }
      else{
        console.log("Failed to get all products.");
      }

    });
  }
  visible_edit = false;
  selectedProduct: RealProducts = null;
  id:number;
close(): void{
  this.visible_edit = false;
}
  formData: FormData = new FormData();
  mesg: string;


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
        this.picFilename = tempRes.data;
        let auth = headers['set-auth-jwt'];
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
      }else {
        alert("Upload Unsuccessfully, please upload again.");
      }
    }
  }

  upload(): void {
    let res = this.uploadService.picUpload(this.formData);
    if (res == 1) {
      this.mesg = "Upload unsuccessfully, please try again";
    }
    else {
      this.mesg = "Upload successfully.";
    }
  }
  picFilename: string="";
  postData: AllProducts = new AllProducts();
  edit_price: number;
  edit_title: string;
  edit(index:number,title,price,pic): void {
    this.visible_edit = true;
    this.id = index;
    this.edit_title = title;
    this.edit_price = price;
    this.picFilename = pic;
    console.log(index)
  }
 apply():void{
    this.postData.id = this.id;
    console.log(this.id)
    this.postData.price = this.edit_price;
    this.postData.title = this.edit_title;
    this.postData.picFilename = this.picFilename;
  this.viewItemService.editProduct(this.postData.title,this.postData.price,this.postData.picFilename,this.postData.id)
    .subscribe((resp)=>{
      if(resp.body.success == true) {
        let auth = resp.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.getAllProducts();
        alert('successful')
      }
      else
      {
        alert(resp.body.message)
      }
    })

 }

   delete(index:number):void {
     this.id = index;
     console.log(this.id);
     this.viewItemService.deleteProduct(this.id)
       .subscribe((resp) => {
         if (resp.body.success == true) {
           let auth = resp.headers.get('Set-Auth-Jwt');
           console.log(auth);
           localStorage.setItem('Set-Auth-Jwt',auth);
           this.getAllProducts();
           alert('successful')
         }
         else {
           alert(resp.body.message)
         }
       })

   }
}
