import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersuccesRoutingModule } from './ordersucces-routing.module';
import { OrdersuccesComponent } from './ordersucces.component';
// core
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [OrdersuccesComponent],
  imports: [
    CommonModule,
    OrdersuccesRoutingModule,
    CoreModule
  ]
})
export class OrdersuccesModule { }
