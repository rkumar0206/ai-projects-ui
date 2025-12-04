import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PartialImageResponses } from '../dto/ImageResponses';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly apiUrl = `${environment.apiUrl}/generator/image`;

  constructor(private http: HttpClient) {}

  getBufferedImage(prompt: string): Observable<Blob> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get(`${this.apiUrl}/buffered-image`, { params, responseType: 'blob' });
  }

  getSavedImages(): Observable<PartialImageResponses[]> {
    return this.http.get<PartialImageResponses[]>(`${this.apiUrl}/all-prompts`);
  }

  deleteSavedImage(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/saved-image/${id}`);
  }

}
