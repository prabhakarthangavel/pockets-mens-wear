import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../shared/file-upload.service';
import { FileStatus } from '../models/file-status.model';
import { Subscription } from 'rxjs';
import { ManageStockService } from './manage-stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.scss']
})
export class ManageStockComponent implements OnInit {
  public subscription: Subscription;
  public selectedFiles: FileList;
  public files: File[];
  public currentFileUpload: FileUpload;
  public percentage: number = 0;
  public fileStatus: FileStatus[] = [];
  public fileNames: string[] = [];
  public imageUrl: string;
  public stockForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    category: ['', Validators.required],
    actualPrice: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9₹]\d*)?$/)]],
    discountedPrice: ['', Validators.pattern(/^-?(0|[1-9₹]\d*)?$/)],
    small: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    medium: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    large: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    xlarge: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    xxlarge: ['', Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
    description: ['']
  });
  public categories = ['Shirts', 'Jackets', 'Tshirts', 'Jeans', 'Casual Shoes', 'Sports Shoes', 'Sweatshirts', 'Kurtas', 'Trousers'];
  constructor(private fb: FormBuilder, private _fileUploadService: FileUploadService, private _stockService: ManageStockService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  get f() {
    return this.stockForm.controls;
  }

  generateFileName(type: string[]) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result + new Date().getTime() ;
    // + '.' + type[type.length - 1];
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.files = Array.from(this.selectedFiles);
    let i = 0;
    this.files.forEach(file => {
      i++;
      if (i <= 3) {
        this.fileNames.push(file.name);
        let uniqueName = this.generateFileName(file.name.split('.'));
        this.upload(new File([file], uniqueName));
        this.imageUrl = this.imageUrl == null ? uniqueName : this.imageUrl + ',' + uniqueName;
      }
    })
  }

  upload(file: File): void {
    this.percentage = 0;
    if (file) {
      this.currentFileUpload = new FileUpload(file);
      this._fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
          if (percentage == 100) {
            const index = this.fileNames.indexOf(file.name);
            this.fileNames.splice(index, 1);
            this.fileStatus.push(new FileStatus(file, this.percentage));
          }
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  deleteFile(file: File, index: number): void {
    this._fileUploadService.deleteFileStorage(file.name);
    this.fileStatus.splice(index, 1);
  }

  formValid(): boolean {
    return this.stockForm.valid && (this.stockForm.controls.small.value != "" || this.stockForm.controls.medium.value != "" || this.stockForm.controls.large.value != "" ||
      this.stockForm.controls.xlarge.value != "" || this.stockForm.controls.xxlarge.value != "");
  }

  submit(): void {
    const stock = {
      name: this.stockForm.value.name,
      category: this.stockForm.value.category,
      actualPrice: this.replaceINR(this.stockForm.value.actualPrice),
      dicountedPrice: this.replaceINR(this.stockForm.value.discountedPrice),
      description: this.stockForm.value.description,
      imageUrl: this.imageUrl,
      sizes: {
        small: this.stockForm.value.small,
        medium: this.stockForm.value.medium,
        large: this.stockForm.value.large,
        xlarge: this.stockForm.value.xlarge,
        xxlarge: this.stockForm.value.xxlarge
      }
    }
    console.log(stock)
    this.subscription = this._stockService.createStock(stock).subscribe(
      response => {
        if (response && response.status == 200) {
          this._snackBar.open("Stock Created Successfully!", "Close", {
            duration: 5000,
            verticalPosition: 'top'
          }); 
        }
      })
  }

  replaceINR(value: string): string {
    let index = value.indexOf('₹');
    if (index > -1) {
      return value.substring(0, index) + value.substring(index + 1);
    }
    return value;
  }

  ngOnDestroy() {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

}
