import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';

const routes: Routes = [
  { path: 'productsView', component: ProductViewComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'manage-stock', component: ManageStockComponent },
  { path: 'home', component: LandingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
