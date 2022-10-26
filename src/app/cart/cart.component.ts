import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Cart } from '../models/product.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cartItems: Cart[] = [];
  constructor(private _productService: ProductsService, private _router: Router) {}

  ngOnInit(): void {
    this._productService.fetchCartDetail().subscribe(
      response => {
        console.log(response)
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
            let cart: Cart = {
              productId: item.productId,
              actualPrice: item.actualPrice,
              category: item.category,
              discountedPrice: item.discountedPrice,
              imageUrl: url,
              name: item.name,
              quantity: item.quantity,
              size: item.size
            }
            this.cartItems.push(cart);
          });
        }
      }
    )
  }

  cardClicked(product: Cart) {
    this._router.navigateByUrl('/productsView?productId=' + product.productId);
  }

  delete() { }

}
