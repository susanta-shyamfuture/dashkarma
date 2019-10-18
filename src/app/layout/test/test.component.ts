import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  paymentdetails_data:any;
  constructor() { }

  ngOnInit() {

    this.paymentdetails_data  = {
      "MID":'hQjqiV02587525274096',
      "ORDER_ID":'ORD_123456',
      "TXN_AMOUNT":1,
      "CUST_ID":1,
      "INDUSTRY_TYPE_ID":12,
      "WEBSITE":33,
      "CHANNEL_ID":1,
      "CALLBACK_URL":'qqq',
      "CHECKSUMHASH":1234567890


    }
  }

}
