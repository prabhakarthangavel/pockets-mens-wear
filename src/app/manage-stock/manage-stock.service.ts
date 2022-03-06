import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageStockService {
  private createStockURL: string = environment.baseUrl + 'manageStock/createStock';
  private fetchProductsURl: string = environment.baseUrl + 'products/fetchProduct';
  private editStockURL: string = environment.baseUrl + 'manageStock/editStock';
  constructor(private _http: HttpClient) { }

  public createStock(stockObj: any): Observable<any> {
    return this._http.post(this.createStockURL, stockObj, { observe: 'response' })
  }

  public fetchStock(): Observable<any> {
    return this._http.get(this.fetchProductsURl, { observe: 'response' });
  }

  public editStock(stockObj: any): Observable<any> {
    return this._http.post(this.editStockURL, stockObj, { observe: 'response' })
  }

  public submitTest() {

  }


}
