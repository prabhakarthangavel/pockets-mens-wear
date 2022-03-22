import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { Subscription } from 'rxjs';
import { Register } from '../../models/register.model';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  constructor(private fb: FormBuilder, public  _authService: AuthService, private _router: Router, private _snackBar: MatSnackBar) { }

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
        if (response && response.status == 200) {
          localStorage.setItem('token', response.body.status);
          this._router.navigate(['/home']);
        }
      }
    )
  }

  register(): void {
    if (this.registerForm.controls.password.value != this.registerForm.controls.repassword.value) {
      this.invalidPswd = true;
    } else {
      this.invalidPswd = false;
      const register: Register = {
        username: this.registerForm.controls.userName.value,
        firstname: this.registerForm.controls.firstName.value,
        lastname: this.registerForm.controls.lastName.value,
        password: this.registerForm.controls.password.value
      }
      this._authService.registerUser(register).subscribe(
        response => {
          if (response && response.status == 200) {
            this._snackBar.open(response.body.status + " Login Now.", "Close", {
              duration: 5000,
              verticalPosition: 'top'
            });
            this.loginEnable = true;
          }
        }
      )
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
