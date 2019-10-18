import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  @Output() getLoggedInStatus: EventEmitter<any> = new EventEmitter();
  @Output() getProfileUpdateStatus: EventEmitter<any> = new EventEmitter();
  headers: any;
  constructor(
    private http: HttpClient
  ) { 
    let login = 'admin';
    let password = '12345';
    console.log('Hello ServicesProvider Provider');
    this.headers = new HttpHeaders().set('x-api-key', 'Shyam@12345').set('Authorization', "Basic " + btoa(login + ':' + password) );
  }
  loginStatus(data): Observable<any> {
    if (data = true) {
      this.getLoggedInStatus.emit(true);
      return
    }
  }

  userSignin(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userlogin/', data, {headers: this.headers})
  }

  userSignup(data) {
    return this.http.post(environment.apiEndpoint + 'userregister/', data, {headers: this.headers})
  }

  userOtp(data) {
    return this.http.post(environment.apiEndpoint + 'userotp/', data, {headers: this.headers})
  }

  userDetails(id,data) {
    return this.http.post(environment.apiEndpoint + 'userprofile/'+id, data,{headers: this.headers})
  }
  editProfile(id,data) {
    return this.http.post(environment.apiEndpoint + 'userprofileupdate/'+id, data,{headers: this.headers})
  }

  userForgotPassword(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordotp/', data, {headers: this.headers})
  }
  userForgotPasswordUpdate(data): Observable<any> {
    return this.http.post(environment.apiEndpoint + 'userforgetpasswordupdate/', data, {headers: this.headers})
  }

  userAddAddress(data) {
    return this.http.post(environment.apiEndpoint + 'addcustomeraddress/', data, {headers: this.headers})
  }

  userlistAddress(id) {
    return this.http.get(environment.apiEndpoint + 'cusaddlistbycusid/'+id, {headers: this.headers})
  }

  deleteAddress(data) {
    return this.http.post(environment.apiEndpoint + 'deletecustomeraddress/', data, {headers: this.headers})
  }
  userupdateAddress(data) {
    return this.http.post(environment.apiEndpoint + 'updatecustomeraddress/', data, {headers: this.headers})
  }

  updateImage(form,userId) {
    return this.http.post(environment.apiEndpoint + 'userprofileimageupdate/'+userId, form, {headers: this.headers})
  }



}
