import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { UserService } from "../../../../core/services/user.service";

import { AddressComponent } from "../address.component";
@Component({
  selector: 'app-listaddress',
  templateUrl: './listaddress.component.html',
  styleUrls: ['./listaddress.component.scss']
})
export class ListaddressComponent implements OnInit {
  addressList:any=[];
  userId:any;
  constructor(
    public dialog: MatDialog,
    private toastr: ToastrService,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getAddressList(this.userId);
  }

  getAddressList(id) {
    this.userService.userlistAddress(id).subscribe(
      res => {
        this.addressList = res['result'];
      },
      error => {
        console.log(error.error);
      }
    );
  }

  closeModal() {
    this.dialog.closeAll();
  }

  editAddress(address) {
    let dialogRef = this.dialog.open(AddressComponent, {
      width: '900px',
      height: '600px',
      data: {
        getAddressData : address
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getAddressList(this.userId);
    })
  }

  deleteAddress(address) {
   var data = {
     id:address.id
   }
    this.userService.deleteAddress(data).subscribe(
      res => {
        this.getAddressList(this.userId);
        this.toastr.success('Addreess Deleted Succesfully', '', {
               timeOut: 3000,
        });
      },
      error => {
        console.log(error.error);
        // this.toastr.error('Error!!!', '', {
        //   timeOut: 3000,
        // });
      }
    )
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

  setDefaultAddress(address) {
    var data = {
      "id":address.id,
      "customer_id":localStorage.getItem('userId')
    }
     this.userService.defaultAddress(data).subscribe(
       res => {
          this.getAddressList(this.userId);
        //  this.toastr.success('Addreess Deleted Succesfully', '', {
        //         timeOut: 3000,
        //  });
       },
       error => {
         console.log(error.error);
         // this.toastr.error('Error!!!', '', {
         //   timeOut: 3000,
         // });
       }
     )

   }
}
