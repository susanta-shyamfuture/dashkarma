import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from "../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  starList: boolean[] = [true, true, true, true, true];
  rating: any;
  ratingForm: FormGroup;
  submitted = false;
  orderDetails: any;
  userId: any;
  orderId: any;
  service: any;
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private mainService: MainService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<RatingComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    console.log("Order Details==>", data.orderId);
    console.log("Order ==>", data.service);
    this.orderId = data.orderId;
    this.service = data.service;

    if (localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId');
    } else {
      this.userId = '';
    }

    this.ratingForm = this.formBuilder.group({
      review: ['', [Validators.required]],
    });

  }

  ngOnInit() {
  }

  setStar(ratingdata: any) {
    this.rating = ratingdata + 1;
    for (var i = 0; i <= 4; i++) {
      if (i <= ratingdata) {
        this.starList[i] = false;
      }
      else {
        this.starList[i] = true;
      }
    }

    //localStorage.setItem('rating', this.rating);

  }
  get fs() { return this.ratingForm.controls; }
  addRating() {
    this.submitted = true;
    if (this.ratingForm.invalid) {
      return;
    } else {

      console.log("kkk==>", this.ratingForm.value);
      var data = {
        "order_id": this.orderId,
        "user_id": this.userId,
        "service_id": this.service.service_id,
        "rating": this.rating,
        "review": this.ratingForm.value.review

      }
      this.mainService.addRating(data).subscribe(
        res => {
          console.log(res);
          if (res['status'] == true) {
            this.toastr.success("Thanks for your Rating!!!", '', {
              timeOut: 3000,
            });
            this.dialogRef.close(true);
          }
          else {
            this.toastr.error("Error!!!", '', {
              timeOut: 3000,
            });
          }

        },
        error => {
          console.log(error.error);
        }
      )
    }
  }


  closeModal() {
    this.dialogRef.close(true);
  }
}
