import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { MustMatch } from '../../components/validator/must-match.validator';


@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})

export class ForgotpasswordComponent implements OnInit {
  forgotForm: FormGroup;
  otpForm: FormGroup;
  changePasswordForm: FormGroup;
  submitted = false;
  isMobileForm: boolean;
  isOtpForm: boolean;
  isPasswordForm: boolean;
  formHeaderName: any;
  getOtp: any;
  contactno:any;
  usertype:any
  constructor(
    public dialogRef: MatDialogRef<ForgotpasswordComponent>,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isMobileForm = true;
    this.isOtpForm = false;
    this.isPasswordForm = false;
    this.formHeaderName = "Forgot Password";
    this.forgotForm = this.formBuilder.group({
      user_type: ['2'],
      contact: ['', [Validators.required]]
    });

    this.otpForm = this.formBuilder.group({
      otp: ['', [Validators.required]]
    });

    this.changePasswordForm = this.formBuilder.group({
      newpass: ['', [Validators.required]],
      confpass: ['', [Validators.required]],
      
    },{
      validator: MustMatch('newpass', 'confpass')
  });
  }

  closeSignIn() {
    this.dialogRef.close(true);
  }

  get f() { return this.forgotForm.controls; }
  get fo() { return this.otpForm.controls; }
  get fp() { return this.changePasswordForm.controls; }

  onMobileSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotForm.invalid) {
      return;
    }
    else {
      // console.log("Forgot Password Form==>",this.forgotForm.value);
      // this.isMobileForm = false;
      // this.isOtpForm =true;
      // this.isPasswordForm =false;
      // this.submitted = false;
      // this.formHeaderName = "OTP";
      this.contactno = this.forgotForm.value.contact;
      this.usertype = this.forgotForm.value.user_type;

      this.userService.userForgotPassword(this.forgotForm.value).subscribe(
        res => {
          console.log("Forgotpassword Result==>", res);
          if (res['status'] == true) {
            this.forgotForm.reset();
            this.getOtp = res['result']['otp'];

            this.isMobileForm = false;
            this.isOtpForm = true;
            this.isPasswordForm = false;
            this.submitted = false;
            this.formHeaderName = "OTP";
            this.toastr.success(res['result']['message'], '', {
              timeOut: 3000,
            });
          }
          else {
            this.toastr.error(res['result']['message'], '', {
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

  onOtpSubmit() {
    this.submitted = true;
    if (this.otpForm.invalid) {
      return;
    }
    else {

      if(this.otpForm.value.otp == this.getOtp) {
        this.isMobileForm = false;
        this.isOtpForm = false;
        this.isPasswordForm = true;
        this.submitted = false;
        this.formHeaderName = "Change Password"
      }
      else {
        this.toastr.error('OTP mismatch!!!', '', {
          timeOut: 3000,
        });
      }
     
    }
  }

  onPasswordSubmit() {
    this.submitted = true;
    if (this.changePasswordForm.invalid) {
      return;
    }
    else {
      console.log("Change Password Form Value ==>", this.changePasswordForm.value);
      var data = {
        "contact":this.contactno,
        "user_type":this.usertype,
        "password":this.changePasswordForm.value.newpass
      }
      console.log("Pass==>",data);
      this.userService.userForgotPasswordUpdate(data).subscribe(
        res => {
          console.log("Forgotpassword Result==>", res);
          if (res['status'] == true) {
            this.dialogRef.close(true);
            this.router.navigate(['/home']);
            this.toastr.success(res['result']['message'], '', {
              timeOut: 3000,
            });
          }
          else {
            this.toastr.error(res['result']['message'], '', {
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
