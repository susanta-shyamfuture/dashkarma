import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VreviewsComponent } from './vreviews.component';

const routes: Routes = [
  {
    path: '',
    component: VreviewsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VreviewsRoutingModule { }
