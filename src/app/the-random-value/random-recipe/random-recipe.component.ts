import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RecipeResponse } from './dtos/RecipeResponse';
import { RandomRecipeService } from './service/random-recipe.service';
import { ImageService } from '../../image/service/image.service';


@Component({
  selector: 'app-random-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './random-recipe.component.html',
  styleUrl: './random-recipe.component.css'
})
export class RandomRecipeComponent implements OnInit {

  region: string = '';
  ingredients: string = '';
  otherConsideration: string = '';
  isLoading: boolean = false;

  recipe: RecipeResponse | null = null;

  recipeImageUrl: string | null = null;
  isImageLoading: boolean = false;

  constructor(private randomRecepiService: RandomRecipeService, private imageService: ImageService) {}

  ngOnInit(): void {
    
    this.recipe = {
  "recipeTitle": "Homestyle Chana Masala (Spicy Chickpea Curry)",
  "description": "A comforting and protein-packed North Indian staple, this Chana Masala features tender chickpeas simmered in a rich, aromatic tomato-onion gravy with a blend of warming spices. Perfect served with rice, naan, or roti.",
  "yield": "Serves 4",
  "prepTime": "20 minutes",
  "cookTime": "30 minutes",
  "ingredients": [
    "2 tbsp vegetable oil or ghee",
    "1 large onion, finely chopped",
    "2 cloves garlic, minced",
    "1 inch ginger, grated or finely minced",
    "1-2 green chilies, slit lengthwise (adjust to taste)",
    "1 tsp cumin seeds",
    "1 tsp ground coriander",
    "1/2 tsp turmeric powder",
    "1/2 tsp red chili powder (or Kashmiri chili powder for color, less heat)",
    "1/2 tsp garam masala",
    "1/2 tsp amchur (dry mango powder - optional, for tang)",
    "1 can (14.5 oz / 400g) crushed tomatoes or 2 medium fresh tomatoes, pureed",
    "2 cans (15 oz / 425g each) chickpeas, rinsed and drained",
    "1/2 cup water or vegetable broth (more if needed)",
    "1/2 tsp salt, or to taste",
    "Fresh cilantro, chopped, for garnish"
  ],
  "instructions": [
    "Heat the vegetable oil or ghee in a large pot or deep pan over medium heat. Add the cumin seeds and let them sizzle for 30 seconds until fragrant.",
    "Add the finely chopped onion and sauté for 8-10 minutes until golden brown and caramelized. This step is crucial for the depth of flavor.",
    "Add the minced garlic, grated ginger, and slit green chilies. Sauté for another 1-2 minutes until the raw smell disappears.",
    "Reduce the heat to low. Add the ground coriander, turmeric powder, red chili powder, and garam masala. Stir continuously for about 30 seconds to toast the spices, being careful not to burn them. If the pan seems too dry, add a splash of water.",
    "Increase the heat to medium. Add the crushed tomatoes (or tomato puree) and salt. Cook for 8-10 minutes, stirring occasionally, until the mixture thickens and the oil starts to separate from the sides of the pan. This indicates the masala is well cooked.",
    "Add the rinsed and drained chickpeas along with 1/2 cup of water or vegetable broth. Stir everything together. Bring the mixture to a gentle boil, then reduce the heat to low, cover, and simmer for 10-15 minutes, allowing the flavors to meld. Stir occasionally to prevent sticking.",
    "Stir in the amchur powder (if using) and check for seasoning, adjusting salt if necessary. If the curry is too thick, add a little more hot water to reach your desired consistency.",
    "Garnish generously with fresh chopped cilantro before serving."
  ],
  "imagePrompt": "A vibrant and hearty bowl of Chana Masala, a spicy Indian chickpea curry, garnished with fresh cilantro, served with fluffy basmati rice and warm naan bread on the side. The curry has a rich, reddish-brown color with visible chickpeas and a slightly thick, glossy gravy. Soft, inviting lighting."
};
  }

  submitForm(): void {
    this.isLoading = true;

    this.randomRecepiService.getRandomRecipe(this.region, this.ingredients, this.otherConsideration).subscribe({
      next: (response: RecipeResponse) => {
        this.recipe = response;
        this.isLoading = false;
        this.loadRecipeImage(response.imagePrompt);
      },
      error: (err) => {
        console.error('Recipe fetch failed', err);
        this.isLoading = false;
      }
    });
  }

loadRecipeImage(imagePrompt: string): void {
  this.isImageLoading = true;
  this.recipeImageUrl = null;
  this.imageService.getBufferedImage(imagePrompt).subscribe({
    next: (blob: Blob) => {
      this.recipeImageUrl = URL.createObjectURL(blob);
      // Spinner will hide after image loads (onImageLoad)
    },
    error: (err) => {
      console.error('Image fetch failed', err);
      this.isImageLoading = false;
    }
  });
}

  onImageLoad(): void {
    this.isImageLoading = false;
  }
}