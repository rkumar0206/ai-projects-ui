import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CheatsheetGeneratorService {

  private readonly apiUrl = 'http://localhost:7070/api/cheatsheet-generator';

  constructor(private http: HttpClient) {
  }

  generateCheatSheet(technology: string): Observable<string> {
    const params = new HttpParams().set('technology', technology);

    return this.http.post(this.apiUrl, null, {
      params,
      responseType: 'text'
    });
  }

}
