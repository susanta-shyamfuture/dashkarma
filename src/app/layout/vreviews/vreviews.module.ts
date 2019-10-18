import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VreviewsRoutingModule } from './vreviews-routing.module';
import { VreviewsComponent } from './vreviews.component';
// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [VreviewsComponent],
  imports: [
    CommonModule,
    VreviewsRoutingModule,
    CoreModule
  ]
})
export class VreviewsModule { }
