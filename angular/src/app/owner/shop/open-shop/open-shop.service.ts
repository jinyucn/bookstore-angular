import { Injectable} from "@angular/core";
import { Observable, of} from "rxjs";
import {ShopApplyReq} from "./ShopApplyReq";
import {HttpService} from "../http-service/http.service";

@Injectable({
  providedIn: "root"
})

export class OpenShopService {
  constructor(
    private httpService:HttpService,
  ){}

  url="http://47.106.108.89:8086/owner/shop/establish";


  sendApplication(imgFaceWithIdFilename : string,
  applyShopCategory : number,
  applyShopName : string,
  applyShopAddress : string,
  applyShopEmail : string,
  applyShopPhone: string,):Observable<any>{
    console.log(ShopApplyReq);
    return this.httpService.httpPost
    (this.url,
      {imgFaceWithIdFilename : imgFaceWithIdFilename,
      applyShopCategory :applyShopCategory,
      applyShopName : applyShopName,
      applyShopAddress : applyShopAddress,
      applyShopEmail : applyShopEmail,
      applyShopPhone: applyShopPhone,})

  }

}
