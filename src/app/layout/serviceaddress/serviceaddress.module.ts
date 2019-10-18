import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceaddressRoutingModule } from './serviceaddress-routing.module';
import { ServiceaddressComponent } from './serviceaddress.component';

// core
import { CoreModule } from '../../core/core.module';

@NgModule({
  declarations: [ServiceaddressComponent],
  imports: [
    CommonModule,
    ServiceaddressRoutingModule,
    CoreModule
  ]
})
export class ServiceaddressModule { }
