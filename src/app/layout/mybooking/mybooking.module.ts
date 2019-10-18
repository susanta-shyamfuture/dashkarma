import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MybookingRoutingModule } from './mybooking-routing.module';
import { MybookingComponent } from './mybooking.component';
import { DetailsComponent } from './details/details.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [MybookingComponent, DetailsComponent],
  imports: [
    CommonModule,
    MybookingRoutingModule,
    CoreModule
  ]
})
export class MybookingModule { }
