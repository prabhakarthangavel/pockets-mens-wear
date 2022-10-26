import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login } from '../models/login.model';
import { environment } from '../../environments/environment';
import { Register } from '../models/register.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL: string = environment.baseUrl + 'authenticate/loginUser';
  private registerURL: string = environment.baseUrl + 'authenticate/register';
  private _spinner = new Subject();
  private loggedinUser: string;
  private role: string;
  public spinner = this._spinner.asObservable();

  constructor(private _http: HttpClient) { }

  spinnerState(value: boolean): void {
    this._spinner.next(value);
  }

  loginUser(loginObj: Login): Observable<any> {
    return this._http.post(this.loginURL, loginObj, { observe: 'response' });
  }

  registerUser(register: Register): Observable<any> {
    return this._http.post(this.registerURL, register, { observe: 'response' });
  }

  isAuthenticated(): boolean {
    const helper: any = new JwtHelperService();
    const token = localStorage.getItem('token');
    if (token != null) {
      const decoded = helper.decodeToken(token);
      if (decoded!) {
        this.setLoggedInUser(decoded.sub);
        this.setRole(decoded.role[0].authority);
        return true;
      }
    }
    return false;
  }

  private setLoggedInUser(username: string) {
    this.loggedinUser = username;
  }
  
  getLoggedInUser() {
    return this.loggedinUser;
  }

  private setRole(role: string) {
    this.role = role;
  }

  getRole() {
    return this.role;
  }
}
