import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _spinner = new BehaviorSubject(true);
  // public spinner = this._spinner.asObservable();

  constructor() { }

  spinnerState(value: boolean): void {
    this._spinner.next(value);
  }
 
  getSpinner(): Observable<any> {
    return this._spinner.asObservable();
  }

}
