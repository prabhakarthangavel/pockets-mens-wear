import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { DeleteDialogComponent } from '../manage-stock/delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('enableEdit') enableEdit: boolean;
  @Output('reload') reload = new EventEmitter<string>();

  constructor(private _router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editProduct(productId: any) {
    this._router.navigate(['/manage-stock'], { queryParams: { productId: productId } });
  }

  productView(productId: any) {
    if (!this.enableEdit) this._router.navigate(['/productsView'], { queryParams: { productId: productId } });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: { product: this.product },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == 'deleted') this.reload.emit('deleted');
    });
  }

}
