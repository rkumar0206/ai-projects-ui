import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private readonly apiUrl = 'http://localhost:7070/api/generator/image/buffered-image';

  constructor(private http: HttpClient) {}

  getBufferedImage(prompt: string): Observable<Blob> {
    const params = new HttpParams().set('prompt', prompt);
    return this.http.get(this.apiUrl, { params, responseType: 'blob' });
  }
}