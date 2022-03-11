import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ManageStockService } from '../manage-stock.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
  public btnDisable: boolean;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private _stockService: ManageStockService
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteConfirm(): void {
    this.btnDisable = true;
    this._stockService.deleteStock(this.data.product.id).subscribe(
      response => {
        if (response && response.status == 200) {
          this.dialogRef.close('deleted');
        }
      }
    );
  }
}
