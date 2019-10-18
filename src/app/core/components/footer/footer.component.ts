import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MainService} from '../../../core/services/main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  settingList: any = {};
  submitted = false;
  subscribeForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getSettings();
  }
  // convenience getter for easy access to form fields
  get f() { return this.subscribeForm.controls; }

  getSettings() {
    this.mainService.getSettings().subscribe(
      res => {
       this.settingList = res['result'][0];
      },
      error => {
        console.log('Error Get Category',error);
      }
    )
  }

  onSubscribeSubmit() {
    this.submitted = true;
    if (this.subscribeForm.valid) {
      console.log("kkkk==>",this.subscribeForm.value);
      var data = {
        "email": this.subscribeForm.value.email,
      }
      this.mainService.subscribe(data).subscribe(
        res => {
          this.submitted = false;
         
          if(res['status']) {
            this.subscribeForm.reset();
            this.toastr.success(res['result']['message'], '', {
              timeOut: 4000,
            });
          }
          else {
            this.toastr.warning(res['result']['message'], '', {
              timeOut: 4000,
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
    } else {
      
    }
  }

}
