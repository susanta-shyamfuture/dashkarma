import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../core/services/main.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blogList:any =[];
  imageBaseUrl: any;
  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    this.getBlogList();
  }

  getBlogList() {
    this.mainService.getbloglist().subscribe(
      res => {
        console.log("Blog List 123==>", res);
        this.blogList = res['result'];
       // this.reviewList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

}
