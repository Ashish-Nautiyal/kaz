import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  blogInfo: any;
  id: any;

  constructor(private activateRoute: ActivatedRoute, private blogService: BlogService, private router: Router) { }

  ngOnInit(): void {
    this.getParamId();
    this.getBlogInfo();
  }

  getParamId() {
    this.activateRoute.paramMap.subscribe(
      res => {
        this.id = res.get('id');
      }
    );
  }

  getBlogInfo() {
    this.blogService.getBlogDetail(this.id).subscribe(
      res => {
        this.blogInfo = res.data;
      }, error => console.log(error)
    )
  }

  goBack() {
    this.router.navigate(['/admin/blog']);
  }
}