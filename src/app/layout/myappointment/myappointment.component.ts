import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {  MainService} from "../../core/services/main.service";
@Component({
  selector: 'app-myappointment',
  templateUrl: './myappointment.component.html',
  styleUrls: ['./myappointment.component.scss']
})
export class MyappointmentComponent implements OnInit {
  userId:any;
  orderListType: any = '0';
  orderarr:any=[];
  status:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private mainService: MainService,
  ) { }

  ngOnInit() {
    if(localStorage.getItem('userId')){
      this.userId = JSON.parse(localStorage.getItem('userId'));
      this.fetchorders(this.orderListType);
    } else {
      //this.navCtrl.push('LoginPage')
    }
  }

  onSegmentChange(val){
   this.status = val.index;
    this.orderarr = [];
    this.fetchorders(this.status);

  }

  fetchorders(status){
    this.orderarr = [];
    this.mainService.appointmentlist(this.userId).subscribe(
      res => {
        if(res['status']==true) {

          if(status == '0'){
            res['result'].forEach(element => {
              if(element.order_details.status == '0' || element.order_details.status == '1'){
                this.orderarr.push(element)
                
              }
            });
          }
           else if(status == '1') {
            res['result'].forEach(element => {
              if(element.order_details.status == '2'){
                this.orderarr.push(element)              
              }
            });
          }
          else {
            res['result'].forEach(element => {
              if(element.order_details.status == '3'){
                this.orderarr.push(element)              
              }
            });

          }
        //  res['result'].forEach(element => {
        //   alert(element.status);
        //           if(element.status == '0'){
        //             this.orderarr.push(element)
        //           } else if(element.status== '1') {
        //             this.orderarr.push(element)
        //           }
        //           else {
        //             this.orderarr.push(element)
        //           }
        //         });
        }
        else {

        }
      },
      error => {
        console.log(error.error);
       
      }
    )
   //// this.mainService.orderlist(this.userId).subscribe(

      // data => {        
      //   var res: any = data;
      //   console.log(data)        
      //   if(status == 'pending'){
      //     res.result.forEach(element => {
      //       if(element.status == '1'){
      //         // do nothing for pending tab
      //       } else {
      //         this.orderarr.push(element)
      //       }
      //     });
      //   } else {
      //     res.result.forEach(element => {
      //       if(element.status == '1'){
      //         this.orderarr.push(element)              
      //       } else {
      //         // do nothing for complete tab
      //       }
      //     });
      //   }
      // },
      // error => {        
      //   console.log(error)
      // }
   //// )
  }

  gotoDetails(order) {
    this.router.navigateByUrl('/myappointment/details/' + order.order_id);
  }


}
