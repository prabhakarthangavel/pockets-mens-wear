import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HttpClient } from '@angular/common/http';
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import { from, Observable, switchMap } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FileUpload } from '../models/file-upload.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private basePath = '/uploads';

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage, private _http: HttpClient) { }

  public pushFileToStorage(fileUpload: FileUpload): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.saveFileData(fileUpload);
        });
      })
    ).subscribe();
    return uploadTask.percentageChanges();
    // const array = [10, 20, 100];
    // const result = from(array)
    // return result;
  }

  private saveFileData(fileUpload: FileUpload): void {
    this.db.list(this.basePath).push(fileUpload);
  }

  public getFiles(numberItems: number): AngularFireList<FileUpload> {
    return this.db.list(this.basePath, ref =>
      ref.limitToLast(numberItems));
  }

  public deleteFile(fileUpload: FileUpload): void {
    this.deleteFileDatabase(fileUpload.key)
      .then(() => {
        this.deleteFileStorage(fileUpload.name);
      })
      .catch(error => console.log(error));
  }

  private deleteFileDatabase(key: string): Promise<void> {
    return this.db.list(this.basePath).remove(key);
  }

  public deleteFileStorage(name: string): void {
    console.log(name)
    const storageRef = this.storage.ref(this.basePath);
    storageRef.child(name).delete();
  }

  public getImageUrl() : Observable<string> {
    // gs://pockets-mens-wear.appspot.com/uploads/GMEIZY1644760261280.jpg 
    // let url:string;
    // this.storage.ref('/uploads/W6G0tV1645025344917').getDownloadURL().subscribe(
    //   url => {url = url
    //   return url}
    // );
    // return url;
    return this.storage.ref('/uploads/W6G0tV1645025344917').getDownloadURL().pipe(switchMap(url => this._http.get(url, { responseType: 'text'})));
    // let imageUrl;
    // this.storage.ref('/uploads/tBf26w1645096452743.jpg').getDownloadURL().subscribe(
    //   url => {
    //     console.log('response1',url)
    //     this._http.get(url, { responseType: 'blob'}).subscribe(
    //       response => {
    //         console.log('image',response)
    //         imageUrl = response;
    //       });
    //   });
    //  return imageUrl;
  }




}
