import { Injectable } from '@angular/core';
import { Observable, map, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private getProductsUrl: string = 'products/fetchProduct/';
  private getProductDetailUrl: string = 'products/productDetail/';
  private getTopDealsUrl: string = 'products/topDeals';
  private addToCartUrl: string = 'products/addCart';
  private fetchCartUrl: string = 'products/fetchCart';
  private fetchCartDetailUrl: string = 'products/fetchCartDetail';
  public subject$ = new Subject();
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
    return this._http.post(environment.baseUrl + this.addToCartUrl, cart, { observe: 'response' });
  }

  fetchCart(): Observable<any> {
    return this._http.get(environment.baseUrl + this.fetchCartUrl, { observe: 'response'});
  }

  fetchCartPromise(): void {
    // const params = new HttpParams().set('username', username);
    this._http.get<any>(environment.baseUrl + this.fetchCartUrl).toPromise().then(response => {
      let number = response.length;
      this.subject$.next(number);
    }
    );
  }

  fetchCartDetail(): Observable<any> {
    return this._http.get(environment.baseUrl + this.fetchCartDetailUrl, { observe: 'response'});
  }
}
