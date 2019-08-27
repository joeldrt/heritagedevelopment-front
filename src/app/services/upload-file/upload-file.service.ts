import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadResponse } from 'src/app/models/upload-response';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private UPLOAD_URL = environment.API_URL + 'upload';

  constructor(
    private http: HttpClient,
  ) { }

  uploadFile(file: File): Observable<HttpResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('files', file);
    return this.http.post<UploadResponse>(this.UPLOAD_URL, formData, { observe: 'response'});
  }
}
