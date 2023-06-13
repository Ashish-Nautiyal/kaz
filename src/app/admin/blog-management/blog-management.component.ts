import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BlogService } from 'src/app/services/blog.service';
import { BlogEditDialogComponent } from '../blog-edit-dialog/blog-edit-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss'],
})
export class BlogManagementComponent implements OnInit {
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

  showForm: boolean = false;
  blogList: any[] = [];
  blogForm: any;
  selectedBlogImage: any;
  blogUrl:any;

  constructor(private fb: FormBuilder, private blogService: BlogService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getBlogForm();
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe(
      res => {
        this.blogList = res.data;
      }, error => console.log(error)
    );
  }

  showBlogForm() {
    this.showForm = true;
  }

  hideBlogForm() {
    this.showForm = false;
  }

  getBlogForm() {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [this.htmlContent],
      url: ['', [Validators.pattern('^[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$'), Validators.minLength(3)]],
      blog_image: ['', Validators.required],
    });
  }
 
  onSubmit() {
    const formData = new FormData();
    formData.append('title', this.blogForm.controls['title'].value);
    formData.append('url', this.blogForm.controls['url'].value);
    formData.append('blog_image', this.selectedBlogImage);
    formData.append('description', this.htmlContent);

    this.blogService.addBlog(formData).subscribe(
      res => {
        this.hideBlogForm();
        this.getBlogs();
        this.getBlogForm();
      }, error => console.log(error)
    );
  }

  onFileselect(event: any) {
    let file = event.target.files[0];
    this.selectedBlogImage = file;
  }

  editBlog(id: any) {
    this.blogService.editBlog(id).subscribe(
      res => {
        let data = res.data;
        let dialogRef = this.dialog.open(BlogEditDialogComponent, {
          width: '820px',
          height: '720px',
          data: data
        });

        dialogRef.afterClosed().subscribe(
          res => {
            if (res) {
              this.getBlogs();
            }
          }, error => console.log(error)
        );
      }, error => console.log(error)
    );
  }

  deleteBlog(id: any) {
    let del = confirm('Are you sure?');
    if (!del)
      return;
    this.blogService.deleteBlog(id).subscribe(
      res => {
        this.getBlogs();
      }, error => console.log(error)
    );
  }

  blogDetail(id: any) {
    this.router.navigate(['/admin/blogDetail', id]);
  }

  search(searchString: any) {
    if (searchString == '') {
      this.getBlogs();
    } else {
      this.blogService.searchBlog(searchString).subscribe(
        res => {
          this.blogList = res.data;
        }, error => console.log(error)
      );
    }
  }
}