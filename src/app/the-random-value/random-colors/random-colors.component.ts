import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomColorService } from './service/random-color-service';
import { PaletteResponse, PaletteColor } from './dtos/PaletteResponse';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-random-colors',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, MatButtonModule, MatProgressSpinner],
  templateUrl: './random-colors.component.html',
  styleUrl: './random-colors.component.css'
})
export class RandomColorsComponent implements OnInit {

    palette: PaletteColor[] = [
    {
      hexCode: '#1D1D2C',
      colorName: 'Midnight Ink',
      category: 'neutral/background'
    },
    {
      hexCode: '#4F4A80',
      colorName: 'Deep Orchid',
      category: 'primary'
    },
    {
      hexCode: '#F06292',
      colorName: 'Blossom Pink',
      category: 'accent'
    },
    {
      hexCode: '#67D0CB',
      colorName: 'Aqua Mist',
      category: 'secondary accent'
    },
    {
      hexCode: '#D9534F',
      colorName: 'Ember Red',
      category: 'warn/error'
    }
  ];
  themeName: string = 'Midnight Bloom';
  rationale: string = `The 'Midnight Bloom' palette evokes the enchanting beauty of flowers unfolding under the veil of night, illuminated by ethereal glows. 'Midnight Ink' serves as the dark, encompassing background, reminiscent of a deep, starless sky. 'Deep Orchid' is the sophisticated primary color, providing a rich, foundational tone like the elegant petals of a night-blooming flower. 'Blossom Pink' acts as the vibrant main accent, representing the striking, almost magical burst of color of a flower in full bloom. 'Aqua Mist' provides a complementary secondary accent, suggesting dew-kissed leaves or the soft, moonlit glow that outlines nocturnal flora. Finally, 'Ember Red' is a clear yet harmonizing warn/error color, like a distant, smoldering ember providing a subtle warning in the dark, maintaining the palette's overall mystical and rich aesthetic.`;

  isLoading: boolean = false;

  constructor(
    private randomColorService: RandomColorService,
    private clipboard: Clipboard
  ) {}

  ngOnInit(): void {
    //this.refreshPalette();
  }

  refreshPalette(): void {

    this.isLoading = true;

    this.randomColorService.getPalette().subscribe((response: PaletteResponse) => {
      this.palette = response.palette;
      this.themeName = response.themeName;
      this.rationale = response.rationale;
      this.isLoading = false;
    }, error => {
      console.error('Error fetching color palette:', error);
      this.isLoading = false;
    });
  }

  copyColor(hexCode: string): void {
    this.clipboard.copy(hexCode);
  }
}