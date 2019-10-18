import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-ordersucces',
  templateUrl: './ordersucces.component.html',
  styleUrls: ['./ordersucces.component.scss']
})
export class OrdersuccesComponent implements OnInit {

  constructor(
    private router: Router,
  ) {

    // setTimeout(() => {
    //   this.router.navigate(['mybooking']);
    // }, 3000);
  }

  ngOnInit() {
  }

  gotoBooking() {
    this.router.navigate(['/mybooking']);
  }
}
