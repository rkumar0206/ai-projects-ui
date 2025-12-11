import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-the-random-value',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './the-random-value.component.html',
  styleUrl: './the-random-value.component.css'
})
export class TheRandomValueComponent {

  constructor(private router: Router, private _snackbar: MatSnackBar) { }

  header = 'Get a random result based on any of the below categories';

  categories = [
    { name: 'Github Repositories', image: 'assets/images/github_img.svg' },
    { name: 'Images', image: 'assets/images/images_img.svg' },
    { name: 'Food Recipes', image: 'assets/images/food_recipe_img.svg' },
    { name: 'Colors', image: 'assets/images/colors_img.svg' },
    { name: 'Numbers and Alphabets', image: 'assets/images/numbers_and_alphabets_img.svg' },
    { name: 'Dates', image: 'assets/images/dates_img.svg' },
    { name: 'Shopping', image: 'assets/images/shopping.svg' },
    { name: 'Videos', image: 'assets/images/video_img.svg' },
    { name: 'Articles', image: 'assets/images/article_img.svg' },
    { name: 'Stories', image: 'assets/images/stories_img.png' },
  ];

  // Handle category click logic here
  // For example, navigate to a new page or display results based on the selected category
  onCategoryClick(category: { name: string; image: string; }) {
    console.log('Category clicked:', category);
    // Implement your logic here

    switch (category.name) {
      case 'Colors':
        this.router.navigate(['/the-random-value/colors']);
        break;
      case 'Github Repositories':
        this.router.navigate(['/the-random-value/repositories']);
        break;
      case 'Images':
        this.router.navigate(['/the-random-value/images']);
        break;
      case 'Food Recipes':
        this.router.navigate(['/the-random-value/recipes']);
        break;
      default:
        console.log('Category clicked:', category);
        // Implement your logic here
        this._snackbar.open('Coming soon...', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
        break;
    }
  }
}
