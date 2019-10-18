import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './blog.component';
import { DetailsComponent } from '../blog/details/details.component';

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
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
export class BlogRoutingModule { }
