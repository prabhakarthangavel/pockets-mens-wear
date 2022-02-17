import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterContentInit {
  public category: string;
  public subscription: Subscription;
  public productList: Product[];
  constructor(private route: ActivatedRoute, private _productsService: ProductsService, public _uploadService: FileUploadService) { }

  ngOnInit(): void {
    this._uploadService.getImageUrl();
    this.route.queryParams.subscribe(
      param => {
        this.category = param.category;
      });
      console.log(this.category)
  }

  ngAfterContentInit() {
    if (this.category) {
      this.subscription = this._productsService.getProducts(this.category).subscribe(
        response => {
          console.log(response)
          if (response && response.status == 200) {
            this.productList = response.body;
          }
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
