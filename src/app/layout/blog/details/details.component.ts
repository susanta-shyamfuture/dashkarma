import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../core/services/main.service';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  blogList: any = [];
  blogData: any;
  imageBaseUrl: any;

  blogid: any;

  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
        // this.blogList = [];
        this.blogData = '';
      }

      if (event instanceof NavigationEnd) {
        this.blogid = this.route.snapshot.params.id;
        this.getBlogData(this.route.snapshot.params.id);
        this.getBlogList();
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
      }
    });
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    this.getBlogData(this.route.snapshot.params.id);
    this.getBlogList();
  }

  getBlogData(blogId) {
    this.mainService.getBlogById(blogId).subscribe(
      res => {
        this.blogData = res['result'];
      },
      error => {
        console.log(error.error);
      }
    );
  }

  getBlogList() {
    this.mainService.getbloglist().subscribe(
      res => {
        this.blogList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    );
  }

  removeCurrent(blogList) {
    //console.log("cc==>",blogList);
    
    return blogList.filter(item => ((item.id !== this.blogid) && (+item.is_active)));
  }

  trackByBlogId(index: number, blog: any): string {
    return blog.id;
  }

}
