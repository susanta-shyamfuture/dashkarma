import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
//import { DetailsComponent } from "./details/details.component";
import { CheckoutComponent } from "../checkout/checkout.component";
//import { CartComponent } from "../cart/cart.component";
import { environment } from "../../../../environments/environment";
import { SigninComponent } from "../signin/signin.component";
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  packageList: any = [];
  serviceDetails: any;
  customer_cart_data: any =[];
  userId: any;
  parentCatDetails: any = {};
  subTotal: number = 0;
  total_item_price: any;
  final_price: any;
  visitingCharge: any;
  imageBaseUrl:any;
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private dialogRef: MatDialogRef<CartComponent>,
  ) {
    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    } else {
      this.userId = '';
    }
 //   this.serviceDetails = data.service;
 //   this.getPackageList(this.serviceDetails);
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
    if (localStorage.getItem("cart")) {
      this.customer_cart_data = JSON.parse(localStorage.getItem("cart"));
      this.subTotal = parseFloat(localStorage.getItem('final_price'));
    } else {
      this.customer_cart_data = [];
      this.subTotal = 0;
    }
  }


  closeModal() {
    this.dialogRef.close(true);
  }
  // setCartData() {
  //   localStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
  //   //this.getPackageList(this.serviceDetails);
  //   this.getTotalItemPrice();
  // }
  // addtoCart(item) {
  // //  alert(1);
  //   if (this.userId) {
  //     var data = {
  //       "service_id": item.id,
  //       "quantity": "1",
  //       "unit_price": item.service_charge,
  //     }
  //     var index = this.customer_cart_data.findIndex(y => y.service_id == item.id);
  //     if (index == -1) {
  //       this.customer_cart_data.push(data);
  //       this.setCartData();
  //     }
  //   } else {
  //   }
  // }

  // increment(pkgService, i) {
  //   var index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
  //   if (index != -1) {
  //     this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) + 1;
  //     this.setCartData();
  //   }
  //   this.packageList[i].quantity = this.customer_cart_data[index].quantity;
  // }

  // decrement(pkgService, i) {
  //   var index;
  //   if (pkgService.quantity > 1) {
  //     index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
  //     if (index != -1) {
  //       this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) - 1;
  //       this.packageList[i].quantity = parseInt(pkgService.quantity) - 1;
  //       this.packageList[i].isCart = true;
  //       this.setCartData();
  //       if (this.packageList[i].quantity == 0) {
  //         this.packageList[i].isCart = false;
  //       }
  //     }
  //     this.setCartData();
  //   } else {
  //     index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.id);
  //     if (index != -1) {
  //       this.customer_cart_data.splice(index, 1);
  //     }
  //     this.packageList[i].isCart = false;
  //     this.setCartData();
  //   }
  // }

  // getTotalItemPrice() {
  //   this.total_item_price = 0;
  //   this.customer_cart_data.forEach(x => {
  //     if (x.unit_price > 0) {
  //       this.total_item_price += (x.unit_price * x.quantity);
  //       this.final_price = this.total_item_price;
  //     }
  //     else {
  //       this.total_item_price += (x.unit_price * x.quantity);
  //       this.final_price = this.total_item_price;
  //     }
  //     //this.final_price = this.total_item_price + this.visitingCharge;
  //     localStorage.setItem('item_price', this.total_item_price);
  //     localStorage.setItem('final_price', this.final_price);
  //     // localStorage.setItem('visiting_charge', this.visitingCharge);
  //     this.subTotal = parseFloat(localStorage.getItem('final_price'));

  //   })
  // }

  // gotoCheckOut() {
  //   let dialogRef = this.dialog.open(CheckoutComponent, {
  //     width: '900px',
  //     height: '600px',
  //     // data: {
  //     //   "service":servicelist
  //     // }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //   })
  // }

  setCartData() {
    localStorage.setItem("cart", JSON.stringify(this.customer_cart_data));
   // this.getPackageList(this.serviceDetails);
    this.getTotalItemPrice();
  }
  addtoCart(item) {
 
    if (localStorage.getItem('userId')) {
      var data = {
        "service_id": item.id,
        "service_name": item.name,
        "service_description": item.description,
        "quantity": "1",
        "isCart": true,
        "type": item.type,
        "is_multiple":item.is_multiple,
        "unit_price": item.service_charge,
       // "visiting_charge": item.visiting_charge,
       "image_large": item.image_large,
       // "image_small": item.image_small
      }
      var index = this.customer_cart_data.findIndex(y => y.service_id == item.id);
      if (index == -1) {
        this.customer_cart_data.push(data);
        this.setCartData();
      }
    } else {
      let dialogRef = this.dialog.open(SigninComponent, {
        width: '900px',
        height: '600px',
        // data: {
        //   "service":servicelist
        // }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }

  increment(pkgService, i) {
    var index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.service_id);
    if (index != -1) {
      this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) + 1;
      this.setCartData();
    }
  //  this.packageList[i].quantity = this.customer_cart_data[index].quantity;
  }

  decrement(pkgService, i) {
    var index;
    if (pkgService.quantity > 1) {
      index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.service_id);
      if (index != -1) {
        this.customer_cart_data[index].quantity = parseInt(pkgService.quantity) - 1;
       // alert(pkgService.quantity);
       // this.packageList[i].quantity = parseInt(pkgService.quantity) - 1;
       // this.packageList[i].isCart = true;
        this.setCartData();
        // if (this.packageList[i].quantity == 0) {
        //   this.packageList[i].isCart = false;
        // }
      }
      this.setCartData();
    } else {
      index = this.customer_cart_data.findIndex(y => y.service_id == pkgService.service_id);
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
    })
  }


  removetoCart(item) {
    var index = this.customer_cart_data.findIndex(y => y.service_id == item.service_id); 
    if (index != -1) {
      this.customer_cart_data.splice(index, 1);
      this.setCartData();      
    }
    //this.cartService.cartNumberStatus(true);
    this.mainService.cartNumberStatus(true);
  }


}
