import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  private login: UrlTree;
  private landing: UrlTree;

  constructor(private _authService: AuthService, private router: Router) {
    this.login = this.router.parseUrl('login');
    this.landing = this.router.parseUrl('landing');
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (this._authService.isAuthenticated()) {
      if (route.routeConfig && route.routeConfig.path === 'login') {
        return this.landing;
      } else {
        return true;
      }
    } else {
      if (route.routeConfig && route.routeConfig.path === 'login') {
        return true;
      } else {
        return this.login;
      }
    }
  }
}
