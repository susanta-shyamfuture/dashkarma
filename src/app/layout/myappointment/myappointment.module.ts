import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyappointmentRoutingModule } from './myappointment-routing.module';
import { MyappointmentComponent } from './myappointment.component';
import { DetailsComponent } from './details/details.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [MyappointmentComponent, DetailsComponent],
  imports: [
    CommonModule,
    MyappointmentRoutingModule,
    CoreModule
  ]
})
export class MyappointmentModule { }
