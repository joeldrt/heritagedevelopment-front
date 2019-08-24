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

  user$: Observable<User>;

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    // Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(
        (user: firebase.User, index: number) => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        }
      )
    );
  }

  // método que se debe llamar cuando alguien se registre en el portal
  private updateUserData(user: firebase.User) {
    // Sets user dato to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        client: true
      }
    };
    return userRef.set(data, { merge: true });
  }

  canUseAdminPortal(user: User): boolean {
    const allowed = ['admin', 'root'];
    return this.checkAuthorization(user, allowed);
  }

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) { return false; }
    for (const role of allowedRoles) {
      if ( user.roles[role] ) {
        return true;
      }
    }
    return false;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.AUTH_URL, { identifier: username, password})
      .pipe(
        map(
          (response: any, index: number) => {
            if (response && response.jwt) {
              localStorage.setItem('token', response.jwt);
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
}
