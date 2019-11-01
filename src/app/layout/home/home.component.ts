import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { environment } from "../../../environments/environment";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import {  forkJoin} from 'rxjs';
//Services 
import {  UserService} from "../../core/services/user.service";
import {  MainService} from "../../core/services/main.service";
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ViewChild('owlElement',{static: false}) owlElement: OwlCarousel
  requestForm: FormGroup;
  submitted = false;
  searchForm: FormGroup;
  submittedSearch = false;
  bannerList: any = [];
  imageBaseUrl: any;
  visibleKey: boolean = false;
  searchList:any=[];
  selectedService:any;
  serviceId:any;
  locId:any;
  blogList:any=[];
  recentWorkList:any=[];
  partnerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  bannerOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['<img class="d-block w-100" src="assets/img/angle-left.png" alt="">', '<img class="d-block w-100" src="assets/img/angle-right.png" alt="">'],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }


  testimonialOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],

    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  images: any = [];
  catList: any = [];
  mediaList: any = [];
  testimonialList:any=[];
  citylist:any=[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private userService: UserService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;

    this.requestForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Za-z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
    });

    this.searchForm = this.formBuilder.group({
      citylist: [''],
      searchtxt: ['', [Validators.required]],
    });

    this.images = [{
      image: 'assets/img/Partner1.jpg',
    },
    {
      image: 'assets/img/Partner2.jpg',
    },
    {
      image: 'assets/img/Partner3.jpg',
    },
    {
      image: 'assets/img/Partner4.jpg',
    }, {
      image: 'assets/img/Partner5.jpg',
    }, {
      image: 'assets/img/Partner6.jpg',
    }, {
      image: 'assets/img/Partner7.jpg',
    }
    ]

    //   this.getBannerList();
    // this.getServicesList();
    this.getAllData();

  }

  getAllData() {
    this.spinner.show();
    var forkArray = [];
    var data = {
      'type': 1
    }
   
    var dataTest = {

    }
    forkArray.push(this.mainService.getBannerList(data))
    forkArray.push(this.mainService.getParentCatList(0))
   // forkArray.push(this.mainService.getBannerList(dataMedia))
    forkArray.push(this.mainService.getTestimonials(dataTest))
    forkArray.push(this.mainService.getCityList())
    forkArray.push(this.mainService.getbloglist())
   // forkArray.push(this.mainService.getBannerList(dataRecentWork))

    forkJoin(forkArray).subscribe(
      (result: any[]) => {
        for (var i = 0; i < result.length; i++) {
          if (i == 0) {
            this.bannerList = result[i].result['Banner'];
            this.mediaList = result[i].result['Partner'];
            this.recentWorkList = result[i].result['Recent_Work'];
          }
          if (i == 1) {
            this.catList = result[i].result.list;
          }

          // if (i == 2) {
          //   this.mediaList = result[i].result;
          // }
          if (i == 2) {
            this.testimonialList = result[i].result;
          }
          if (i == 3) {
            this.citylist = result[i].result;
            this.searchForm.patchValue({
              citylist: this.citylist[0].id
            })
          }
          if (i == 4) {
            this.blogList = result[i].result;
          }
          // if (i == 5) {
          //   this.recentWorkList = result[i].result;
          // }
        }
        this.visibleKey = true;
        this.spinner.hide();
      },
      err => {
        this.toastr.error('Something went wrong', '', {
          timeOut: 3000,
        });
      }
    )
  }

  gotoServicePage(id) {
    this.router.navigateByUrl('/services/' + id);
  }

  get f() {
    return this.requestForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.requestForm.invalid) {
      return;
    } else {
      var data = {
        "name": this.requestForm.value.name,
        "email": this.requestForm.value.email,
        "phone": this.requestForm.value.phone,
        "subject": this.requestForm.value.subject,
        "message": this.requestForm.value.message
      }
      this.mainService.contactus(data).subscribe(
        res => {
          this.submitted = false;
          this.requestForm.reset();
          this.toastr.success('Request a callback successfully send', '', {
            timeOut: 4000,
          });
        },
        error => {
          console.log(error.error);
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
        }
      )
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  get fs() { return this.searchForm.controls; }

  onSearch() {
    this.submittedSearch = true;
    if (this.searchForm.invalid) {
      return;
    } else {

    var data = {
      "service_id":this.selectedService,
      "location_id":this.searchForm.value.citylist
    }
    this.mainService.getSearchResultStatus(data).subscribe(
      res => {
        if(res['status'] ==false) {
        this.toastr.error("Sorry, at present we don’t provide service in this location", '', {
                  timeOut: 3000,
        });
        }
        else {
          this.router.navigateByUrl('/services/' + this.selectedService);
        }
      },
      error => {
        console.log(error.error);
      }
    )
    }
  }

  searchClient(searchKey) {
  }

  onSearchChange(searchKey) {
   // if(searchKey.length>2) {
      this.mainService.searchServices(searchKey).subscribe(
        res => {
          this.searchList = res['result'];
        },
        error => {
          console.log(error.error);
          // this.toastr.error('Error!!!', '', {
          //   timeOut: 3000,
          // });
        }
      )
  //  }
    
  }

  getLocation(locid) {
    this.locId = locid;
  }

  selectSearchService(key) {
    this.selectedService = key.id;
    this.searchForm.value.searchtxt = key.name;

    //this.searchForm.setValue({ citylist:2  , searchtxt: 'Drew'});
    this.searchForm.patchValue({
      searchtxt: key.name
    })
  }

  // getSearchResult() {
  //   var data = {
  //     "service_id":this.selectedService ,
  //     "location_id":this.locId
  //   }
  //   this.mainService.getSearchResultStatus(data).subscribe(
  //     res => {
  //       // this.searchList = res['result'];
  //     },
  //     error => {
  //       // this.toastr.error('Error!!!', '', {
  //       //   timeOut: 3000,
  //       // });
  //     }
  //   )
  // }

}
