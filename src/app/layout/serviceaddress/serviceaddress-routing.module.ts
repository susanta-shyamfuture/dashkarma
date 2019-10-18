import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceaddressComponent } from './serviceaddress.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceaddressComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceaddressRoutingModule { }
