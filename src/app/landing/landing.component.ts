import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  public subscription: Subscription;
  public productList: Product[] = [];
  constructor(private _router: Router, private _productService: ProductsService) { }

  ngOnInit(): void {
    this.subscription = this._productService.getTopDeals().subscribe(
      response => {
        if (response && response.status == 200) {
          for (let i = 0; i < response.body.length; i++) {
            let urls: string[] = [];
            if (response.body[i].imageUrl && response.body[i].imageUrl.indexOf(',') > 0) {
              response.body[i].imageUrl.split(',').forEach((img: string) => {
                urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + img + '?alt=media');
              })
            } else if (response.body[i].imageUrl) {
              urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + response.body[i].imageUrl + '?alt=media');
            } else {
              urls.push('../../assets/image_not_available.jpg')
            }
            const product = {
              id: response.body[i].id,
              actualPrice: response.body[i].actualPrice,
              category: response.body[i].category,
              description: response.body[i].description,
              discountedPrice: response.body[i].discountedPrice,
              name: response.body[i].name,
              size: response.body[i].sizes,
              imageUrls: urls
            }
            this.productList.push(product);
          }
        }
      });
  }

  goProducts(value: string) {
    this._router.navigate(['/products'], { queryParams: { category: value } }
    );
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
