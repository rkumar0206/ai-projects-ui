import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RandomImageService } from './service/random-image.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.css'
})
export class RandomImageComponent implements OnInit{
  keywords: string = '';
  imageUrl: SafeUrl | null = null;
  imageRawUrl: string | null = null; // Store the raw image URL for download
  imageDescription: string | null = '';
  isLoading: boolean = false;
imageWidth: number | null = null;
imageHeight: number | null = null;

  constructor(private randomImgeService: RandomImageService, private sanitizer: DomSanitizer) {}
  ngOnInit(): void {
    this.imageRawUrl = this.randomImgeService.getInitialImageString()
    this.imageUrl = this.imageRawUrl ? this.sanitizer.bypassSecurityTrustUrl(this.imageRawUrl) : null;
    this.imageDescription = 'A colossal, translucent crystalline whale, its form swirling with distant nebulae and constellations, gently ascends through a vibrant cosmic reef teeming with bioluminescent, rainbow-hued jellyfish. A delicate, barnacle-encrusted wooden shipwreck, softly glowing with internal starlight, is elegantly draped over its immense dorsal fin. The scene is bathed in the ethereal twilight glow of a dying star and shimmering cosmic dust, casting a dreamlike, awe-inspiring atmosphere of deep space wonder. Highly detailed digital painting in the style of ethereal fantasy art meets hyperrealistic cosmic photography, 8k, volumetric lighting, ultra-wide angle, celestial.';
  }

  submitForm(): void {
  console.log('Keywords submitted:', this.keywords);
  this.isLoading = true;
this.randomImgeService.getRandomImage(this.keywords).subscribe({
  next: (response) => {
    this.imageDescription = response.description;
    this.imageRawUrl = response.image; // Save raw URL for download
    this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(response.image); // Use DomSanitizer for safe display
  },
  error: (err) => {
    console.error('Image fetch failed', err);
  }
});

  }

// Update onImageLoad method
onImageLoad(event: Event): void {
  this.isLoading = false;
  const img = event.target as HTMLImageElement;
  this.imageWidth = img.naturalWidth;
  this.imageHeight = img.naturalHeight;
}

downloadImage(): void {
  if (!this.imageRawUrl) return;
  const link = document.createElement('a');
  link.href = this.imageRawUrl;
  link.download = 'ai-image.png';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

}
}


