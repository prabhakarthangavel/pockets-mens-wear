import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../models/product.model';
import { FileUploadService } from '../shared/file-upload.service';
import { AuthService } from '../authenticate/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public category: string;
  public subscription: Subscription;
  public productList: Product[] = [];
  constructor(private route: ActivatedRoute, private _productsService: ProductsService, public _uploadService: FileUploadService,
    public _authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      param => {
        this.category = param.category;
        this.productList = [];
        this.subscription = this._productsService.getProducts(this.category).subscribe(
          response => {
            if (response && response.status == 200) {
              for (let i = 0; i < response.body.length; i++) {
                console.log(response)
                let urls: string[] = [];
                if (response.body[i].imageUrl && response.body[i].imageUrl.indexOf(',') > 0) {
                  response.body[i].imageUrl.split(',').forEach((img: string) => {
                    urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + img + '?alt=media');
                  })
                }else if (response.body[i].imageUrl) {
                  urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + response.body[i].imageUrl + '?alt=media');
                } else {
                  urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/assets%2Fimage_not_available.jpg?alt=media')
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
      });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
