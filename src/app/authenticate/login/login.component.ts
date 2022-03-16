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
  public invalidPswd: boolean;
  public loginForm: FormGroup = this.fb.group({
    userName: ['', Validators.required],
    password: ['', Validators.required],
  });
  public registerForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    userName: ['', [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]],
    password: ['', Validators.required],
    repassword: ['', Validators.required]
  });
  constructor(private fb: FormBuilder, private _authService: AuthService, private _router: Router) { }

  ngOnInit(): void {
  }

  get form() {
    return this.loginForm.controls;
  }

  get regform() {
    return this.registerForm.controls;
  }

  passwordCheck() {
    this.invalidPswd = false;
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

  register(): void {

  }

  createAcc(): void {
    this.loginEnable = false;
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
