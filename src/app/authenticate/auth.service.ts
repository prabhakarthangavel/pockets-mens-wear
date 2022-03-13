import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL: string = environment.baseUrl + 'authenticate/loginUser';
  private _spinner = new Subject();
  public spinner = this._spinner.asObservable();

  constructor(private _http: HttpClient) { }

  spinnerState(value: boolean): void {
    this._spinner.next(value);
  }

  loginUser(loginObj: Login): Observable<any> {
    return this._http.post(this.loginURL, loginObj, { observe: 'response' });
  }
}
