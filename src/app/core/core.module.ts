import { NgModule,ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from "ngx-spinner";
// guard
import { AuthGuard } from './guard/auth.guard';


// Material
import {
  MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule,
  MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatStepperIntl, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule,
  MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatStepperModule,
} from '@angular/material';



import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PackageComponent } from './components/package/package.component';
import { CartComponent } from './components/cart/cart.component';
import { ForgotpasswordComponent } from './components/forgotpassword/forgotpassword.component';
import { DetailsComponent } from './components/package/details/details.component';
import { ListComponent } from '../layout/services/list/list.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AddressComponent } from './components/address/address.component';
import { ListaddressComponent } from './components/address/listaddress/listaddress.component';
import { RatingComponent } from './components/rating/rating.component';
import { RescheduleComponent } from './components/reschedule/reschedule.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
 


@NgModule({
  declarations: [
    HeaderComponent, 
    FooterComponent, 
    SidebarComponent, 
    SearchbarComponent, 
    SigninComponent, 
    SignupComponent, 
    PackageComponent, 
    CartComponent, 
    ForgotpasswordComponent, 
    DetailsComponent,
    ListComponent,
    CheckoutComponent,
    AddressComponent,
    ListaddressComponent,
    RatingComponent,
    RescheduleComponent
    
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDCwmrD9NEiBAtmQS8_UfaIO4wFg99N8MU'
    // }),
    //NgbModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
      //----------------Material----------------//
      MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
      MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
      MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
      MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
      MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
      MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
      MatTabsModule, MatToolbarModule, MatTooltipModule,
      //----------------Material----------------//
  
      OwlModule,
      OwlDateTimeModule, 
         OwlNativeDateTimeModule,
      CarouselModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    //AgmCoreModule,
    //----------------Material----------------//
    MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatStepperModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
    MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule,
    MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatFormFieldModule, MatSelectModule, MatSidenavModule,
    MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule,
    //----------------Material----------------//
    OwlModule,
    CarouselModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
   // NgxImageGalleryModule,
   // LightboxModule,
    HeaderComponent,
    FooterComponent,
    NgbModule,
    NgxSpinnerModule,
    SidebarComponent, 
    SearchbarComponent

  ],
  entryComponents: [
    SigninComponent,
    SignupComponent,
    PackageComponent,
    ForgotpasswordComponent,
    DetailsComponent,
    ListComponent,
    CheckoutComponent,
    AddressComponent,
    ListaddressComponent,
    CartComponent,
    RatingComponent,
    RescheduleComponent

  ]
})
export class CoreModule { }
