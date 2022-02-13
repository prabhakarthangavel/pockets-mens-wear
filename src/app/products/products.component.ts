import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../products/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterContentInit {
  public category: string;
  public subscription: Subscription;
  constructor(private route: ActivatedRoute, private _productsService: ProductsService) { }

  ngOnInit(): void {
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
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
