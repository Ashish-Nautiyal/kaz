import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-edit-dialog',
  templateUrl: './blog-edit-dialog.component.html',
  styleUrls: ['./blog-edit-dialog.component.scss']
})
export class BlogEditDialogComponent implements OnInit {
  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '8rem',
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

  blogForm: any;
  selectedFile: any = '';

  ngOnInit(): void {
    this.getBlogForm();
    this.setFormValue();
  }

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<BlogEditDialogComponent>,
    private blogService: BlogService
  ) { }

  getBlogForm() {
    this.blogForm = this.fb.group({
      _id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      url: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$')]],
      blog_image: [''],
    });
  }

  setFormValue() {
    this.blogForm.controls['_id'].setValue(this.editData._id);
    this.blogForm.controls['title'].setValue(this.editData.title);
    this.htmlContent = this.editData.description;
    this.blogForm.controls['url'].setValue(this.editData.url);
    this.selectedFile = this.editData.blog_image;
  }

  onFileSelect(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('_id', this.blogForm.controls['_id'].value);
    formData.append('title', this.blogForm.controls['title'].value);
    formData.append('description', this.htmlContent);
    formData.append('url', this.blogForm.controls['url'].value);
    formData.append('blog_image', this.selectedFile);
    this.blogService.updateBlog(formData).subscribe(
      res => {
        this.dialogRef.close(true);
      }, error => console.log(error)
    );
  }

  close() {
    this.dialogRef.close(false);
  }
}