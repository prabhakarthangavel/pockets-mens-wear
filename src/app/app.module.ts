import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from './../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './sidenav/sidenav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { AppMaterialModule } from './shared/app-material.module';
import { LandingComponent } from './landing/landing.component';
import { ProductViewComponent } from './product-view/product-view.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';
import { FooterComponent } from './footer/footer.component';
import { Interceptor } from './shared/Interceptor';
import { ProductsComponent } from './products/products.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UpdateStockComponent } from './manage-stock/update-stock/update-stock.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { DeleteDialogComponent } from './manage-stock/delete-dialog/delete-dialog.component';
import { LoginComponent } from './authenticate/login/login.component';
import { InfoFooterComponent } from './shared/info-footer/info-footer.component';
import { CartComponent } from './cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    LandingComponent,
    ProductViewComponent,
    ManageStockComponent,
    FooterComponent,
    ProductsComponent,
    UpdateStockComponent,
    ProductCardComponent,
    DeleteDialogComponent,
    LoginComponent,
    InfoFooterComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AppMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }],
  bootstrap: [AppComponent],
  entryComponents: [DeleteDialogComponent]
})
export class AppModule { }
