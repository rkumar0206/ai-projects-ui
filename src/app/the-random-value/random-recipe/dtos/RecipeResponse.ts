export interface RecipeResponse {
  recipeTitle: string;
  description: string;
  yield: string;
  prepTime: string;
  cookTime: string;
  ingredients: string[];
  instructions: string[];
  imagePrompt: string; // Optional field for image prompt
}