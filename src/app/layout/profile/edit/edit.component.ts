import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  UserService} from "../../../core/services/user.service";
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  profileEditForm: FormGroup;
  submitted = false;
  userId:any;
  userDetails:any;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {
    this.profileEditForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.minLength(10)]],
      about_me: ['']
    });
   }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.getUserDetails(this.userId);
  }

  getUserDetails(id) {
    var data = {
      "user_type":localStorage.getItem('userType')
    }
    this.userService.userDetails(id,data).subscribe(
      res => {
        console.log("Profile User Details==>",res);
        this.userDetails = res['result']['detail'];

        this.profileEditForm.patchValue({
          name: this.userDetails.name,
          email: this.userDetails.email,
          contact: this.userDetails.contact,
          about_me: this.userDetails.bio
        });
        console.log("kkkk==>",this.profileEditForm);

      },
      error => {
        console.log("Error Get Category",error);

        
      }
    )
  }
  get f() { return this.profileEditForm.controls; }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.profileEditForm.invalid) {
      return;
    }

    else {
        console.log(this.profileEditForm.value);
        var data = {
          user_type: localStorage.getItem('userType'),
          name: this.profileEditForm.value.name,
          email: this.profileEditForm.value.email,
          contact: this.profileEditForm.value.contact,
          about_me: this.profileEditForm.value.about_me,
          profile_image: ''
        };

        console.log(data);
        this.userService.editProfile( this.userId,data).subscribe(
          res => {
            console.log("Edit Profile Result==>", res);
            localStorage.setItem('userName', res['result']['detail']['name']);
            localStorage.setItem('userEmail', res['result']['detail']['email']);
            localStorage.setItem('userContact', res['result']['detail']['contact']);
            this.userService.loginStatus(true);
            this.router.navigate(['/profile']);
          },
          error => {
            console.log(error.error);
            this.toastr.error('Sorry! Please enter valid login creadentials', '', {
              timeOut: 3000,
            });
          }
        )

   

    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

}
