import { Injectable } from '@angular/core';
import { Observable, map, Subject, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../authenticate/auth.service';

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
  private deleteCartItem: string = 'products/removeCartItem';
  public subject$ = new BehaviorSubject(0);
  constructor(private _http: HttpClient, private _authService: AuthService) { }

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
    return this._http.get(environment.baseUrl + this.fetchCartUrl, { observe: 'response' });
  }

  fetchCartPromise(): void {
    if (this._authService.isAuthenticated()) {
      this._http.get<any>(environment.baseUrl + this.fetchCartUrl).toPromise().then(response => {
        let number = response.length;
        this.subject$.next(number);
      }
      );
    }else {
      this.subject$.next(JSON.parse(localStorage.getItem('cartItems') || '[]').length);
    }
  }

  fetchCartDetail(): Observable<any> {
    return this._http.get(environment.baseUrl + this.fetchCartDetailUrl, { observe: 'response' });
  }

  deleteCartProduct(productId: number): Observable<any> {
    return this._http.delete(environment.baseUrl + this.deleteCartItem, { params: { productId: productId }, observe: 'response' });
  }
}
