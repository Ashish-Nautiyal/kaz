import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-blog-management',
  templateUrl: './blog-management.component.html',
  styleUrls: ['./blog-management.component.scss'],
})
export class BlogManagementComponent implements OnInit {

  showForm: boolean = true;
  blogList: any[] = [];
  blogForm: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getBlogForm();
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
      description: ['', Validators.required],
      url: ['', Validators.required],
      blog_image: ['', Validators.required],
    });
  }

  onSubmit() {

  }

  editBlog(id: any) {

  }

  deleteBlog(id: any) {

  }
}
