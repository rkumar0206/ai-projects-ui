import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  header = 'AI Tools';

  categories = [
    { name: 'The Random Value', image: 'assets/images/th_random_value.png' },
    { name: 'Cheatsheet Generator', image: 'assets/images/cheatsheet_generator.png' },
    { name: 'K8 config generator', image: 'assets/images/k8s_config_gen.png' },
  ];

  // Handle category click logic here
  // For example, navigate to a new page or display results based on the selected category
  onCategoryClick(category: { name: string; image: string; }) {
    console.log('Category clicked:', category);
    // Implement your logic here

    switch (category.name) {
      case 'K8 config generator':
        this.router.navigate(['/deployment-configuration']);
        break;
      case 'The Random Value':
        this.router.navigate(['/the-random-value']);
        break;
      case 'Cheatsheet Generator':
        this.router.navigate(['/cheatsheet-generator']);
        break;
      default:
        console.log('Category clicked:', category);
        // Implement your logic here
        break;
    }
  }
}
