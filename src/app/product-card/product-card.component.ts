import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('enableEdit') enableEdit: boolean;

  constructor(private _router: Router) { }

  ngOnInit(): void {
    console.log('enableedit', this.enableEdit)
  }

  cardClicked(productId: any) {
    if (!this.enableEdit) {
      this._router.navigate(['/productsView'], { queryParams: { productId: productId } });
    } else {
      this._router.navigate(['/manage-stock'], { queryParams: { productId: productId } });
    }
  }

}
