import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';
import { ProductsService } from '../products/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit, AfterContentInit, OnDestroy {
  public productId: number;
  public product: Product;
  public subscription: Subscription;
  constructor(private route: ActivatedRoute, private _productService: ProductsService) { }

  ngOnInit(): void {
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
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
