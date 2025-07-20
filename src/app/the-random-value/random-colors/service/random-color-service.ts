import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaletteResponse } from '../dtos/PaletteResponse';

@Injectable({
  providedIn: 'root'
})
export class RandomColorService {
  private readonly apiUrl = 'http://localhost:7070/api/the-random-value/colors/palette';

  constructor(private http: HttpClient) {}

  getPalette(): Observable<PaletteResponse> {
    return this.http.get<PaletteResponse>(this.apiUrl);
  }
}