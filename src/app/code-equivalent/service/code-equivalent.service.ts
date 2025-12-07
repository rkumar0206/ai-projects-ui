import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CodeEquivalentDto} from "../model/code-equivalent-dto";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CodeEquivalentService {

  private readonly baseUrl = `${environment.apiUrl}/code-equivalent`;
  private http = inject(HttpClient);

  generateReport(payload: CodeEquivalentDto): Observable<string> {
    return this.http.post(`${this.baseUrl}/report`, payload, {
      responseType: 'text'
    });
  }

  getAllSavedReports(): Observable<CodeEquivalentDto[]> {
    return this.http.get<CodeEquivalentDto[]>(`${this.baseUrl}/all`)
  }

  getReportById(id: number): Observable<string> {
    return this.http.get<string>(`${this.baseUrl}/report/${id}`)
  }

  deleteReportById(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`)
  }

}
