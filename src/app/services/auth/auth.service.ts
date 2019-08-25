import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL = environment.API_URL + 'auth/local';

  constructor(
    private http: HttpClient,
  ) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.AUTH_URL, { identifier: username, password})
      .pipe(
        map(
          (response: any, index: number) => {
            if (response && response.jwt && response.user) {
              localStorage.setItem('token', response.jwt);
              localStorage.setItem('user', JSON.stringify(response.user));
            }
            return response;
          }
        )
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
