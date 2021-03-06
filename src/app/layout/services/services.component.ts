import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MainService } from "../../core/services/main.service";
import { PackageComponent } from '../../core/components/package/package.component';
import { ListComponent } from '../services/list/list.component';
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from "../../../environments/environment";
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  subServiceList: any = [];
  cmsDetails: any;
  parentCatDetails: any = {};
  locid: any;
  serviceid: any;
  nearestUser: any = [];
  reviewList:any = [];
  imageBaseUrl:any;
  totalBooking:any={};
  catRating:any={};
  constructor(
    public dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    this.route.params.subscribe(routeParams => {
      console.log("kkkkk==>", routeParams);
      this.locid = routeParams.locid;
      this.serviceid = routeParams.id;
      this.getNearestUser(this.serviceid);
      this.getreviews(this.serviceid);
      this.getSubCatList(routeParams.id)
      // if(routeParams.locid ==0 || routeParams.locid=='') {
      //   this.getSubCatList(routeParams.id)
      // }
      // else {
      //   this.getSubCatListbyLoc();
      // }

    });

    this.getCmsDetails('why-10-karma');
    // this.getCmsDetails('why-10-karma');
  }


  getSubCatList(id) {
    this.spinner.show();
    this.mainService.getSubCatList(id).subscribe(
      res => {
        console.log("Sub Cat List==>", res);
        this.parentCatDetails = res['result']['parent'][0]['detail'];
        console.log("vvvv==>",this.parentCatDetails);
        this.totalBooking = res['result']['parent']['book'];
        this.catRating = res['result']['parent']['review'];
        this.subServiceList = res['result']['list'];
        this.spinner.hide();
      },
      error => {
        console.log(error.error);
        this.spinner.hide();
      }
    )
  }


  getNearestUser(id) {
    var data = {
      "service_id": id
    }
    this.mainService.getNearestUserList(data).subscribe(
      res => {
        console.log("Nearest User List==>", res);
        this.nearestUser = res['result'];
        //   this.subServiceList =res['result']['list'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getreviews(id) {
    var data = {
      "service_id": id
    }
    this.mainService.getReviewsByService(data).subscribe(
      res => {
        console.log("Review List==>", res);
        this.reviewList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

  // getSubCatListbyLoc() {
  //   var data = {
  //     "service_id":this.serviceid,
  //     "location_id":this.locid
  //   }
  //   this.spinner.show();
  //   this.mainService.getSubCatListByLoc(data).subscribe(
  //     res => {
  //       console.log("Sub Cat List By Location==>", res);
  //       // this.parentCatDetails = res['result']['parent'][0]['detail'];
  //       // this.subServiceList =res['result']['list'];
  //       this.spinner.hide();
  //     },
  //     error => {
  //       console.log(error.error);
  //       this.spinner.hide();
  //     }
  //   )

  // }

  // openPackageModal(service) {
  //   let dialogRef = this.dialog.open(PackageComponent, {
  //     width: '800px',
  //     height:'600px',
  //     data: {
  //       "service":service
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   })
  // }
  openPackageModal(service) {
    console.log("kk Service ==>", service);
    if (service.subcategories.length > 0) {
      let dialogRef = this.dialog.open(ListComponent, {
        width: '900px',
        height: '600px',
        data: {
          "service": service
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }
    else {
      let dialogRef = this.dialog.open(PackageComponent, {
        width: '900px',
        height: '600px',
        data: {
          "service": service
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }


  }

  getCmsDetails(slug) {
    this.mainService.getCmsDetails(slug).subscribe(
      res => {
        console.log("CMS Details==>", res);
        this.cmsDetails = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

}
