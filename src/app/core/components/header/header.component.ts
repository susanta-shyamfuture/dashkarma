import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { CartComponent } from '../cart/cart.component';
import { UserService } from "../../../core/services/user.service";
import { Router, NavigationEnd } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
import { environment } from "../../../../environments/environment";
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        height: '*',
        margin: '*',
        padding: '*',
        visibility: 'visible',
        opacity: '1'
      })),
      state('close', style({
        height: '0px',
        margin: '0px',
        padding: '0px',
        visibility: 'hidden',
        opacity: '0'
      })),
      transition('open <=> close', animate(300))
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @ViewChild('topNav', { static: true }) public topNav: ElementRef;
  public openCloseAnim: string = 'open';
  loggedIn: any;
  userName: any;
  catList: any = [];
  settingList:any={};
  imageBaseUrl: any;
  locId:any;
  customer_cart_data:any;
  cartCount:any;
  userType:any;
  constructor(
    public dialog: MatDialog,
    private router: Router,
    public userService: UserService,
    private mainService: MainService,
  ) {
    this.imageBaseUrl = environment.imageEndpoint;
    mainService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
    userService.getLoggedInStatus.subscribe(status => this.changeStatus(status));
    router.events.pipe(
      filter(e => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.closeNav();
      if (localStorage.getItem('cart')) {
        this.customer_cart_data = JSON.parse(localStorage.getItem('cart'));
        this.cartCount = this.customer_cart_data.length;
      } else {
        this.customer_cart_data = [];
        this.cartCount = 0;
      }
      // logger.log(e.id, e.url);
    });
  }

  ngOnInit() {
    this.loadUserInfo();
    this.getServicesList();
    this.getSettings();
  }

  expandClose() {
    // console.log(topNav);
    if (this.openCloseAnim === 'open') {
      this.closeNav();
    } else {
      this.expandNav();
    }
  }
  closeNav() {
    setTimeout(() => {
      this.topNav.nativeElement.classList.remove('show');
    }, 500);
    this.openCloseAnim = 'close';
  }
  expandNav() {
    this.topNav.nativeElement.classList.add('show');
    this.openCloseAnim = 'open';
  }


  cartNumberStatus(status: boolean) {
    if (status) {
      if (localStorage.getItem("cart")) {
        this.cartCount = JSON.parse(localStorage.getItem("cart")).length;
      }
      else {
        this.cartCount = 0;
      }

   
    }
  }

  openSigninModal() {
    let dialogRef = this.dialog.open(SigninComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openSignupModal() {
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  private changeStatus(status: boolean) {
    if (status) {
      //alert(0);
      this.loadUserInfo();
    }
  }

  loadUserInfo() {
    if (localStorage.getItem('isLoggedin')) {
      this.loggedIn = true;
      this.userName = localStorage.getItem('userName');
      this.userType = localStorage.getItem('userType');
    }
    else {
      this.loggedIn = false;
    }
  }

  getServicesList() {
    this.mainService.getParentCatList(0).subscribe(
      res => {
        //alert(this.keepLogin);
        // console.log("Category List==>", res);
        this.catList = res['result']['list'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

  getSettings() {
    this.mainService.getSettings().subscribe(
      res => {
      //  console.log("Settings==>",res);
       this.settingList = res['result'][0];
      },
      error => {
        console.log("Error Get Category",error);
      }
    );
  }

  gotoServicePage(id) {
    this.router.navigateByUrl('/services/' + id);
  }

  logOut() {
    localStorage.clear();
    this.loggedIn = false;
    this.mainService.cartNumberStatus(true);
    this.router.navigate(['/']);
  }

  gotoCart() {
    if (this.loggedIn) {
      const dialogRef = this.dialog.open(CartComponent, {
        width: '900px',
        height: '900px',
        data: {}
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    } else {
      this.openSigninModal();
    }
  }

}
