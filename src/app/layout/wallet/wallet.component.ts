import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../core/services/main.service";
import { environment } from "../../../environments/environment";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  addwalletForm: FormGroup;
  submitted = false;
  walletBalance:any;
  constructor(
    private formBuilder: FormBuilder,
    private mainService: MainService,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.getwalletBalance(localStorage.getItem('userId'));
    this.addwalletForm = this.formBuilder.group({
      amount: ['', [Validators.required]]
    });
  }
  get f() { return this.addwalletForm.controls; }

  onSubmit() {
  
    this.submitted = true;
    if (this.addwalletForm.invalid) {
      return;
    }
    else {
      console.log(this.addwalletForm.value);
      var data = {
        "amount":this.addwalletForm.value.amount,
        "user_id": localStorage.getItem('userId'),
        "type":'credit',
        "mode":'cash'
      }
      console.log(data);
     
      this.mainService.addWallet(data).subscribe(
        res => {
          this.getwalletBalance(localStorage.getItem('userId'));
          console.log("Login result==>",res);
          this.toastr.success("Wallet balance Added Succesfully", '', {
            timeOut: 3000,
          });

          this.submitted = false;
          this.addwalletForm.reset();

          
        },
        error => {
          this.toastr.success("Error!!!!", '', {
            timeOut: 3000,
          });
         
        }
      )
    }
    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.signInForm.value, null, 4));
  }

  getwalletBalance(id) {
    
    this.mainService.getBalance(id).subscribe(
      res => {
        console.log("Wallet Balance==>", res);
        //this.reviewList = res['result'];
        this.walletBalance  = res['result']['amount'];
      },
      error => {
        console.log(error.error);
      }
    )
  }


}
