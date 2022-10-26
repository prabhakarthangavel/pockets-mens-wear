import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';
import { ProductsService } from '../products/products.service';

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
  public cartCount: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private _router: Router, public _authService: AuthService, private _productService: ProductsService) { 
    this._productService.fetchCartPromise();
    this._productService.subject$.subscribe(cartValue => this.cartCount = cartValue)
  }

  goProducts(value: string) {
    this._router.navigate(['/products'], { queryParams: { category: value } });
  }

  isMobile(): boolean {
    return window.screen.width < 600 ? true : false;
  }

  userAccount() {
    this._router.navigate(['/login']);
  }

  goToCart() {
    this._router.navigate(['/cart']);
  }

  logout() {
    localStorage.removeItem('token');
    location.reload();
  }
}
