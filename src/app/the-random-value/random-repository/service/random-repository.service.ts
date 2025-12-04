import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RandomRespositoryResponse } from '../dtos/RandomRespositoryDTOs';
import { Observable } from 'rxjs';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RandomRepositoryService {

    private readonly apiUrl = `${environment.apiUrl}/the-random-value/repositories`;

    constructor(private http: HttpClient) {}

  getRandomRepositories(count?: number, languagesUsed?: string): Observable<RandomRespositoryResponse> {
    let params = new HttpParams();
    if (count !== undefined && count !== null) {
      params = params.set('count', count.toString());
    }
    if (languagesUsed) {
      params = params.set('languagesUsed', languagesUsed);
    }
    return this.http.get<RandomRespositoryResponse>(this.apiUrl, { params });
  }
}
