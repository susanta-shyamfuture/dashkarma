import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {  MainService} from "../../core/services/main.service";
@Component({
  selector: 'app-cms',
  templateUrl: './cms.component.html',
  styleUrls: ['./cms.component.scss']
})
export class CmsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
  ) { 
    // this.route.params.subscribe(routeParams => {
    //   this.cmsDetails(routeParams.id)
    // });
  }

  ngOnInit() {

  }

  cmsDetails(slug) {
    this.mainService.getCmsDetails(slug).subscribe(
      res => {
        console.log(res);
        this.cmsDetails = res['result'][0];
        console.log(this.cmsDetails);
       //this.settingList = res['result'][0];
      },
      error => {
        console.log(error);
      }
    )
  }

}
