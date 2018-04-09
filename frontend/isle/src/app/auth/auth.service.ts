import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {HttpClient} from '@angular/common/http';

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthService {
  isLoggedIn = false;
  role = null;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  baseUrl: string = Constants.apiUrl + 'login';

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('access_token');
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken) {
        this.isLoggedIn = parsedToken.exp < +(new Date());
        this.role = parsedToken.role;
      }
    }
  }

  login(username, password): Observable<any> {
    return this.http.post<any>(this.baseUrl, {'user': username, 'pass': password})
      .do(resp => {
        localStorage.setItem('access_token', resp.accessToken);
        const parsedToken = parseJwt(resp.accessToken);
        this.isLoggedIn = true;
        this.role = parsedToken.role;
      });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.role = null;
    localStorage.clear();
  }
}
