import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Cart, CartItems } from '../models/product.model';
import { Router } from '@angular/router';
import { AuthService } from '../authenticate/auth.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems: Cart[] = [];
  public totalItems: number = 0;
  public totalDiscount: number = 0;
  public totalPrice: number = 0;
  public totalAmount: number = 0;
  constructor(private _productService: ProductsService, private _router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
    if (this._authService.isAuthenticated()) {
      this._productService.fetchCartDetail().subscribe(
        response => {
          if (response && response.status == 200) {
            response.body.forEach((item: Cart) => {
              let url = '';
              if (item.imageUrl.indexOf(',') > 0) {
                url = 'https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + (item.imageUrl as string).split(',')[0] + '?alt=media'
              } else if (item.imageUrl) {
                url = 'https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + item.imageUrl + '?alt=media';
              } else {
                url = 'https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/assets%2Fimage_not_available.jpg?alt=media';
              }
              const cart: Cart = {
                productId: item.productId,
                actualPrice: item.actualPrice,
                category: item.category,
                discountedPrice: item.discountedPrice,
                imageUrl: url,
                name: item.name,
                quantity: item.quantity,
                size: item.size
              }
              this.totalPrice += item.actualPrice;
              this.totalAmount += item.actualPrice - (item.actualPrice - item.discountedPrice);
              this.totalDiscount += (item.actualPrice - item.discountedPrice);
              this.totalItems++;
              this.cartItems.push(cart);
            });
          }
        }
      )
    } else {
      const cartItems: Cart[] = JSON.parse(localStorage.getItem('cartItems') || '[]');
      cartItems.forEach((item: Cart) => {
        this.totalPrice += item.actualPrice;
        this.totalAmount += item.actualPrice - (item.actualPrice - item.discountedPrice);
        this.totalDiscount += (item.actualPrice - item.discountedPrice);
        this.totalItems++;
        this.cartItems.push(item);
      })
    }

  }

  cardClicked(product: Cart) {
    this._router.navigateByUrl('/productsView?productId=' + product.productId);
  }

  delete(product: Cart) {
    this._productService.deleteCartProduct(product.productId).subscribe(
      response => {
        if (response && response.status == 200) {
          this._productService.subject$.next(--this.totalItems);
          this.cartItems = this.cartItems.filter(items => items.productId != product.productId);
        }
      }
    );
  }

}
