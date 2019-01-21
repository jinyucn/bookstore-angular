import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from "@angular/material";
import {FormControl} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Router} from "@angular/router";
import {AddPriceDialogComponent} from "./add-price-dialog/add-price-dialog.component";
import {OwnerAccountService} from "../owner-account/owner-account.service";
import {AdService} from "./ad.service";
import {state, trigger, style, transition, animate} from "@angular/animations";
import {TopProdDialogComponent} from "./top-prod-dialog/top-prod-dialog.component";
import {AdDetailDialogComponent} from "./ad-detail-dialog/ad-detail-dialog.component";

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class AdvertisementComponent implements OnInit,AfterViewInit {

  columnsToDisplay = ['histitle','hisprice','hisdate','hisstatus'];
  expandedElement: adShopHisElement|null;
  expandedElement2: adProdHisElement|null;

  dataSource = new MatTableDataSource<any>();
  shopDS = new MatTableDataSource<any>();
  productDS = new MatTableDataSource<any>();
  shopHistoryDS = new MatTableDataSource<adShopHisElement>();
  productHistoryDS = new MatTableDataSource<adProdHisElement>();

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;

  // NO:number[]=[1,2,3,4,5,6,7,8,9];

  totalCount:number = 0;
  topProdCount:number = 0;
  topFlag:boolean[] = [false,false,false];
  Product:string[] = ["","",""];
  str ={
    "id0":null,
    "id1":null,
    "id2":null
  };

  show = false;
  timeFlag = true;

  shopId:number = null;
  stitle:string = "";
  sdescription:string = "";
  sprice:number = 500;
  simage:string = "";
  sdate:string = "";
  ptitle:string = "";
  pdescription:string = "";
  pprice:number = 1000;
  pimage:string = "";
  pdate:string = "";
  productIdstr:string = "";
  productId:number = null;

  products$:any;
  myControl = new FormControl();

  chour:string = "00";
  cminute:string = "00";
  csecond:string = "00";

  timer;

  diff: number;
  endDate:number;
  today:any = new Date();
  todayYear: number = new Date().getFullYear();
  todayMonth: number = new Date().getMonth();
  todayDate: number = new Date().getDate();

  balance:number = 0;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private account: OwnerAccountService,
    private adService: AdService,
    private topDialog: MatDialog,
    private adDetailDialog: MatDialog,
  ) {
    account.getBalance().subscribe(resp=>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.balance = resp.body.data;
      }
      else{
        console.log(resp.body.message);
      }
    })
  }

  ngOnInit() {
    this.getShopId();
    this.adService.getMerchaniseList().subscribe(resp=>{
      if(resp.body&&resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.dataSource.data = resp.body.data;
        this.products$ = resp.body.data;
        this.totalCount = resp.body.data.length;
      }
      else{
        console.log(resp.body.message);
      }
    });

    this.sortTable.sortChange.subscribe(()=>this.paginator.pageIndex = 0);

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sortTable;

    // setTimeout(()=> {this.GetPromotion();},1000)
    this.GetPromotion();

    this.getShopAd();

  }

  ngAfterViewInit(){

    // console.log(new Date(this.todayYear,this.todayMonth,this.todayDate,16,0,0));
    console.log(new Date());
    this.diff = new Date(this.todayYear,this.todayMonth,this.todayDate,17,0,0).getTime()-new Date().getTime();
    this.timer = setInterval(() => {
      this.diff = new Date(this.todayYear,this.todayMonth,this.todayDate,17,0,0).getTime()-new Date().getTime();
      // console.log(this.diff);
      if(this.diff <0){
        this.timeFlag = false;
        clearInterval(this.timer);
      }
      this.diff = Math.floor(this.diff / 1000);
      let h = Math.floor(this.diff / 3600);
      let m = Math.floor((this.diff % 3600) / 60);
      let s = (this.diff % 3600) % 60;
      if(h>=0 && h<=9){
        this.chour = "0" + h;
      }
      else{
        this.chour = h.toString();
      }
      if(m>=0 && m<=9){
        this.cminute = "0" + m;
      }
      else{
        this.cminute = m.toString();
      }
      if(s>=0 && s<=9){
        this.csecond = "0" + s;
      }
      else{
        this.csecond = s.toString();
      }


    }, 1000);

    // this.diff = Math.floor(this.diff / 1000);
    // this.chour = Math.floor(this.diff / 3600);
    // this.cminute = Math.floor((this.diff % 3600) / 60);
    // this.csecond = (this.diff % 3600) % 60;
    // console.log(this.csecond);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (data:any,filter:string):boolean=>{
      return data.title.toLowerCase().indexOf(filter) !== -1;
    };

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Topper(row:any){

    if(this.topProdCount == 3){
      alert("You can only promote at most 3 products.")
    }
    else{
      for(let i=0;i<3;i++){
        let s = "id"+i;
        if(this.str[s]==null){
          this.str[s] = row.id;
          this.topProdCount++;
          this.topFlag[i] = true;
          this.Product[i] = row.id;
          break;
        }
      }
      // console.log(this.str);
      this.adService.putTopShop(this.str).subscribe(resp=>{
        if(resp.body.success == true){
          let auth = resp.headers.get('Set-Auth-Jwt');
          localStorage.setItem('Set-Auth-Jwt',auth);
          let top = document.getElementById("top"+row.id);
          top.setAttribute("disabled","true");
          let cancel = document.getElementById("cancel"+row.id);
          cancel.removeAttribute("disabled");
        }
        else{
          console.log("Product top put error.")
        }
      })
    }
  }

  Cancel(row:any){
    if(this.topProdCount==0){
      alert("No promotion.");
    }
    else{
      let i = 0;
      for(i=0;i<3;i++) {
        let s = "id"+i;
        if(row.id == this.str[s]){
          this.str[s] = null;
          this.topProdCount--;
          this.topFlag[i] = false;
          this.Product[i] = null;
          break;
        }
      }
      // console.log(this.str);
      this.adService.putTopShop(this.str).subscribe(resp=>{
        if(resp.body.success == true){
          let top = document.getElementById("top"+row.id);
          top.removeAttribute("disabled");
          let cancel = document.getElementById("cancel"+row.id);
          cancel.setAttribute("disabled","true");
        }
        else{
          console.log("Product top put error.")
        }
      })
    }

  }

  time = null;

  GetPromotion(){
    this.adService.getTopShop().subscribe(resp=>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        localStorage.setItem('Set-Auth-Jwt',auth);
        for(let i=0;i<3;i++){
          let s = "id"+i;
          if(resp.body.data != null&&resp.body.data[s]!=null){
            this.topProdCount++;
            this.topFlag[i] = true;
            this.Product[i] = resp.body.data[s];
            this.str[s] = resp.body.data[s];

            // console.log(this.el.nativeElement);
            // console.log(s);
            let top = document.getElementById("top"+this.str[s]);
            let cancel = document.getElementById("cancel"+this.str[s]);
            // console.log(top);
            // console.log(cancel);
            if(top&&cancel){
              top.setAttribute("disabled","true");
              cancel.removeAttribute("disabled");
              if(this.time){
                clearTimeout(this.time);
              }
            }
            else{
              this.time = setTimeout(()=>this.GetPromotion(), 0);
            }

          }
        }
        // console.log(this.str);
      }
      else{
        console.log("Failed to get top products");
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

  public uploadShopPic(item){
    item.upload();
    item.onSuccess = (response, status, headers) => {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        this.simage = tempRes.data;
      }else {
        alert("Upload Unsuccessfully, please unload again.");
      }
    }
  }

  public uploadProdPic(item){
    item.upload();
    item.onSuccess = (response, status, headers) => {
      if (status == 200) {
        let tempRes = JSON.parse(response);
        this.pimage = tempRes.data;
      }else {
        alert("Upload Unsuccessfully, please unload again.");
      }
    }
  }


  applyShopAD(){
    if(this.stitle == ""){
      alert("Title can not be empty.")
    }
    else if(this.sdescription == ""){
      alert("Description can not be empty.");
    }
    else if(this.sprice < 500){
      alert("Price must be at least ￥500.");
    }
    else if(this.simage == ""){
      alert("Image can not be empty.");
    }
    else{
      console.log(this.shopId,this.stitle,this.sdescription,this.sprice,this.simage,this.sdate);
      this.adService.addShopAd(this.shopId, this.stitle, this.sdescription, this.sprice, this.simage).subscribe(resp=>{
        if(resp.status == 200){
          this.stitle = "";
          this.sdescription = "";
          this.sprice = 500;
          this.uploader.clearQueue();
          this.simage = "";
          alert("Apply shop AD successfully.");
        }
        else{
          alert(resp.message);
        }
      })
    }
  }

  getShopId(){
    this.adService.getShopId().subscribe(resp=>{
      if(resp.body.success == true){
        let auth = resp.headers.get('Set-Auth-Jwt');
        localStorage.setItem('Set-Auth-Jwt',auth);
        this.shopId = resp.body.data.id;
        this.getAdHistory();
        this.sortTableSH.sortChange.subscribe(()=>{this.paginatorSH.pageIndex = 0;});
        this.shopHistoryDS.paginator = this.paginatorSH;
        this.shopHistoryDS.sort = this.sortTableSH;
        this.shopHistoryDS.sort.sortChange.subscribe(()=>{
          this.getAdHistory();
        });
        this.sortTablePH.sortChange.subscribe(()=>this.paginatorPH.pageIndex = 0);
        this.productHistoryDS.paginator = this.paginatorPH;
        this.productHistoryDS.sort = this.sortTablePH;
        this.productHistoryDS.sort.sortChange.subscribe(()=>{
          this.getAdHistory();
        });
      }
      else{
        console.log("Failed to get shopId");
      }
    })
  }

  applyProductAD(){
    if(this.ptitle == ""){
      alert("Title can not be empty.");
    }
    else if(this.productIdstr == null){
      alert("Product can not be empty.");
    }
    else if(this.pdescription == ""){
      alert("Description can not be empty.");
    }
    else if(this.pprice < 1000){
      alert("Price must be at least ￥1000.");
    }
    else if(this.pimage == ""){
      alert("Image can not be empty.");
    }
    else{
      this.productId = parseInt(this.productIdstr.split('-')[0]);
      console.log(this.shopId,this.productId,this.ptitle,this.pdescription,this.pprice,this.pimage,this.pdate);
      this.adService.addProdAd(this.shopId,this.ptitle,this.pdescription,this.pprice,this.pimage,this.productId).subscribe(resp=>{
        if(resp.status == 200){
          this.ptitle = "";
          this.productId = null;
          this.pdescription = "";
          this.pprice = 1000;
          this.uploader.clearQueue();
          this.pimage = "";
          alert("Apply product AD successfully.");
        }
        else{
          alert(resp.message);
        }
      })
    }
  }

  showProd(id){
    this.topDialog.open(TopProdDialogComponent,{data:{id:id}});
  }

  showAdDetailDialog(row,type){
    this.adDetailDialog.open(AdDetailDialogComponent,{
      data:{row:row,type:type}
    })

  }

  public getShopAd(){
    this.adService.getShopAdRequest().subscribe(resp=>{
      // console.log(resp.data);
      if(resp.status == 200){
        let temp = resp.data;
        temp.sort(this.sortByPrice);
        let i = 0;
        let temp2 = [];
        for(let a of temp){
          if(i>=8) break;
          temp2.push({id:a.id,shopId:a.shopId,tittle:a.tittle,price:a.price,permitted:a.permitted,image:a.image});
          i++;
        }
        this.shopDS.data = temp2;
      }
      else{
        console.log(resp.message);
      }
    });

    this.adService.getProdAdRequest().subscribe(resp=>{
      // console.log(resp.data);
      if(resp.status == 200){
        let temp = resp.data;
        temp.sort(this.sortByPrice);
        let i = 0;
        let temp2 = [];
        for(let a of temp){
          if(i>=12) break;
          temp2.push({id:a.id,shopId:a.shopId,productId:a.productId,tittle:a.tittle,price:a.price,permitted:a.permitted,image:a.image});
          i++;
        }
        this.productDS.data = temp2;
      }
      else{
        console.log(resp.message);
      }
    })
  }

  sortByPrice(x,y)
  {
    return y.price-x.price;
  }

  showAddPriceDialog(row,type:string){
    this.dialog.open(AddPriceDialogComponent,{
      data:{row:row,
            type:type,
            balance:this.balance}
    });
  }

  allShopAd = [];
  allProdAd = [];
  showShopHis = false;
  showProdHis = true;
  shopAdHisCount = 0;
  prodAdHisCount = 0;

  selectedSH:string;
  selectedPH:string;

  @ViewChild('paginatorSH') paginatorSH: MatPaginator;
  @ViewChild('sortTableSH') sortTableSH: MatSort;
  @ViewChild('paginatorPH') paginatorPH: MatPaginator;
  @ViewChild('sortTablePH') sortTablePH: MatSort;

  getAdHistory(){
    this.allShopAd = [];
    this.adService.getShopAdHistory(this.shopId).subscribe(resp=>{
      if(resp.status==200){
        this.shopAdHisCount = resp.data.length;
        for(let item of resp.data){
          this.allShopAd.push({title:item.tittle,content:item.content,date:item.applyDate,price:item.price,permitted:item.permitted,image:item.image});
        }
        this.allShopAd.sort(this.sortByTime);
        this.shopHistoryDS.data = this.allShopAd;
      }
      else{
        console.log(resp.message);
      }
    });

    this.allProdAd = [];
    this.adService.getProdAdHistory(this.shopId).subscribe(resp=>{
      if(resp.status==200){
        this.prodAdHisCount = resp.data.length;
        for(let item of resp.data){
          let temptitle = "";
          let tempprice = 0;
          let mesg = "";
          this.adService.getProdById(item.productId).subscribe(resp=>{
            if(resp.body.success==true){
              temptitle = resp.body.data.title;
              tempprice = resp.body.data.price;
            }
            else{
              mesg = "Cannot find the product, it may be removed."
            }
          });
          this.allProdAd.push({title:item.tittle,content:item.content,date:item.applyDate,price:item.price,permitted:item.permitted,image:item.image,prodId:item.productId,prodTitle:temptitle,prodPrice:tempprice,mesg:mesg});
        }
        this.allProdAd.sort(this.sortByTime);

        this.productHistoryDS.data = this.allProdAd;
      }
      else{
        console.log(resp.message);
      }
    });

  }


  showShopAdHistory(){
    this.showShopHis = false;
    this.showProdHis = true;
  }

  showProductAdHistory(){
    this.showShopHis = true;
    this.showProdHis = false;
  }

  applyFilterSH(filterValue: string) {
    this.shopHistoryDS.filter = filterValue.trim().toLowerCase();

    if(this.selectedSH=="Title"){
      this.shopHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.title.toLowerCase().indexOf(filter) !== -1;
      }
    }

    else if(this.selectedSH=="Content"){
      this.shopHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.content.toLowerCase().indexOf(filter) !== -1;
      }
    }

    else if(this.selectedSH=="LaunchDate"){
      this.shopHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.date.toLowerCase().indexOf(filter) !== -1;
      }
    }

    if (this.shopHistoryDS.paginator) {
      this.shopHistoryDS.paginator.firstPage();
    }
  }

  applyFilterPH(filterValue: string) {
    this.productHistoryDS.filter = filterValue.trim().toLowerCase();

    if(this.selectedPH=="Title"){
      this.productHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.title.toLowerCase().indexOf(filter) !== -1;
      }
    }

    else if(this.selectedSH=="Content"){
      this.productHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.content.toLowerCase().indexOf(filter) !== -1;
      }
    }

    else if(this.selectedPH=="LaunchDate"){
      this.productHistoryDS.filterPredicate = (data:any,filter:string):boolean=> {
        return data.date.toLowerCase().indexOf(filter) !== -1;
      }
    }

    if (this.productHistoryDS.paginator) {
      this.productHistoryDS.paginator.firstPage();
    }
  }

  goToAccount(){
    this.router.navigate(['OwnerAccount']);
  }

  sortByTime(x,y){
    return Date.parse(y.date)-Date.parse(x.date);
  }

}


export interface adShopHisElement {
  title: string;
  price: number;
  date: string;
  permitted: boolean;
  content: string;
  image:string;
}

export interface adProdHisElement {
  title: string;
  price: number;
  date: string;
  permitted: boolean;
  content: string;
  image:string;
  prodId:number;
  prodTitle:string;
  prodPrice:number;
  mesg:string;
}
