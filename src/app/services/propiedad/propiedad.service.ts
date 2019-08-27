import { Injectable } from '@angular/core';
import { Propiedad } from '../../models/propiedad';
import Geohash from 'latlon-geohash';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private PROPIEDAD_URL = environment.API_URL + 'propiedads';

  constructor(
    private http: HttpClient,
  ) {}

  obtenerPropiedadesStrapi(): Observable<HttpResponse<Propiedad[]>> {
    return this.http.get<Propiedad[]>(this.PROPIEDAD_URL, { observe: 'response' });
  }

  agregarPropiedadStrapi(propiedad: Propiedad): Observable<HttpResponse<Propiedad>> {
    propiedad.geohash = this.generarGeohash(propiedad.coordinates._lat, propiedad.coordinates._long);
    return this.http.post<Propiedad>(this.PROPIEDAD_URL, propiedad, { observe: 'response' });
  }

  actualizarPropiedadStrapi(propiedad: Propiedad): Observable<HttpResponse<Propiedad>> {
    return this.http.put<Propiedad>(`${this.PROPIEDAD_URL}/${propiedad.id}`, propiedad, {observe: 'response'});
  }

  borrarPropiedadStrapi(propiedadId: string) {
    return this.http.delete<any>(`${this.PROPIEDAD_URL}/${propiedadId}`, {observe: 'response'});
  }

  obtenerPropiedadStrapi(propiedadId: string) {
    return this.http.get<Propiedad>(`${this.PROPIEDAD_URL}/${propiedadId}`, { observe: 'response' });
  }

  obtenerPropiedadesCercanasAStrapi(latitude: number, longitude: number): Observable<HttpResponse<Propiedad[]>> {
    const distance = 9;
    // ~1 mile of lat and lon in degrees
    const lat = 0.0144927536231884;
    const lon = 0.0181818181818182;
    const lowerLat = latitude - (lat * distance);
    const lowerLon = longitude - (lon * distance);
    const greaterLat = latitude + (lat * distance);
    const greaterLon = longitude + (lon * distance);
    console.log(`lower pos: ${lowerLat}, ${lowerLon}`);
    console.log(`greater pos: ${greaterLat}, ${greaterLon}`);
    const query = `latitud_gte=${lowerLat}&latitud_lte=${greaterLat}&longitud_gte=${lowerLon}&longitud_lte=${greaterLon}`;
    console.log(query);
    const params = new HttpParams()
      .set('latitud_gte', lowerLat.toString())
      .set('latitud_lte', greaterLat.toString())
      .set('longitud_gte', lowerLon.toString())
      .set('longitud_lte', greaterLon.toString());
    return this.http.get<Propiedad[]>(this.PROPIEDAD_URL, { params, observe: 'response'});
  }

  generarGeohash(latitude: number, longitude: number): string {
    return Geohash.encode(latitude, longitude, 9);
  }

}
