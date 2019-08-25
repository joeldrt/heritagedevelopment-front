import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../../models/user';


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
