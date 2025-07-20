import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PromptRefinerService {

  constructor(private _httpClient: HttpClient) {
  }

  private readonly apiUrl: string = 'http://localhost:7070/api/prompt-refiner/refine'; // Adjust if needed

  refinePrompt(rawText: string): Observable<string> {
    const params = new HttpParams().set('rawText', rawText);

    return this._httpClient.get<{ response: string }>(this.apiUrl, {params}).pipe(
      map(res => res.response)
    );
  }
}
