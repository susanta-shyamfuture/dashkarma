import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MainService } from "../../core/services/main.service";
@Component({
  selector: 'app-serviceaddress',
  templateUrl: './serviceaddress.component.html',
  styleUrls: ['./serviceaddress.component.scss']
})
export class ServiceaddressComponent implements OnInit {
  addForm: FormGroup;
  citylist:any=[];
  addressList:any=[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private mainService : MainService
  ) { }

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      citylist: ['']
    });
    this.getCityList();
    this.getMyLocation();
  }


  getCityList() {
    var data = {
      "user_type":localStorage.getItem('userType')
    }
    this.mainService.getCityList().subscribe(
      res => {
        console.log("City List==>",res);
        this.citylist  =  res['result'];
      },
      error => {
        console.log("Error Get Category",error);
      }
    )
  }

  getMyLocation() {
    var data = {
      "user_id":localStorage.getItem('userId')
    }
    this.mainService.listVenderLocation(data).subscribe(
      res => {
        console.log("Get Vebnder Location==>",res);
        //this.citylist  =  res['result'];
        this.addressList =  res['result'];
      },
      error => {
        console.log("Error Get Category",error);
      }
    )
  }

  onSubmit() {
    console.log("Submitted Value ==>",this.addForm.value.citylist);
    var data =  {
      "location_id":this.addForm.value.citylist,
      "user_id":localStorage.getItem('userId')
    }
      this.mainService.addVenderLocation(data).subscribe(
      res => {
        console.log("Add Location ==>",res);
        //this.citylist  =  res['result'];
       
        this.getMyLocation();
      },
      error => {
        console.log("Error Get Category",error);
      }
    )
  }

  deleteAddress(address) {
console.log("Delete Address ==>",address);
var data =  {
  "id":address.id
}
  this.mainService.deleteVenderLocation(data).subscribe(
  res => {
    console.log("List Location ==>",res);
    this.getMyLocation();
  },
  error => {
    console.log("Error Get Category",error);
  }
)
  }

}
