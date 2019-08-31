import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Amenidades } from 'src/app/models/amenidades';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AmenidadesService {

  private AMENIDAD_DOC_ID = '5d64d3a5dcb8dc6405c28a06';
  private AMENIDADES_URL = `${environment.API_URL}amenidads/${this.AMENIDAD_DOC_ID}`;
  // https://hd.devdigiall.tk/amenidads/5d64d3a5dcb8dc6405c28a06

  constructor(
    private firestore: AngularFirestore,
    private http: HttpClient,
  ) {}

  obtenerAmenidades() {
    return this.firestore.collection('amenidades').doc('Bwd2nbFbxqEsi1w3EoYn').get();
  }

  obtenerAmenidadesStrapi(): Observable<HttpResponse<Amenidades>> {
    return this.http.get<Amenidades>(this.AMENIDADES_URL, {observe: 'response'});
  }

  actualizarAmenidadesStrapi(amenidades: Amenidades): Observable<HttpResponse<Amenidades>> {
    return this.http.put<Amenidades>(this.AMENIDADES_URL, amenidades, {observe: 'response'});
  }

}
