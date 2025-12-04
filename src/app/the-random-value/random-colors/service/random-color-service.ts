import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaletteResponse } from '../dtos/PaletteResponse';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RandomColorService {
  private readonly apiUrl = `${environment.apiUrl}/the-random-value/colors/palette`;

  constructor(private http: HttpClient) {}

  getPalette(): Observable<PaletteResponse> {
    return this.http.get<PaletteResponse>(this.apiUrl);
  }
}
