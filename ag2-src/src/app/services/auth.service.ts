import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  private readonly url: string = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    interface Res { success: boolean; }
    return this.http.post<res>(this.url + 'register', user, headers );
  }

  authenticateUser(user) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    interface Res { success: boolean; token: string; user: string; }
    return this.http.post<res>(this.url + 'authenticate', user, headers );
  }

  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    interface Res {
      success: boolean;
      user: {
        name: string;
        username: string;
        email: string;
      };
    }
    return this.http.get<res>(this.url + 'profile', headers );
  }

  loadToken() {
    const token = localStorage.getItem('id_token') || '';
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
