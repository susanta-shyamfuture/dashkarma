import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';
// core
import { CoreModule } from '../../core/core.module';
//import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule,
    CoreModule
  ]
})
export class ServicesModule { }
