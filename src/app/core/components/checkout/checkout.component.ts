import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressComponent } from '../address/address.component';
import { UserService } from '../../../core/services/user.service';
import { MainService } from '../../../core/services/main.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  addressList: any = [];
  userId: any;
  userselectedAddress: any;
  userselectedPayment: any;
  customer_cart_data: any = [];
  subTotal: number = 0;
  isShow:any=0;

  constructor(
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CheckoutComponent>,
    private _formBuilder: FormBuilder,
    public userService: UserService,
    public mainService: MainService,
    private toastr: ToastrService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getAddressList(this.userId);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['2', Validators.required]
    });

    if (localStorage.getItem('cart')) {
      this.customer_cart_data = JSON.parse(localStorage.getItem('cart'));
      this.subTotal = parseFloat(localStorage.getItem('final_price'));
    } else {
      this.customer_cart_data = [];
      this.subTotal = 0;
    }
  }

  ngAfterViewInit() {
    this.getAddressList(this.userId);
  }

  ngAfterContentInit() {
    this.getAddressList(this.userId);
  }

  backModal() {
    this.dialogRef.close(true);
  }

  closeModal() {
    //localStorage.clear();
    this.dialog.closeAll();
  }

  openAddModal() {
    let dialogRef = this.dialog.open(AddressComponent, {
      width: '900px',
      height: '600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAddressList(this.userId);
    })
  }

  getAddressList(id) {
    this.userService.userlistAddress(id).subscribe(
      res => {
        this.addressList = res['result'];
        if(this.addressList.length > 0 ) {
          this.firstFormGroup.value.firstCtrl = this.addressList[0]
        this.firstFormGroup = this._formBuilder.group({
          firstCtrl: [this.addressList[0], Validators.required],
        });
        }
      },
      error => {
        console.log(error.error);
      }
    )
  }

  selectedAddress() {
    this.userselectedAddress = this.firstFormGroup.value.firstCtrl;
    this.customer_cart_data.map(data => {
      data.location_id = this.userselectedAddress.service_location;
    });


  }
  selectedPayOption() {
    if (this.secondFormGroup.valid) {
      this.isShow = 1;
      this.userselectedPayment = this.secondFormGroup.value.secondCtrl;
      const data: any = {
        order_total_price: this.subTotal,
        address_id: this.userselectedAddress.id,
        customer_id: this.userId,
        payment_type: this.userselectedPayment,
        order_details: this.customer_cart_data,
        // assign_datetime: new Date()
      };
      // this.mainService.addorder(data).subscribe
      this.mainService.addorder(data).subscribe(
        res => {
          this.isShow = 0;
          if (res['status'] == true) {
            //  localStorage.clear();
            localStorage.setItem('cart', '');
            this.dialog.closeAll();
            this.router.navigateByUrl('ordersucces/' + 1);
          } else {
            // localStorage.clear();
            localStorage.setItem('cart', '');
            this.dialog.closeAll();
            this.router.navigateByUrl('ordersucces/' + 2);
          }
        },
        error => {
          this.isShow = 0;
          console.log(error.error);
          // this.toastr.error('Error!!!', '', {
          //   timeOut: 3000,
          // });
        }
      );
    } else {
      this.toastr.error('Please Select a Payment Method.', '', {
        timeOut: 3000,
      });
    }
  }

}
