import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentAddComponent } from '../upload-document-add/upload-document-add.component';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent {

  constructor(private dialog: MatDialog) { }

  addNewDocument() {
    this.dialog.open(UploadDocumentAddComponent, {
      height: '600px',
      width: '600px'
    }).afterClosed().subscribe(
      res => {
        console.log(res);
      }
    );
  }
}