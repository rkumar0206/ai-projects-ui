import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RandomImageService} from './service/random-image.service';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {MatIcon} from "@angular/material/icon";
import {ImageService} from '../../image/service/image.service';
import {PartialImageResponses} from '../../image/dto/ImageResponses';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-random-image',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule, MatIcon],
  templateUrl: './random-image.component.html',
  styleUrl: './random-image.component.css'
})
export class RandomImageComponent implements OnInit {

  keywords: string = '';
  imageUrl: SafeUrl | null = null;
  imageRawUrl: string | null = null; // Store the raw image URL for download
  imageDescription: string | null = '';
  isLoading: boolean = false;
  imageWidth: number | null = null;
  imageHeight: number | null = null;
  savedImages: PartialImageResponses[] = []; // Array to hold saved image URLs

  constructor(private randomImgeService: RandomImageService, private imageService: ImageService, private sanitizer: DomSanitizer, private _snackbar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.getSavedImages(true);
  }

  getSavedImages(refresh: boolean) {

    this.imageService.getSavedImages().subscribe({
      next: (images: PartialImageResponses[]) => {
        this.savedImages = images;

        if (refresh && images.length > 0) {
          this.loadSavedImage(images[0]);
        } else if (refresh && images.length === 0) {
          this.loadInitialImage();
        }

      },
      error: (err) => {
        console.error('Failed to fetch saved images', err);
        this.loadInitialImage();
      }
    });
  }

  loadInitialImage() {

    this.imageRawUrl = this.randomImgeService.getInitialImageString()
    this.imageUrl = this.imageRawUrl ? this.sanitizer.bypassSecurityTrustUrl(this.imageRawUrl) : null;
    this.imageDescription = 'A colossal, translucent crystalline whale, its form swirling with distant nebulae and constellations, gently ascends through a vibrant cosmic reef teeming with bioluminescent, rainbow-hued jellyfish. A delicate, barnacle-encrusted wooden shipwreck, softly glowing with internal starlight, is elegantly draped over its immense dorsal fin. The scene is bathed in the ethereal twilight glow of a dying star and shimmering cosmic dust, casting a dreamlike, awe-inspiring atmosphere of deep space wonder. Highly detailed digital painting in the style of ethereal fantasy art meets hyperrealistic cosmic photography, 8k, volumetric lighting, ultra-wide angle, celestial.';

  }

  loadSavedImage(savedImage: PartialImageResponses) {

    this.isLoading = true;

    this.imageService.getBufferedImage(savedImage.prompt).subscribe({
      next: (blob: Blob) => {
        this.imageRawUrl = URL.createObjectURL(blob);
        this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(this.imageRawUrl);
        this.imageDescription = savedImage.prompt; // Assuming prompt is used as description
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load saved image', err);
        this.isLoading = false;
      }
    });

  }

  submitForm(): void {
    console.log('Keywords submitted:', this.keywords);
    this.isLoading = true;
    this.randomImgeService.getRandomImagePrompt(this.keywords).subscribe({
      next: (response) => {
        this.imageDescription = response.description;

        this.randomImgeService.generateImageByPrompt(this.imageDescription).subscribe({
          next: (response) => {
            this.imageRawUrl = response.image; // Save raw URL for download
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(response.image); // Use DomSanitizer for safe display
            this.getSavedImages(false); // Refresh saved images after fetching a new one
          },
          error: (err) => {
            this._snackbar.open('❌ Failed to load image. Please try again.', 'Close', {
              duration: 3000,
              panelClass: ['mat-snackbar-error']
            });
            this.isLoading = false;
          }
        })
      },
      error: (err) => {
        this._snackbar.open('❌ Failed to load image prompt', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
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

  deleteSavedImage(partialImageData: PartialImageResponses) {

    this.imageService.deleteSavedImage(partialImageData.id).subscribe({
      next: () => {
        console.log('Image deleted successfully');
        this.getSavedImages(false); // Refresh saved images after deletion
      },
      error: (err) => {
        console.error('Failed to delete image', err);
      }
    });
  }

}


