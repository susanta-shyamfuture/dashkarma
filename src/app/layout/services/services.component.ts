import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MainService } from '../../core/services/main.service';
import { UserService } from '../../core/services/user.service';
import { PackageComponent } from '../../core/components/package/package.component';
import { ListComponent } from '../services/list/list.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../environments/environment';
declare var google; 
@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})

export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('mapCanvas', { static: true }) mapElement: ElementRef;
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
  userId: any;
  addressList: any;
  defaultLocation: any;
  locationList:any=[];
  markers: any;
  map;
  InforObj = [];
  constructor(
    public dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    }
    this.imageBaseUrl = environment.imageEndpoint;
    this.route.params.subscribe(routeParams => {
      console.log('kkkkk==>', routeParams);
      this.locid = routeParams.locid;
      this.serviceid = routeParams.id;
      if (this.userId) {
        this.getAddressList(this.userId);
      } else {
        this.getNearestUser(this.serviceid);
      }
      this.getreviews(this.serviceid);
      this.getSubCatList(routeParams.id);
      // if(routeParams.locid ==0 || routeParams.locid=='') {
      //   this.getSubCatList(routeParams.id)
      // }
      // else {
      //   this.getSubCatListbyLoc();
      // }

    });

    this.getCmsDetails('why-10-karma');
    // this.getCmsDetails('why-10-karma');
    this.getLocation();
  }
  ngAfterViewInit() {
  }

  getSubCatList(id) {
    this.spinner.show();
    this.mainService.getSubCatList(id).subscribe(
      res => {
        console.log('Sub Cat List==>', res);
        this.parentCatDetails = res['result']['parent'][0]['detail'];
        console.log('vvvv==>',this.parentCatDetails);
        this.totalBooking = res['result']['parent']['book'];
        this.catRating = res['result']['parent']['review'];
        this.subServiceList = res['result']['list'];
        this.spinner.hide();
      },
      error => {
        console.log(error.error);
        this.spinner.hide();
      }
    );
  }

  // getNearestUser(id) {
  //   var data = {
  //     'service_id': id
  //   }
  //   this.mainService.getNearestUserList(data).subscribe(
  //     res => {
  //       console.log('Nearest User List==>', res);
  //       this.nearestUser = res['result'];
  //       //   this.subServiceList =res['result']['list'];
  //     },
  //     error => {
  //       console.log(error.error);
  //     }
  //   )
  // }
  
  getAddressList(id) {
    console.log("Address List==>");
    this.userService.userlistAddress(id).subscribe(
      res => {
        console.log("Address List==>", res);
        if (res['status'] && res['result'].length) {
          this.addressList = res['result'];
          this.defaultLocation = this.addressList.filter(address => address.is_default === '1');
          this.getNearestUser(this.serviceid);
          console.log(this.defaultLocation);
        } else {
          this.getNearestUser(this.serviceid);
          // this.toastr.error('Error!!!', '', {
          //   timeOut: 3000,
          // });
        }
      },
      error => {
        console.log(error.error);
      }
    );
  }
  getNearestUser(id) {
    const data = {
      service_category_id: +id,
      location_id: (this.defaultLocation && this.defaultLocation.length) ? +this.defaultLocation[0].id : '',
      customer_id: this.userId ? +this.userId : ''
    };
    this.mainService.getNearestUserList(data).subscribe(
      res => {
        console.log('Nearest User List==>', res);
        this.nearestUser = res['result'];
        //   this.subServiceList =res['result']['list'];
      },
      error => {
        console.log(error.error);
      }
    );
  }

  getreviews(id) {
    var data = {
      'service_id': id
    }
    this.mainService.getReviewsByService(data).subscribe(
      res => {
        console.log('Review List==>', res);
        this.reviewList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getLocation() {

    this.mainService.getLocation().subscribe(
      async res => {
        this.locationList = res['result'];
        this.locationList.map(item => {
          item['lat'] = +item['latitude'];          
          item['lng'] = +item['longitude'];
        });
        this.markers = this.locationList;
        this.markers[0].center = true;
        console.log('Location List==>', this.markers);
        await this.initMap();
      },
      error => {
        console.log(error.error);
      }
    )
  }


  async initMap() {
    //const googleMaps = await getGoogleMaps('AIzaSyBozOMarWpi9n-gu7TkXZR3WH36Admg--Q');
    //const googleMaps = await getGoogleMaps('AIzaSyAkkz_K6d5CBMaY6qOBVSCuybYnP_AkagU');
    const googleMaps = await getGoogleMaps('AIzaSyC9jspFQCh-gIvZs-CZX523CT_KwVCoz1k');
   


    const mapEle = this.mapElement.nativeElement;
    const map = new googleMaps.Map(mapEle, {
      center: this.markers.find((d: any) => d.center),
      zoom: 10,
    });
    this.markers.forEach((markerData: any) => {
      
      const marker = new googleMaps.Marker({
        position: markerData,
        map,
        title: markerData.name
      });

      const infowindow = new google.maps.InfoWindow({
        content: markerData.name,
        maxWidth: 200
    });

    marker.addListener('click', function () {
      //closeOtherInfo();
      infowindow.open(marker.get('map'), marker);
      this.InforObj[0] = infowindow;
  });




      
    });
  }

  // getSubCatListbyLoc() {
  //   var data = {
  //     'service_id':this.serviceid,
  //     'location_id':this.locid
  //   }
  //   this.spinner.show();
  //   this.mainService.getSubCatListByLoc(data).subscribe(
  //     res => {
  //       console.log('Sub Cat List By Location==>', res);
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
  //       'service':service
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   })
  // }
  openPackageModal(service) {
    console.log('kk Service ==>', service);
    if (service.subcategories.length > 0) {
      let dialogRef = this.dialog.open(ListComponent, {
        width: '900px',
        height: '600px',
        data: {
          'service': service
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
          'service': service
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }


  }

  getCmsDetails(slug) {
    this.mainService.getCmsDetails(slug).subscribe(
      res => {
        console.log('CMS Details==>', res);
        this.cmsDetails = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

}
function getGoogleMaps(apiKey: string): Promise<any> {
  const win = window as any;
  const googleModule = win.google;
  if (googleModule && googleModule.maps) {
    return Promise.resolve(googleModule.maps);
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.31`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = () => {
      const googleModule2 = win.google;
      if (googleModule2 && googleModule2.maps) {
        resolve(googleModule2.maps);
      } else {
        reject('google maps not available');
      }
    };
  });

 

}
