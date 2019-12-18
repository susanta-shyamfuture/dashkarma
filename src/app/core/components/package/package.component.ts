import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../../core/services/main.service';
import { DetailsComponent } from './details/details.component';
import { CheckoutComponent } from '../checkout/checkout.component';
import { CartComponent } from '../cart/cart.component';
import { SigninComponent } from '../signin/signin.component';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  packageList: any = [];
  serviceDetails: any;
  customer_cart_data: any;
  userId: any;
  parentCatDetails: any = {};
  subTotal: number = 0;
  total_item_price: any;
  final_price: any;
  visitingCharge: any;
  imageBaseUrl: any;
  isVisible: boolean = false;
  cartCount: any;
  selectedMoment: any;
  assingedDatetime: any;
  today: any = new Date();
  calendarMinDate: any = new Date(this.today.setDate(this.today.getDate() + 3));
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private dialogRef: MatDialogRef<PackageComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      dialogRef.disableClose = true;
      mainService.getCartNumberStatus.subscribe(status => this.cartNumberStatus(status));
      if (localStorage.getItem('userId')) {
        this.userId = localStorage.getItem('userId');
      } else {
        this.userId = '';
      }
      this.serviceDetails = data.service;
      this.getPackageList(this.serviceDetails);
  }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    // if (localStorage.getItem("cart")) {
    //   this.customer_cart_data = JSON.parse(localStorage.getItem("cart"));
    //   this.subTotal = parseFloat(localStorage.getItem('final_price'));
    // } else {
    //   this.customer_cart_data = [];
    //   this.subTotal = 0;
    // }
    if (localStorage.getItem('cart')) {
      this.customer_cart_data = JSON.parse(localStorage.getItem('cart'));
      this.cartCount =  this.customer_cart_data.length;
      this.subTotal = parseFloat(localStorage.getItem('final_price'));
    } else {
      this.customer_cart_data = [];
      this.cartCount = 0;
      this.subTotal = 0;
    }
  }

  cartNumberStatus(status: boolean) {
    if (status) {
      if (localStorage.getItem('cart')) {
        this.cartCount = JSON.parse(localStorage.getItem('cart')).length;
      } else {
        this.cartCount = 0;
      }
    }
  }

  getPackageList(service) {
    const data = {
      service_cat_id: service.id,
      service_id: ''
    };
    this.mainService.getPackageList(data).subscribe(
      res => {
        this.isVisible = true;
        this.parentCatDetails = res['result']['parent'][0]['detail'];
        this.packageList = res['result']['list'];
        this.packageList.forEach((x, i) => {
          var index = this.customer_cart_data.findIndex(y => y.service_id == x.id);
          if (index != -1) {
            this.packageList[i].isCart = true;
            this.packageList[i].quantity = this.customer_cart_data[index].quantity;
          } else {
            this.packageList[i].isCart = false;
            this.packageList[i].quantity = 0;
          }
        })
      },
      error => {
        this.isVisible = true;
        console.log(error.error);
      }
    )
  }
  backModal() {
    this.dialogRef.close(true);
  }

  closeModal() {
    this.dialog.closeAll();
  }
  setCartData() {
    localStorage.setItem('cart', JSON.stringify(this.customer_cart_data));
    this.getPackageList(this.serviceDetails);
    this.getTotalItemPrice();
  }
  addtoCart(item,dateValue) {
    this.assingedDatetime = dateValue._selected ? moment(dateValue._selected).format('YYYY-MM-DD HH:m:s') : moment().add(3, 'd').format('YYYY-MM-DD HH:m:s');
    if (localStorage.getItem('userId')) {
      var data = {
        service_id : item.id,
        service_name : item.name,
        service_description : item.description,
        quantity :  1 ,
        isCart : true,
        type : item.type,
        is_multiple : item.is_multiple,
        unit_price : item.service_charge,
       //  visiting_charge : item.visiting_charge,
        image_large : item.image_large,
        assinged_datetime: this.assingedDatetime,
        service_category_id: item.pid1
       //  image_small : item.image_small
      };
      var index = this.customer_cart_data.findIndex(y => y.service_id == item.id);
      if (index == -1) {
        this.customer_cart_data.push(data);
        this.setCartData();
        this.mainService.cartNumberStatus(true);
      }
      this.selectedMoment = '';
    } else {
      let dialogRef = this.dialog.open(SigninComponent, {
        width: '900px',
        height: '600px',
        // data: {
        //   "service":servicelist
        // }
      });
      dialogRef.afterClosed().subscribe(result => {
      });
    }
  }

  increment(pkgService, i) {
    var index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) + 1;
      this.setCartData();
    }
    this.packageList[i].quantity = this.customer_cart_data[index].quantity;
  }

  decrement(pkgService, i) {
    var index;
    if (pkgService.quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) - 1;
        this.packageList[i].quantity = parseInt(pkgService.quantity) - 1;
        this.packageList[i].isCart = true;
        this.setCartData();
        if (this.packageList[i].quantity == 0) {
          this.packageList[i].isCart = false;
        }
      }
      this.setCartData();
    } else {
      index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
      if (index != -1) {
        this.customer_cart_data.splice(index, 1);
      }
      this.packageList[i].isCart = false;
      this.setCartData();
    }
    this.mainService.cartNumberStatus(true);
  }

  getTotalItemPrice() {
    this.total_item_price = 0;
    this.customer_cart_data.forEach(x => {
      if (x.unit_price > 0) {
        this.total_item_price += (x.unit_price * x.quantity);
        this.final_price = this.total_item_price;
      }
      else {
        this.total_item_price += (x.unit_price * x.quantity);
        this.final_price = this.total_item_price;
      }
      //this.final_price = this.total_item_price + this.visitingCharge;
      localStorage.setItem('item_price', this.total_item_price);
      localStorage.setItem('final_price', this.final_price);
      // localStorage.setItem('visiting_charge', this.visitingCharge);
      this.subTotal = parseFloat(localStorage.getItem('final_price'));

    })
  }

  gotoCheckOut() {
    let dialogRef = this.dialog.open(CheckoutComponent, {
      width: '900px',
      height: '600px',
      // data: {
      //   "service":servicelist
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  gotoCart() {
    let dialogRef = this.dialog.open(CartComponent, {
      width: '900px',
      height: '600px',
      // data: {
      //   "service":servicelist
      // }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPackageList(this.serviceDetails);
    })
  }


  removetoCart(item) {
    var index = this.customer_cart_data.findIndex(y => y.service_id == item.id); 
    if (index != -1) {
      this.customer_cart_data.splice(index, 1);
      this.setCartData();      
    }
    this.mainService.cartNumberStatus(true);
  }
}
