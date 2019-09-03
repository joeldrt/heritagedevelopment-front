import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Configuration } from 'src/app/models/configuration';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private CONFIGURATION_URL = environment.API_URL + 'configurations/5d6d2e8b4326975cbc772041';

  constructor(
    private http: HttpClient,
  ) { }

  obtenerArchivoDeConfiguracion(): Observable<HttpResponse<Configuration>> {
    return this.http.get<Configuration>(this.CONFIGURATION_URL, { observe: 'response' });
  }

  actualizarArchivoDeconfiguracion(configuration: Configuration): Observable<HttpResponse<Configuration>> {
    return this.http.put<Configuration>(this.CONFIGURATION_URL, configuration, { observe: 'response' });
  }
}
