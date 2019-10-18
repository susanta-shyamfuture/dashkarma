import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsComponent } from './cms.component';
import { DetailsComponent } from '../cms/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: CmsComponent
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
export class CmsRoutingModule { }
