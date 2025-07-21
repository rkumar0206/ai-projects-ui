import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Repository } from './dtos/RandomRespositoryDTOs';
import { RandomRepositoryService } from './service/random-repository.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@Component({
  selector: 'app-random-repository',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './random-repository.component.html',
  styleUrl: './random-repository.component.css'
})
export class RandomRepositoryComponent {
  
  constructor(private randomRepositoryService: RandomRepositoryService) {}
  
  repositories: Repository[] = [
    {
      "url": "https://github.com/microsoft/vscode",
      "briefDescription": "The source code for Visual Studio Code, a popular cross-platform code editor.",
      "languages": ["TypeScript", "JavaScript", "HTML", "CSS", "SCSS"]
    },
    {
      url: 'https://github.com/traccar/traccar',
      briefDescription: 'Traccar is an open-source GPS tracking system...',
      languages: ['Java', 'JavaScript', 'HTML', 'CSS']
    },
    {
      url: "https://github.com/ThingsBoard/thingsboard",
      briefDescription: "ThingsBoard is an open-source IoT platform for data collection, processing, visualization, and device management. It enables rapid development of IoT applications.",
      languages: ["Java", "JavaScript", "HTML", "CSS", "Shell", "Dockerfile"]
    },
    {
      "url": "https://github.com/elastic/elasticsearch",
      "briefDescription": "Elasticsearch is a distributed, RESTful search and analytics engine capable of solving a growing number of use cases. It's built on Apache Lucene.",
      "languages": ["Java", "Python", "Go", "JavaScript", "Ruby", "PHP", "C#", "Perl"]
    },
        {
      url: "https://github.com/JabRef/jabref",
      briefDescription: "JabRef is an open-source, cross-platform citation and reference management system. It uses BibTeX and BibLaTeX as its native formats and provides a graphical user interface for editing, importing, and managing bibliographic data.",
      languages: ["Java"]
    },
    {
      url: "https://github.com/strongbox/strongbox",
      briefDescription: "Strongbox is an open-source artifact repository manager written in Java. It provides a platform for hosting binary artifacts in various formats like Maven, NPM, NuGet, and Raw, aiming to be a universal repository manager.",
      languages: ["Java"]
    },
        {
      url: "https://github.com/iluwatar/java-design-patterns",
      briefDescription: "This repository provides a comprehensive collection of popular design patterns implemented in Java, serving as an excellent educational resource for developers.",
      languages: ["Java"]
    },
    {
      url: "https://github.com/square/retrofit",
      briefDescription: "Retrofit is a type-safe HTTP client for Android and Java. It simplifies consuming RESTful web services by turning HTTP APIs into Java interfaces.",
      languages: ["Java", "Kotlin"]
    },
  ];

  repoCount: number = 8;
  languages: string = '';
  isLoading: boolean = false;

  openRepo(url: string): void {
    window.open(url, '_blank');
  }

  getRepoTitle(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  submitForm(): void {
    // Here you would call your backend API with repoCount and languages
    // For now, just log the values
    console.log('Requested repo count:', this.repoCount);
    console.log('Requested languages:', this.languages);
    // TODO: Fetch repositories from backend and update this.repositories

    this.isLoading = true;

    this.randomRepositoryService.getRandomRepositories(this.repoCount, this.languages).subscribe(response => {
      this.repositories = response.repositories;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching repositories:', error);
      this.isLoading = false;
    });
  }
}