import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeesCollectedComponent } from './fees-collected.component';


const routes: Routes = [
  {
    path: '',
    component: FeesCollectedComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeesCollectedRoutingModule { }
