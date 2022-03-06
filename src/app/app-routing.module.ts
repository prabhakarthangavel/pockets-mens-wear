import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { ProductsComponent } from './products/products.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { UpdateStockComponent } from './manage-stock/update-stock/update-stock.component';

const routes: Routes = [
  { path: 'productsView', component: ProductViewComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'manage-stock', component: ManageStockComponent },
  { path: 'update-stock', component: UpdateStockComponent },
  { path: 'home', component: LandingComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
