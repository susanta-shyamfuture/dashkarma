import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  addressForm: FormGroup;
  submitted = false;
  addTypeList: any = [];
  userId: any;
  addressList: any = [];
  editAddress: any;
  isEdit: boolean;
  citylist: any;
  constructor(
    public dialogRef: MatDialogRef<AddressComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private mainService: MainService,
    private toastr: ToastrService,
    private router: Router,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = localStorage.getItem('userId');

    if (data.getAddressData) {
      this.editAddress = data.getAddressData;
      this.isEdit = true;
      this.addressForm = this.formBuilder.group({
        addtype: [data.getAddressData.type, [Validators.required]],
        address: [data.getAddressData.address, [Validators.required]],
        pincode: [data.getAddressData.pincode, [Validators.required]],
        address2: [data.getAddressData.address2, [Validators.required]],
        city: [data.getAddressData.city, [Validators.required]],
        state: [data.getAddressData.state, [Validators.required]],
        service_location: [data.getAddressData.service_location, [Validators.required]],
      });
    }
    else {
      this.isEdit = false;
      this.addressForm = this.formBuilder.group({
        addtype: ['', [Validators.required]],
        address: ['', [Validators.required]],
        pincode: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^[0-9]*$/)]],
        address2: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        service_location: ['', [Validators.required]],
      });
    }
  }

  ngOnInit() {
    this.getCityList();

    this.addTypeList = [
      {
        id: 1,
        name: 'Home'
      },
      {
        id: 2,
        name: 'Office'
      },
      {
        id: 3,
        name: 'Others'
      }
    ]
  }

  getCityList() {
    var data = {
      "user_type": localStorage.getItem('userType')
    }
    this.mainService.getCityList().subscribe(
      res => {
        this.citylist = res['result'];
      },
      error => {
        console.log(error);
      }
    )
  }

  closeSignIn() {
    this.dialogRef.close(true);
  }
  get f() { return this.addressForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addressForm.invalid) {
      return;
    }
    else {
      if (this.isEdit) {
        var data = {
          "type": this.addressForm.value.addtype,
          "address": this.addressForm.value.address,
          "pincode": this.addressForm.value.pincode,
          "address2": this.addressForm.value.address2,
          "city": this.addressForm.value.city,
          "state": this.addressForm.value.state,
          "service_location": this.addressForm.value.service_location,
          "customer_id": this.userId,
          "id": this.editAddress.id
        }
        this.userService.userupdateAddress(data).subscribe(
          res => {
            if (res['status'] == true) {
              this.addressForm.reset();
              this.dialogRef.close(true);
              this.dialog.afterAllClosed
                .subscribe(() => {
                  this.getAddressList(this.userId);
                }
                );
              this.toastr.success('Addreess added succesfully', '', {
                timeOut: 3000,
              });
            }
            else {
              this.toastr.success('Error', '', {
                timeOut: 3000,
              });
            }
          },
          error => {
            console.log(error.error);
            this.toastr.error('Error!!!', '', {
              timeOut: 3000,
            });
          }
        )
      }
      else {
        var data1 = {
          "type": this.addressForm.value.addtype,
          "address": this.addressForm.value.address,
          "pincode": this.addressForm.value.pincode,
          "address2": this.addressForm.value.address2,
          "city": this.addressForm.value.city,
          "state": this.addressForm.value.state,
          "service_location": this.addressForm.value.service_location,
          "customer_id": this.userId,
        }
        this.userService.userAddAddress(data1).subscribe(
          res => {
            if (res['status'] == true) {
              this.addressForm.reset();
              this.dialogRef.close(true);
              this.dialog.afterAllClosed
                .subscribe(() => {
                  this.getAddressList(this.userId);
                }
                );
              this.toastr.success('Addreess added succesfully', '', {
                timeOut: 3000,
              });
            }
            else {
              this.toastr.success('Error', '', {
                timeOut: 3000,
              });
            }
          },
          error => {
            console.log(error.error);
            this.toastr.error('Error!!!', '', {
              timeOut: 3000,
            });
          }
        )
      }

    }
  }

  getAddressList(id) {
    this.userService.userlistAddress(id).subscribe(
      res => {
        this.addressList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

}
