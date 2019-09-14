import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgottenPasswordService {

  private FORGOT_URL = environment.API_URL + 'auth/forgot-password';
  private RESET_URL = environment.API_URL + 'auth/reset-password';

  private RESET_PAGE_URL = environment.RESET_PAGE_URL;

  constructor(
    private http: HttpClient,
  ) { }

  enviarOlvidePassword(email: string): Observable<HttpResponse<any>> {
    return this.http.post(this.FORGOT_URL, { email, url: this.RESET_PAGE_URL } , { observe: 'response' });
  }

  resetPassword(code: string, password: string): Observable<any> {
    return this.http.post(this.RESET_URL, { code, password, passwordConfirmation: password }).pipe(
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
}
