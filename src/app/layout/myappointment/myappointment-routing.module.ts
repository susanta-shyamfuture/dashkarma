import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyappointmentComponent } from './myappointment.component';
import { DetailsComponent } from '../myappointment/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MyappointmentComponent
  },
  {
    path: 'details/:id',
    component: DetailsComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyappointmentRoutingModule { }
