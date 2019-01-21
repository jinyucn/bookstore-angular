import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginComponent} from './owner/login/login.component';
import { ShopComponent } from './owner/shop/shop.component';
import { NotificationComponent } from './owner/shop/notification/notification.component';
import {APP_BASE_HREF} from '@angular/common';
import { MainHeaderComponent } from './main-header/main-header.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { SliderAreaComponent } from './slider-area/slider-area.component';
import { MainFooterComponent } from './main-footer/main-footer.component';
import {CartComponent} from './customer/cart/cart.component';
import {CloginComponent, DialogselfComponent, RegisterDialogselfComponent} from './customer/clogin/clogin.component';
import {CshopComponent} from './customer/cshop/cshop.component';
import {CproductComponent} from './customer/cproduct/cproduct.component';
import { IndexComponent } from './index/index.component';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { OpenShopComponent } from './owner/shop/open-shop/open-shop.component';
import { AddItemComponent } from './owner/shop/add-item/add-item.component';
import { ViewItemComponent } from './owner/shop/view-item/view-item.component';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule, HttpHeaders, HttpRequest, HttpResponse} from "@angular/common/http";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatAutocompleteModule, MatButtonToggle
} from '@angular/material';
import {JwtHelperService, JwtModule} from "@auth0/angular-jwt";
import { LoginService} from "./owner/login/login.service";
import {AuthGuard} from "./owner/login/auth.guard";
import {DemoMaterialModule} from "./material-module";
import { CmywishComponent } from './customer/cmywish/cmywish.component';
import { FileUploadModule } from 'ng2-file-upload';
import { RegistrationComponent } from './owner/registration/registration.component';
import { NgZorroAntdModule} from "ng-zorro-antd";
import { ForgetPwdComponent } from './owner/login/forget-pwd/forget-pwd.component';
import { MatTableModule} from "@angular/material/table";
import { CdetailComponent } from './customer/cdetail/cdetail.component';
import { SoMainMenuComponent } from './owner/shop/so-main-menu/so-main-menu.component';
import { SoHeaderComponent } from './owner/shop/so-header/so-header.component';
import { AdvertisementComponent } from './owner/shop/advertisement/advertisement.component';
import { OrderManageComponent } from './owner/shop/order-manage/order-manage.component';
import { EditShopComponent } from './owner/shop/edit-shop/edit-shop.component';
import { SeeShopComponent } from './owner/shop/see-shop/see-shop.component';
import { OrderlistComponent } from './customer/orderlist/orderlist.component';
import {AddPriceDialogComponent} from "./owner/shop/advertisement/add-price-dialog/add-price-dialog.component";
import { IncomeManageComponent } from './owner/shop/income-manage/income-manage.component';
import { OrderdetailComponent } from './customer/orderdetail/orderdetail.component';
import {ChartModule} from "primeng/chart";
import { SalesHistoryComponent } from './owner/shop/sales-history/sales-history.component';
import { OwnerAccountComponent } from './owner/shop/owner-account/owner-account.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { ConfirmDialogComponent } from './owner/shop/advertisement/add-price-dialog/confirm-dialog/confirm-dialog.component';
import { TopProdDialogComponent } from './owner/shop/advertisement/top-prod-dialog/top-prod-dialog.component';
import { AdDetailDialogComponent } from './owner/shop/advertisement/ad-detail-dialog/ad-detail-dialog.component';

export function tokenGetter(){
  return localStorage.getItem('Set-Auth-Jwt')
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ShopComponent,
    NotificationComponent,
    MainHeaderComponent,
    MainMenuComponent,
    SliderAreaComponent,
    MainFooterComponent,
    CartComponent,
    CloginComponent,
    CproductComponent,
    CshopComponent,
    IndexComponent,
    MobileMenuComponent,
    OpenShopComponent,
    AddItemComponent,
    ViewItemComponent,
    DialogselfComponent,
    CmywishComponent,
    RegistrationComponent,
    ForgetPwdComponent,
    CdetailComponent,
    SoMainMenuComponent,
    SoHeaderComponent,
    AdvertisementComponent,
    RegisterDialogselfComponent,
    OrderManageComponent,
    EditShopComponent,
    SeeShopComponent,
    AddPriceDialogComponent,
    OrderlistComponent,
    IncomeManageComponent,
    OrderdetailComponent,
    SalesHistoryComponent,
    OwnerAccountComponent,
    ConfirmDialogComponent,
    TopProdDialogComponent,
    AdDetailDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    DemoMaterialModule,
    FileUploadModule,
    NgZorroAntdModule,
    MatTableModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule,
    ToastModule,
    JwtModule.forRoot({
      config:{
        headerName:'Auth-Jwt',
        tokenGetter: tokenGetter,
        skipWhenExpired: true,
        whitelistedDomains:['localhost:4200'],
        blacklistedRoutes:[],
      }
    }),
  ],
  providers: [
    {provide: APP_BASE_HREF,useValue:'/'},
    LoginService,
    AuthGuard,
    JwtHelperService,
    MessageService,
  ],
  entryComponents:[DialogselfComponent,
    CloginComponent,ForgetPwdComponent,
    RegisterDialogselfComponent,AddPriceDialogComponent,
    ConfirmDialogComponent,TopProdDialogComponent,
    AdDetailDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
