import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MainService } from '../../core/services/main.service';

@Component({
  selector: 'app-fees-collected',
  templateUrl: './fees-collected.component.html',
  styleUrls: ['./fees-collected.component.scss']
})
export class FeesCollectedComponent implements OnInit {
  getWalletDetailsForm: FormGroup;
  submitted = false;
  userId: any;
  userWalletDetails: any;

  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getWalletDetailsForm = this.formBuilder.group({
      dateRangeInput: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.getWalletDetailsForm.controls; }

  getDate(dateRange?) {
    this.submitted = true;
    console.log('Date range got', dateRange._selecteds);
    if (dateRange._selecteds.length) {
      // this.newdate = moment(dateRange._selected).format('YYYY-MM-DD HH:m:s');
      const data = {
        from_date: moment(dateRange._selecteds[0]).format('YYYY-MM-DD'),
        to_date: moment(dateRange._selecteds[1]).format('YYYY-MM-DD'),
        user_id: this.userId
      };
      console.log('Payload', data);
      this.mainService.getUserWalletDetails(data).subscribe(
        res => {
          if (res['status'] === true) {
            console.log('userWalletDetails', res);
            this.userWalletDetails = res['result'];
            this.getWalletDetailsForm.reset();
            this.submitted = false;
          } else {
            this.userWalletDetails = res['result'];
            this.getWalletDetailsForm.reset();
            this.submitted = false;
            this.toastr.success('Data not found. Please try again!', '', {
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
      );
    } else {
      this.toastr.warning('Please select two Dates.', '', {
        timeOut: 3000,
      });
    }
  }

}
