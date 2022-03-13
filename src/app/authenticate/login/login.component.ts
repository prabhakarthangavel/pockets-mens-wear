import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public hide = true;
  public loginEnable: boolean = true;
  public loginForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  get form() {
    return this.loginForm.controls;
  }

  login(): void {
    const login: Login = {
        userName: this.loginForm.value.userName,
        password: this.loginForm.value.password
    }
    this.subscription = this._authService.loginUser(login).subscribe(
      response => {
        console.log('response')
      }
    )
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
