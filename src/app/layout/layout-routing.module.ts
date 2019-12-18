import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: "full" },
      { path: '/', redirectTo: 'home', pathMatch: "full" },
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusModule' },
      { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusModule' },
      { path: 'services/:id', loadChildren: './services/services.module#ServicesModule' },
      { path: 'profile', loadChildren: './profile/profile.module#ProfileModule' },
      { path: 'mybooking', loadChildren: './mybooking/mybooking.module#MybookingModule' },
      { path: 'blog', loadChildren: './blog/blog.module#BlogModule' },
      { path: 'cms', loadChildren: './cms/cms.module#CmsModule' },
      { path: 'ordersucces/:id', loadChildren: './ordersucces/ordersucces.module#OrdersuccesModule' },
      { path: 'wallet', loadChildren: './wallet/wallet.module#WalletModule' },
      { path: 'myappointment', loadChildren: './myappointment/myappointment.module#MyappointmentModule' },
      { path: 'fees-collected', loadChildren: './fees-collected/fees-collected.module#FeesCollectedModule' },
      { path: 'test', loadChildren: './test/test.module#TestModule' },
      { path: 'serviceaddress', loadChildren: './serviceaddress/serviceaddress.module#ServiceaddressModule' },
      { path: 'vreviews', loadChildren: './vreviews/vreviews.module#VreviewsModule' },
      { path: 'calender', loadChildren: './calender/calender.module#CalenderModule' },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
