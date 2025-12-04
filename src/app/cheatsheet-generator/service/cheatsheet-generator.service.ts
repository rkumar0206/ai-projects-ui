import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CheatsheetGeneratorService {

  private readonly apiUrl = `${environment.apiUrl}/cheatsheet-generator`;

  constructor(private http: HttpClient) {
  }

  generateCheatSheet(technology: string): Observable<string> {
    const params = new HttpParams().set('technology', technology);

    return this.http.post(this.apiUrl, null, {
      params,
      responseType: 'text'
    });
  }

  findAllTechnologies(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/technologies`);
  }

  deleteCheatSheet(technology: string): Observable<string> {
    const params = new HttpParams().set('technology', technology);
    return this.http.delete<string>(`${this.apiUrl}/technologies`, {params: params});
  }

}
