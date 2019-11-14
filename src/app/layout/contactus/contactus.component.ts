import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import {  MainService} from "../../core/services/main.service";
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  contactForm: FormGroup;
  submitted = false;
  settingList:any;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[ \A-Za-z]*$/)]],
      email: ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });

    this.getSettings();
  }
  get f() { return this.contactForm.controls; }

  // onSubmit() {
  //   this.submitted = true;

  //   // stop here if form is invalid
  //   if (this.contactForm.invalid) {
  //     return;
  //   }
  //   else {
  //     // this.userService.userSignin(this.contactForm.value).subscribe(
  //     //   res => {
  //     //     //alert(this.keepLogin);
  //     this.submitted = false;
  //     this.contactForm.reset();

  //         this.toastr.success('Message successfully send', '', {
  //           timeOut: 3000,
  //         });
  //     //   },
  //     //   error => {
  //     //     this.toastr.error('Sorry! Please enter valid login creadentials', '', {
  //     //       timeOut: 3000,
  //     //     });
  //     //   }
  //     // )
  //   }
  // }

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.invalid) {
      return;
    } else {
      var data = {
        "name": this.contactForm.value.name,
        "email": this.contactForm.value.email,
        "phone": this.contactForm.value.phone,
        "subject": this.contactForm.value.subject,
        "message": this.contactForm.value.message
      }
      this.mainService.contactus(data).subscribe(
        res => {
          this.submitted = false;
          this.contactForm.reset();
          this.toastr.success('Request a callback successfully send', '', {
            timeOut: 4000,
          });
        },
        error => {
          console.log(error.error);
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
        }
      )
    }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  getSettings() {
    this.mainService.getSettings().subscribe(
      res => {
       this.settingList = res['result'][0];
      },
      error => {
        console.log(error);
      }
    )
  }


}
