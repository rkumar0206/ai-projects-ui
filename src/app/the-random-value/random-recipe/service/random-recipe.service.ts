import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PartialRecipeResponse, RecipeResponse } from '../dtos/RecipeResponse';
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RandomRecipeService {
  private readonly apiUrl = `${environment.apiUrl}/the-random-value/recipe`;

  constructor(private http: HttpClient) { }

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

  saveRecipe(recipe: RecipeResponse): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/db`, recipe);
  }

  deleteRecipe(recipeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/db/${recipeId}`);
  }

  getSavedRecipes(): Observable<PartialRecipeResponse[]> {
    return this.http.get<RecipeResponse[]>(`${this.apiUrl}/db/partial-data`);
  }

  getReceipeById(recipeId: number): Observable<RecipeResponse> {
    return this.http.get<RecipeResponse>(`${this.apiUrl}/db/${recipeId}`);
  }

}
