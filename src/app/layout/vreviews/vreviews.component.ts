import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../core/services/main.service";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-vreviews',
  templateUrl: './vreviews.component.html',
  styleUrls: ['./vreviews.component.scss']
})
export class VreviewsComponent implements OnInit {
  reviewList:any = [];
  userId:any;
  constructor(
    private mainService: MainService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getreviews(this.userId);
  }

  getreviews(id) {
    var data = {
      "vendor_id": id
    }
    this.mainService.listVendorReview(data).subscribe(
      res => {
        this.reviewList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }


}
