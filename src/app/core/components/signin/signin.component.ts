import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from "../../../core/services/user.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';
import { SignupComponent } from '../signup/signup.component';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<SigninComponent>,
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
    this.signInForm = this.formBuilder.group({
      user_type: ['2'],
      contact: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  closeSignIn() {
    this.dialogRef.close(true);
  }
  // convenience getter for easy access to form fields
  get f() { return this.signInForm.controls; }
  onSubmit() {
  
    this.submitted = true;

    // stop here if form is invalid
    if (this.signInForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      console.log(this.signInForm.value);
    //  this.signInForm.value.user_type =2;
    //  console.log(this.signInForm.value);
      this.userService.userSignin(this.signInForm.value).subscribe(
        res => {
          console.log("Login result==>",res);
          if(res['status']==true) {
            localStorage.setItem('isLoggedin', 'true');
            localStorage.setItem('userId', res['result']['detail']['id']);
            localStorage.setItem('userType', res['result']['detail']['user_type']);
            localStorage.setItem('userName', res['result']['detail']['name']);
            localStorage.setItem('userEmail', res['result']['detail']['email']);
            localStorage.setItem('userContact', res['result']['detail']['contact']);
           // localStorage.setItem('userImage', res['result']['profile_image']);
           console.log("User Id ==>",localStorage.getItem('userId'));
            this.userService.loginStatus(true);
            this.router.navigate(['/home']);
            this.dialogRef.close(true);
            this.toastr.success(res['result']['message'], '', {
              timeOut: 3000,
            });
            this.spinner.hide();
          }
          else {
            this.toastr.error(res['result']['message'], '', {
              timeOut: 3000,
            });
          }
          console.log("Login Result==>", res);
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

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  openForgotModal() {
    this.dialogRef.close(true);
    let dialogRef = this.dialog.open(ForgotpasswordComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  openModalSignUp() {
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '525px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

}
