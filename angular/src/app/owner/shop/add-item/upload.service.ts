import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  loading = false;
  showPreview = false;
  xhr:XMLHttpRequest = new XMLHttpRequest();


  constructor(
  ) { }

  url: "http://47.106.108.89:8086/owner/upload";

  picUpload(formdata:FormData):any{
    this.xhr.open('POST', "http://47.106.108.89:8086/owner/upload");
    this.xhr.setRequestHeader('Auth-Jwt',localStorage.getItem('Set-Auth-Jwt'));
    this.xhr.send(formdata);
    // return this.http.post(this.url,file,this.httpOption);
    this.xhr.onload = () => {
      let auth = this.xhr.getResponseHeader('Set-Auth-Jwt');
      localStorage.setItem('Set-Auth-Jwt',auth);
      if (this.xhr.status == 200) {
        console.log(this.xhr.response);
        return 1;
      }
      else{
        console.log("error")
        return 0;
      }
    };
  }

}
