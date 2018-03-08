import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AppComponent} from './app.component';
import {AngularFireModule} from "angularfire2";
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireAuthModule} from "angularfire2/auth";
import {environment} from "../environments/environment";
import {RiNavbarComponent} from './ri-navbar/ri-navbar.component';
import {HomeComponent} from './home/home.component';
import {ProductsComponent} from './products/products.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {CheckOutComponent} from './check-out/check-out.component';
import {OrderSuccessComponent} from './order-success/order-success.component';
import {MyOrdersComponent} from './my-orders/my-orders.component';
import {AdminProductsComponent} from './admin-products/admin-products.component';
import {LoginComponent} from './login/login.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./services/auth-guard.service";
import {AdminOrdersComponent} from './admin-orders/admin-orders.component';
import {UserService} from "./services/user.service";
import {AdminGuard} from "./services/admin-guard.service";
import {ProductFormComponent} from './admin/product-form/product-form.component';
import {CategoryService} from "./services/category.service";
import {FormsModule} from "@angular/forms";
import {ProductService} from "./services/product.service";
import {CustomFormsModule} from "ng2-validation";
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {ShoppingCartService} from "./services/shopping-cart.service";
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import {OrderService} from "./services/order.service";
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';

let routes = [
  {path: '', component: ProductsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'shopping-cart', component: ShoppingCartComponent},
  {path: 'login', component: LoginComponent},

  {path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard]},
  {path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuard]},
  {path: 'my/orders', component: MyOrdersComponent, canActivate: [AuthGuard]},

  {path: 'admin/products/new', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/products/:id', component: ProductFormComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/products', component: AdminProductsComponent, canActivate: [AuthGuard, AdminGuard]},
  {path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuard, AdminGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    RiNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    LoginComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CustomFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard,
    AdminGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
