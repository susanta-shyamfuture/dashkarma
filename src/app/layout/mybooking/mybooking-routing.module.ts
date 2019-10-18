import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MybookingComponent } from './mybooking.component';
import { DetailsComponent } from '../mybooking/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: MybookingComponent
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
export class MybookingRoutingModule { }
