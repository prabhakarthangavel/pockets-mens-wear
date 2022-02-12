import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _spinner = new Subject();
  public spinner = this._spinner.asObservable();

  constructor() { }

  spinnerState(value: boolean): void {
    this._spinner.next(value);
  }
}
