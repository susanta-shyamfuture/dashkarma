import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeesCollectedRoutingModule } from './fees-collected-routing.module';
import { FeesCollectedComponent } from './fees-collected.component';
// core
import { CoreModule } from '../../core/core.module';


@NgModule({
  declarations: [FeesCollectedComponent],
  imports: [
    CommonModule,
    CoreModule,
    FeesCollectedRoutingModule
  ]
})
export class FeesCollectedModule { }
