import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../shared/file-upload.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.scss']
})
export class ManageStockComponent implements OnInit {
  public selectedFiles: FileList;
  public files: File[];
  public currentFileUpload: FileUpload;
  public percentage: number = 0;
  public stockForm: FormGroup = this.fb.group({
    name: [''],
    category: [''],
    actualPrice: [''],
    discountedPrice: [''],
    description: ['']
  });
  public categories = ['Shirts', 'Jackets', 'Tshirts', 'Jeans', 'Casual Shoes', 'Sports Shoes', 'Sweatshirts', 'Kurtas', 'Trousers'];
  constructor(private fb: FormBuilder, private _fileUploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  submit() {

  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    this.files = Array.from(this.selectedFiles);
    console.log(this.selectedFiles)
    this.upload();
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFileUpload = new FileUpload(file);
        this._fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

}
