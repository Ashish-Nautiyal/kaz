import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AboutUsService } from 'src/app/services/about-us.service';

export interface aboutUs {
  _id: string,
  title: string,
  content: string
}

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.scss']
})
export class ContentManagementComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ],
    toolbarHiddenButtons: [
      [
        // 'undo',
        // 'redo',
        // 'bold',
        // 'italic',
        // 'underline',
        // 'strikeThrough',
        // 'subscript',
        // 'superscript',
        // 'justifyLeft',
        // 'justifyCenter',
        // 'justifyRight',
        // 'justifyFull',
        // 'indent',
        // 'outdent',
        // 'insertUnorderedList',
        // 'insertOrderedList',
        // 'heading',
        // 'fontName'
      ],
      [
        // 'fontSize',
        // 'textColor',
        // 'backgroundColor',
        // 'customClasses',
        // 'link',
        // 'unlink',
        // 'insertImage',
        // 'insertVideo',
        // 'insertHorizontalRule',
        // 'removeFormat',
        // 'toggleEditorMode'
      ]
    ]
  };


  showContact: boolean = false;
  document: aboutUs = {
    _id: '',
    title: '',
    content: ''
  };

  constructor(private aboutUsservice: AboutUsService) { }

  ngOnInit(): void {
    this.getAboutUs();
  }

  showContactUs() {
    this.showContact = true;
  }

  showAboutUs() {
    this.showContact = false;
  }

  saveAboutUs() {
    this.aboutUsservice.addAboutUs({ title: this.document.title, content: this.document.content }).subscribe(
      res => {
        this.getAboutUs();
      }, error => console.log(error)
    );
  }

  getAboutUs() {
    this.aboutUsservice.getAboutUs().subscribe(
      res => {
        if (res.data.length > 0) {
          this.document = res.data[0];
        }
      }, error => console.log(error)
    );
  }

  updateAboutUs() {
    this.aboutUsservice.updateAboutUs({ _id: this.document._id, title: this.document.title, content: this.document.content }).subscribe(
      res => {
        this.getAboutUs();
      }, error => console.log(error)
    );
  }
}