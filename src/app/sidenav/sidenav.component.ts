import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  isExpanded = true;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _router: Router, public _authService: AuthService) { }

  goProducts(value: string) {
    this._router.navigate(['/products'], { queryParams: { category: value } });
  }

  isMobile(): boolean {
    return window.screen.width < 600 ? true : false;
  }

  userAccount() {
    this._router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
