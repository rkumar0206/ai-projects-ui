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
    { name: 'CodeEquivalent', image: 'assets/images/cross_platform_mapping_img.png' },
    { name: 'K8s config generator', image: 'assets/images/k8s_config.png' },
  ];

  // Handle category click logic here
  // For example, navigate to a new page or display results based on the selected category
  onCategoryClick(category: { name: string; image: string; }) {
    console.log('Category clicked:', category);
    // Implement your logic here

    switch (category.name) {
      case 'K8s config generator':
        this.router.navigate(['/deployment-configuration']);
        break;
      case 'The Random Value':
        this.router.navigate(['/the-random-value']);
        break;
      case 'Cheatsheet Generator':
        this.router.navigate(['/cheatsheet-generator']);
        break;
      case 'CodeEquivalent':
        this.router.navigate(['/code-equivalent']);
        break
      default:
        console.log('Category clicked:', category);
        // Implement your logic here
        break;
    }
  }
}
