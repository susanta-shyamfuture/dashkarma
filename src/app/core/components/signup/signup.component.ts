import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  submitted = false;
  getOtp: any;
  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      user_type: ['2'],
      otp: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern(/^[ \A-Za-z]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.signUpForm.reset();
  }

  resetForm() {
    const inputValue = this.signUpForm.value.user_type;
    this.signUpForm.reset();
    this.signUpForm.patchValue({
      user_type: inputValue
    });
  }

  closeSignIn() {
    this.dialogRef.close(true);
  }
  get f() { return this.signUpForm.controls; }

  getOtpDetails() {
    var data = {
      "contact": this.signUpForm.value.contact
    }
    this.userService.userOtp(data).subscribe(
      res => {
        if (res['status'] == true) {
          this.getOtp = res['result']['otp'];
          this.toastr.success(res['result']['message'], '', {
            timeOut: 3000,
          });
        }
        else {
          this.toastr.success(res['result']['message'], '', {
            timeOut: 3000,
          });

        }

      },
      error => {
        console.log(error.error);
        this.toastr.error('Sorry! Please enter valid login creadentials', '', {
          timeOut: 3000,
        });
      }
    )
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }

    else {
      this.spinner.show();
      if (this.signUpForm.value.otp == this.getOtp) {
        var data = {
          "name": this.signUpForm.value.name,
          "email": this.signUpForm.value.email,
          "contact": this.signUpForm.value.contact,
          "password": this.signUpForm.value.password,
          "user_type": this.signUpForm.value.user_type,

        }
        this.userService.userSignup(data).subscribe(
          res => {
            if (res['status'] == true) {
              this.signUpForm.reset();
              this.dialogRef.close(true);
              this.toastr.success(res['result']['message'], '', {
                timeOut: 3000,
              });
            }
            else {
              this.toastr.success(res['result']['message'], '', {
                timeOut: 3000,
              });
            }
            this.spinner.hide();
          },
          error => {
            console.log(error.error);
            this.toastr.error('Sorry! Please enter valid login creadentials', '', {
              timeOut: 3000,
            });
            this.spinner.hide();
          }
        )

      }
      else {
        this.spinner.hide();
        this.toastr.error('OTP mismatched!!!!', '', {
          timeOut: 3000,
        });
      }

    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

}
