import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
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
export class ProductViewComponent implements OnInit, AfterContentInit, OnDestroy {
  public productId: number;
  public product: Product;
  public subscription: Subscription;
  public selectedImgUrl: string;
  constructor(private route: ActivatedRoute, private _productService: ProductsService) { }

  ngOnInit(): void {
    // new carousel();
    this.route.queryParams.subscribe(
      param => {
        this.productId = param.productId;
      });
  }

  ngAfterContentInit() {
    if (this.productId) {
      this.subscription = this._productService.getProductDetail(this.productId).subscribe(
        response => {
          console.log(response)
          if (response && response.status == 200) {
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
          }

        });
    }
  }

  imageSelected(imgUrl: string) {
    console.log(imgUrl)
    this.selectedImgUrl = imgUrl;
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
