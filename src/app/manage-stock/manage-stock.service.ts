import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageStockService {
  private createStockURL: string = environment.baseUrl + 'manageStock/createStock';
  constructor(private _http: HttpClient) { }

  public createStock(stockObj: any): Observable<any> {
    return this._http.post(this.createStockURL, stockObj, { observe: 'response' })
  }

  public submitTest() {

  }


}
