import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeResponse } from '../dtos/RecipeResponse';

@Injectable({
  providedIn: 'root'
})
export class RandomRecipeService {
  private readonly apiUrl = 'http://localhost:7070/api/the-random-value/recipe';

  constructor(private http: HttpClient) {}

  getRandomRecipe(region?: string, ingredients?: string, otherConsiderations?: string): Observable<RecipeResponse> {
    let params = new HttpParams();
    if (region) {
      params = params.set('region', region);
    }
    if (ingredients) {
      params = params.set('ingredients', ingredients);
    }
    if (otherConsiderations) {
      params = params.set('otherConsiderations', otherConsiderations);
    }
    return this.http.get<RecipeResponse>(this.apiUrl, { params });
  }
}