import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private readonly url: string = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    interface res { success: string; };
    return this.http.post<res>(this.url + 'register', user, { headers: headers });
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    interface res { success: string; token: string; user: string; };
    return this.http.post<res>(this.url + 'authenticate', user, { headers: headers });
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    interface res { user: string; };
    return this.http.get<res>(this.url + 'profile', { headers: headers });
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  logoutUser() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }


}
