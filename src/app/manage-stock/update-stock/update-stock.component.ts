import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ManageStockService } from '../manage-stock.service';
import { Product } from '../../models/product.model';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.scss']
})
export class UpdateStockComponent implements OnInit, OnDestroy {
  public subscription: Subscription;
  public productList: Product[] = [];
  public spinner: boolean = true;
  constructor(private _stockService: ManageStockService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this._stockService.fetchStock().subscribe(
      response => {
        if (response && response.status == 200) {
          this.spinner = false;
          for (let i = 0; i < response.body.length; i++) {
            console.log(response)
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
      })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data: {name: "name", animal: 'animal'},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }
}
