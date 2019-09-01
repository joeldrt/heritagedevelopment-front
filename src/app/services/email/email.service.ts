import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HdEmail } from 'src/app/models/hd_email';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private EMAIL_URL = environment.API_URL + 'email';

  constructor(
    private http: HttpClient,
  ) { }

  mandarEmailStrapi(email: HdEmail): Observable<HttpResponse<any>> {
    return this.http.post(this.EMAIL_URL, email, {observe: 'response'});
  }
}
