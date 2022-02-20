import { AfterContentInit, Component, OnInit } from '@angular/core';
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
export class ProductsComponent implements OnInit, AfterContentInit {
  public category: string;
  public subscription: Subscription;
  public productList: Product[] = [];
  constructor(private route: ActivatedRoute, private _productsService: ProductsService, public _uploadService: FileUploadService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      param => {
        this.category = param.category;
      });
      console.log(this.category)
      if (this.category) { 
        this._authService.spinnerState(true);
        this.subscription = this._productsService.getProducts(this.category).subscribe(
          response => {
            console.log(response)
            if (response && response.status == 200) {
              this._authService.spinnerState(false);
              for (let i=0;i<response.body.length;i++) {
                let urls: string[] = [];
                response.body[i].imageUrl.split(',').forEach((img : string)=> {
                  urls.push('https://firebasestorage.googleapis.com/v0/b/pockets-mens-wear.appspot.com/o/uploads%2F' + img + '?alt=media');
                })
                const product = {
                  actualPrice: response.body[i].actualPrice,
                  category: response.body[i].category,
                  description: response.body[i].description,
                  discountedPrice: response.body[i].discountedPrice,
                  name: response.body[i].name,
                  size: response.body[i].sizes,
                  imageUrls: urls
                }
                console.log(product.name.length)
                this.productList.push(product);
              }
            }
          });
      }
  }

  ngAfterContentInit() {
   
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
