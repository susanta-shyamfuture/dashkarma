import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersuccesComponent } from './ordersucces.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersuccesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersuccesRoutingModule { }
