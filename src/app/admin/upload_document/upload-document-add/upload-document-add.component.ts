import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-upload-document-add',
  templateUrl: './upload-document-add.component.html',
  styleUrls: ['./upload-document-add.component.scss']
})
export class UploadDocumentAddComponent implements OnInit {

  selectedDocument: any;
  documentForm: any;

  constructor(private dialogRef: MatDialogRef<UploadDocumentAddComponent>, private docService: DocumentService) { }

  ngOnInit(): void {
    this.documentForm = new FormGroup({
      document: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  onDocumentSelect(event: any) {
    const file: File = event.target.files[0];
    this.selectedDocument = file;
  }

  close() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('document', this.selectedDocument);
    formData.append('title', this.documentForm.controls['title'].value);
    formData.append('description', this.documentForm.controls['description'].value);

    this.docService.addDocument(formData).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    )
  }
}