import {Component, Input, OnInit} from '@angular/core';
import {ShopItemInfo} from "./add-item";
import {AddItemService} from "./add-item.service";
import {UploadService} from "./upload.service";
import {FileUploader} from "ng2-file-upload";

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  constructor(
    private addItemService: AddItemService,
    private uploadService: UploadService,
  ) {
  }

  ngOnInit() {
  }

  postData: ShopItemInfo = new ShopItemInfo()

  @Input('title') title: string = "";
  @Input('price') price: number;
  @Input('picFilename') picFilename: string = "";

  id: number;
  formData: FormData = new FormData();
  mesg: string;

  apply(): void {
    this.postData.picFilename = this.picFilename;
    this.postData.id = this.id;
    this.postData.title = this.title;
    this.postData.price = this.price;

    this.addItemService.sendApplication(this.postData.id, this.postData.price, this.postData.picFilename, this.postData.title,).subscribe((data) => {
      console.log(data);
      if(data.body.success=true){
        let auth = data.headers.get('Set-Auth-Jwt');
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
        alert('Product added!');
        this.uploader.clearQueue();
        this.id = null;
        this.title = null;
        this.price = null;
        this.picFilename = null;
      }
      else{
        alert("Failed to add item.");
      }
    });
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
        this.picFilename = tempRes.data;
        let auth = headers['set-auth-jwt'];
        console.log(auth);
        localStorage.setItem('Set-Auth-Jwt',auth);
      }else {
        alert("Upload Unsuccessfully, please unload again.");
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
}
