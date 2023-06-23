import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-document-add',
  templateUrl: './upload-document-add.component.html',
  styleUrls: ['./upload-document-add.component.scss']
})
export class UploadDocumentAddComponent {

  constructor(private dialogRef: MatDialogRef<UploadDocumentAddComponent>) { }

  close() {
    this.dialogRef.close(false);
  }
}
