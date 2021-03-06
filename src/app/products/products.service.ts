import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getProductsUrl: string = 'products/fetchProduct/';
  private getProductDetailUrl: string = 'products/productDetail/';
  private getTopDealsUrl: string = 'products/topDeals';
  private addToCartUrl: string = 'products/addCart';
  constructor(private _http: HttpClient) { }

  getProducts(value: string): Observable<any> {
    return this._http.get(environment.baseUrl + this.getProductsUrl + value, { observe: 'response' });
  }

  getProductDetail(id: number): Observable<any> {
    return this._http.get(environment.baseUrl + this.getProductDetailUrl + id, { observe: 'response' });
  }

  getTopDeals(): Observable<any> {
    return this._http.get(environment.baseUrl + this.getTopDealsUrl, { observe: 'response' });
  }

  addToCart(cart: any): Observable<any> {
    return this._http.post(environment.baseUrl, cart, { observe: 'response' });
  }
}
