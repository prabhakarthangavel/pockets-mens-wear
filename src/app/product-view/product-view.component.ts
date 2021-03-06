import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';
// declare var carousel: any;

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  public productId: number;
  public product: Product;
  public subscription: Subscription;
  public selectedImgUrl: string;
  public spinner: boolean = true;
  public selectedSize: string;
  public count: number = 1;
  public outOfStock: boolean;
  constructor(private route: ActivatedRoute, private _productService: ProductsService) { }

  ngOnInit(): void {
    // new carousel();
    this.route.queryParams.subscribe(
      param => {
        this.productId = param.productId;
        this.subscription = this._productService.getProductDetail(this.productId).subscribe(
          response => {
            if (response && response.status == 200) {
              this.spinner = false;
              let urls: string[] = [];
              response.body.imageUrl.split(',').forEach((img: string) => {
                urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + img + '?alt=media');
              })
              const product = {
                id: response.body.id,
                actualPrice: response.body.actualPrice,
                category: response.body.category,
                description: response.body.description,
                discountedPrice: response.body.discountedPrice,
                name: response.body.name,
                size: response.body.sizes,
                imageUrls: urls
              }
              this.selectedImgUrl = product.imageUrls[0];
              this.product = product;
              this.selectedSize = this.product.size.small > 0 ? 'small' : this.product.size.medium > 0 ? 'medium' : this.product.size.large > 0 ? 'large' :
                this.product.size.xlarge > 0 ? 'xlarge' : this.product.size.xxlarge > 0 ? 'xxlarge' : '';
            }
          });
      });
  }

  imageSelected(imgUrl: string) {
    this.selectedImgUrl = imgUrl;
  }

  chipClicked(size: string) {
    this.outOfStock = false;
    this.selectedSize = size;
    this.count = 1;
  }

  plusMins(value: string) {
    this.outOfStock = false;
    let count = this.selectedSize == 'small' ? this.product.size.small : this.selectedSize == 'medium' ? this.product.size.medium :
      this.selectedSize == 'xlarge' ? this.product.size.xlarge : this.selectedSize == 'xxlarge' ? this.product.size.xxlarge : 0;
    if (value == 'add') {
      if (this.count < count) {
        this.count++;
      }else {
        this.outOfStock = true;
      }
    } else if (value == 'minus' && this.count > 0) {
      this.count--;
    }
  }

  addToCart() {
    const cart = {
      productid: this.productId,
      quantity: this.count,
      size: this.selectedSize
    }
    this.subscription = this._productService.addToCart(cart).subscribe(
      response => { 
        if (response && response.status == 200) {
          console.log("cart ADDED",response)
        }
      })
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
