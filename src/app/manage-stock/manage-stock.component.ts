import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUpload } from '../models/file-upload.model';
import { FileUploadService } from '../shared/file-upload.service';
import { FileStatus } from '../models/file-status.model';

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
  public fileStatus: FileStatus[] = [];
  public fileNames: string[] = [];
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
    console.log('file selected',event)
    this.selectedFiles = event.target.files;
    this.files = Array.from(this.selectedFiles);
    this.files.forEach(file => {
      this.fileNames.push(file.name);
      this.upload(file);
    })
  }

  upload(file: File): void {
    this.percentage = 0;
    if (file) {
      this.currentFileUpload = new FileUpload(file);
      this._fileUploadService.pushFileToStorage(this.currentFileUpload).subscribe(
        percentage => {
          this.percentage = Math.round(percentage ? percentage : 0);
          if (percentage == 100)  {
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
    console.log(file, index);
  }

}
