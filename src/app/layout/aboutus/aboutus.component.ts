import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../core/services/main.service";
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
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
