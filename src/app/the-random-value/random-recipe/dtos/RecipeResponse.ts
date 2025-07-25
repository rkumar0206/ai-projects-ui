export interface RecipeResponse {
  id: number;
  recipeTitle: string;
  description: string;
  yield: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  imagePrompt: string; // Optional field for image prompt
}

export interface PartialRecipeResponse {
  id: number;
  recipeTitle: string;
}