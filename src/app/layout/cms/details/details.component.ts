import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  cmsDetails:any={};
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(routeParams => {
      this.getCmsDetails(routeParams.id)
     });
  }

  getCmsDetails(name) {
    this.mainService.cmsDetails(name).subscribe(
      res => {
       this.cmsDetails = res['result'][0];
      },
      error => {
        console.log(error);

        
      }
    )
  }

}
