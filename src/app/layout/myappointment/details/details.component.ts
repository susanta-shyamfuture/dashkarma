import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from "../../../core/services/main.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from "../../../../environments/environment";
import { RatingComponent } from '../../../core/components/rating/rating.component';
import { RescheduleComponent } from '../../../core/components/reschedule/reschedule.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  orderid:any;
  orderDetails:any = {};
  orderList:any=[];
  imageBaseUrl:any;
  cat_name:string;
  isVisible:boolean=false;
  userId:any;
  orderListt:any=[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private mainService: MainService,
  ) { 
    this.route.params.subscribe(routeParams => {
      this.orderid = routeParams.id;
      this.bookingDetails(routeParams.id)
    });
  }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.imageBaseUrl = environment.imageEndpoint;
  }

  bookingDetails(id) {
    this.mainService.orderDetails(id).subscribe(
      res => {
        this.orderListt=[];
        this.isVisible =true;
        this.orderDetails = res['result'];
        this.orderList = res['result']['order_details'];

        this.orderList.forEach(element => {
          if(element.assign_vendor_id == this.userId){
            this.orderListt.push(element)              
          }
        });

        this.cat_name = res['result']['order_details'][0]['category_name'];
      },
      error => {
        console.log(error.error);
      }
    )
  }

  cancelOrder(orderDetails) {
    var data = {
      "order_id":orderDetails.id,
      "cancel_request":"Personal reason"
    }
    this.mainService.cancelorder(data).subscribe(
      res => {
       this.bookingDetails(this.orderid);
       this.router.navigateByUrl('/mybooking');
      },
      error => {
        console.log(error.error);
      }
    )
  }

  gotoRating(orderid,service) {
      let dialogRef = this.dialog.open(RatingComponent, {
        width: '900px',
        height:'600px',
        data: {
          "orderId":orderid,
          "service":service
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
  }

  gotoReschedule(orderid,service) {
    let dialogRef = this.dialog.open(RescheduleComponent, {
      width: '900px',
      height:'600px',
      data: {
        "orderId":orderid,
        "service":service
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
}

  goBack() {
    this.router.navigateByUrl('/mybooking');
  }

  completeOrder(orderid,service) {
    console.log("Complete Order Id ==>",orderid);
    console.log("Complete Service ==>",service);
    var data = {
      "id":orderid,
      "user_status":service.user_status,
      "vendor_status":"2"
    }

    console.log("Data==>",data);
    this.mainService.completeOrder(data).subscribe(
      res => {
       this.bookingDetails(this.orderid);
       //this.router.navigateByUrl('/mybooking');
      },
      error => {
        console.log(error.error);
      }
    )
  }

}
