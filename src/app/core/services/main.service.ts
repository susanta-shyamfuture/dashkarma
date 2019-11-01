import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  @Output() getCartNumberStatus: EventEmitter<any> = new EventEmitter();
  headers: any;
  constructor(
    private http: HttpClient
  ) { 
    const login = 'admin';
    const password = '12345';
    this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', 'Basic ' + btoa(login + ':' + password) );

  }

  cartNumberStatus(data): Observable<any> {
    if (data = true) {
      this.getCartNumberStatus.emit(true);
      return;
    }
  }

  getBannerList(data) {
    return this.http.post(environment.apiEndpoint + 'medialist/',data, {headers: this.headers});
  }
  getParentCatList(id) {
    return this.http.get(environment.apiEndpoint + 'categorylist/' + id, {headers: this.headers});
  }

  getSubCatList(id) {
    return this.http.get(environment.apiEndpoint + 'categorylist/' + id, {headers: this.headers});
  }

  getPackageList(data) {
    return this.http.post(environment.apiEndpoint + 'getserviceslist/', data, {headers: this.headers});
   // return this.http.get(environment.apiEndpoint + 'packageslistbyserviceid/'+id, {headers: this.headers})
  }

  getCmsDetails(slug) {
    return this.http.get(environment.apiEndpoint + 'getcms?page_slug=' + slug, {headers: this.headers});
  }

  getGalleryList() {
    return this.http.get(environment.apiEndpoint + 'galleryimagelist/', {headers: this.headers});
  }

  contactus(data) {
    return this.http.post(environment.apiEndpoint + 'contactus/', data, {headers: this.headers});
  }

  getSettings() {
    return this.http.get(environment.apiEndpoint + 'generallist/', {headers: this.headers});
  }

  getTestimonials(data) {
    return this.http.post(environment.apiEndpoint + 'testimoniallist/', data, {headers: this.headers});
  }

  cmsDetails(name) {
    return this.http.get(environment.apiEndpoint + 'getcms/?page_slug=' + name, {headers: this.headers});
  }

  getCityList() {
    return this.http.get(environment.apiEndpoint + 'locationlist/', {headers: this.headers});
  }

  addorder(data) {
    return this.http.post(environment.apiEndpoint + 'addorder/', data, {headers: this.headers});
  }

  orderlist(id) {
    return this.http.get(environment.apiEndpoint + 'orderListByCustomerId/' + id, {headers: this.headers});
  }

  searchServices(name) {
    return this.http.get(environment.apiEndpoint + 'serviceparentsearch/' + name, {headers: this.headers});
  }

  getSearchResultStatus(data) {
    return this.http.post(environment.apiEndpoint + 'servicesearchbylocation/', data, {headers: this.headers});
  }
  orderDetails(id) {
    return this.http.get(environment.apiEndpoint + 'orderDetailsByID/' + id, {headers: this.headers});
  }

  cancelorder(data) {
    return this.http.post(environment.apiEndpoint + 'cancelorder/', data, {headers: this.headers});
  }

  addRating(data) {
    return this.http.post(environment.apiEndpoint + 'addservicereview/', data, {headers: this.headers});
  }

  getNearestUserList(data) {
    return this.http.post(environment.apiEndpoint + 'getnearestserviceuser/', data, {headers: this.headers});
  }

  getReviewsByService(data) {
    return this.http.post(environment.apiEndpoint + 'getratingbyservice/', data, {headers: this.headers});
  }

  rescheduleService(data) {
    return this.http.post(environment.apiEndpoint + 'rescheduleorder/', data, {headers: this.headers});
  }

  addVenderLocation(data) {
    return this.http.post(environment.apiEndpoint + 'addvendorlocation/', data, {headers: this.headers});
  }

  listVenderLocation(data) {
    return this.http.post(environment.apiEndpoint + 'listvendorlocation/', data, {headers: this.headers});
  }
  deleteVenderLocation(data) {
    return this.http.post(environment.apiEndpoint + 'deletevendorlocation/', data, {headers: this.headers});
  }

  listVendorReview(data) {
    return this.http.post(environment.apiEndpoint + 'listvendorreview/', data, {headers: this.headers});
  }

  appointmentlist(id) {
    return this.http.get(environment.apiEndpoint + 'orderlistbyvendorid/' + id, {headers: this.headers});
  }

  addWallet(data) {
    return this.http.post(environment.apiEndpoint + 'addwalletbalance/', data, {headers: this.headers});
  }

  getbloglist() {
    return this.http.get(environment.apiEndpoint + 'bloglist/', {headers: this.headers});
  }

  getBlogById(blogId) {
    return this.http.get(environment.apiEndpoint + 'blogdetailsbyid/' + blogId, { headers: this.headers });
  }

  getBalance(id) {
    return this.http.get(environment.apiEndpoint + 'getuserwalletbalance/' + id, {headers: this.headers});
  }

  subscribe(data) {
    return this.http.post(environment.apiEndpoint + 'addsubscriber/', data, {headers: this.headers});
  }

  completeOrder(data) {
    return this.http.post(environment.apiEndpoint + 'uvchangestatus/', data, {headers: this.headers});
  }

 

 
}
