import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TablesComponent } from './components/tables/tables.component';
import { ProductsComponent } from './components/products/products.component';
import { ReportsComponent } from './components/reports/reports.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { KitchenComponent } from './components/kitchen/kitchen.component';
import { OrdersComponent } from './components/orders/orders.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tables', component: TablesComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'checkout', component: CheckoutComponent},
  { path: 'orders', component: OrdersComponent },
  { path: 'kitchen-view', component: KitchenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
