import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UploadDocumentAddComponent } from '../upload-document-add/upload-document-add.component';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-upload-document',
  templateUrl: './upload-document.component.html',
  styleUrls: ['./upload-document.component.scss']
})
export class UploadDocumentComponent implements OnInit {

  documnets: any;

  constructor(private dialog: MatDialog, private docService: DocumentService) { }

  ngOnInit(): void {
    this.getDocumnets();
  }

  addNewDocument() {
    this.dialog.open(UploadDocumentAddComponent, {
      height: '600px',
      width: '600px'
    }).afterClosed().subscribe(
      res => {
        if (res)
          this.getDocumnets();
      }
    );
  }

  getDocumnets() {
    this.docService.getDocuments().subscribe(
      res => {
        this.documnets = res.data;
      }, error => console.log(error)
    );
  }

  deleteDocument(id: any) {
    let del = confirm('Are You Sure ?')
    if (!del)
      return;
    this.docService.deleteDocument(id).subscribe(
      res => {
        this.getDocumnets();
      }, error => console.log(error)
    );
  }
}