import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './owner/login/login.component';
import {CloginComponent} from "./customer/clogin/clogin.component";
import {IndexComponent} from "./index/index.component";
import {CartComponent} from "./customer/cart/cart.component";
import {ShopComponent} from "./owner/shop/shop.component";
import {OpenShopComponent} from "./owner/shop/open-shop/open-shop.component";
import {AddItemComponent} from "./owner/shop/add-item/add-item.component";
import {ViewItemComponent} from "./owner/shop/view-item/view-item.component";
import {CproductComponent} from "./customer/cproduct/cproduct.component";
import {CshopComponent} from "./customer/cshop/cshop.component";
import {CdetailComponent} from "./customer/cdetail/cdetail.component";
import { AuthGuard} from "./owner/login/auth.guard";
import {CutomerGuard} from "./customer/clogin/cauth.guard";
import {CmywishComponent} from './customer/cmywish/cmywish.component';
import {NotificationComponent} from "./owner/shop/notification/notification.component";
import {RegistrationComponent} from "./owner/registration/registration.component";
import {AdvertisementComponent} from "./owner/shop/advertisement/advertisement.component";
import {OrderManageComponent} from "./owner/shop/order-manage/order-manage.component";
import {EditShopComponent} from "./owner/shop/edit-shop/edit-shop.component";
import {SeeShopComponent} from "./owner/shop/see-shop/see-shop.component";
import {OrderlistComponent} from './customer/orderlist/orderlist.component';
import {IncomeManageComponent} from "./owner/shop/income-manage/income-manage.component";
import {OrderdetailComponent} from './customer/orderdetail/orderdetail.component';
import {SalesHistoryComponent} from "./owner/shop/sales-history/sales-history.component";
import {OwnerAccountComponent} from "./owner/shop/owner-account/owner-account.component";

const routes: Routes = [
  {path:'index', component: IndexComponent,runGuardsAndResolvers: 'always'},
  {path:'login', component: LoginComponent},
  {path:'clogin', component: CloginComponent},
  {path:'cart', component: CartComponent,canActivate:[CutomerGuard]},
  {path:'cproduct', component: CproductComponent},
  {path:'cshop', component: CshopComponent},
  {path:'cdetail/:id', component: CdetailComponent},
  {path:'', redirectTo:'index', pathMatch:'full'},
  {path:'ShopOwnerCenter', component: ShopComponent,canActivate:[AuthGuard]},
  {path:'Notification', component: NotificationComponent},
  {path:'OpenShop', component: OpenShopComponent},
  {path:'addItem', component:AddItemComponent},
  {path:'ViewItem', component:ViewItemComponent},
  {path:'cshop/:category/:keyword', component:CshopComponent},
  {path:'cproduct/:category/:keyword', component: CproductComponent},
  {path:'cproduct/:no/:shopid/:shopname', component: CproductComponent},
  {path:'cmywish/:category',component:CmywishComponent,canActivate:[CutomerGuard]},
  {path:'cshop/:category/:keyword', component:CshopComponent},
  {path:'register',component:RegistrationComponent},
  {path:'advertisement',component:AdvertisementComponent},
  {path:'orderManage', component: OrderManageComponent},
  {path:'editShop',component: EditShopComponent},
  {path:'seeShop', component: SeeShopComponent},
  {path:'orderlist', component: OrderlistComponent},
  {path:'income',component: IncomeManageComponent},
  {path:'orderdetail/:tmp/:orderid',component:OrderdetailComponent},
  {path:'orderlist/:category', component:OrderlistComponent},
  {path:'SalesHistory',component: SalesHistoryComponent},
  {path:'OwnerAccount',component: OwnerAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
