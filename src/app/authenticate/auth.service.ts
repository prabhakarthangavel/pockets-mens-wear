import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _spinner = new Subject();
  public spinner = this._spinner.asObservable();

  constructor() { }

  spinnerState(value: boolean): void {
    console.log('spinnerState Service')
    this._spinner.next(value);
  }
}
