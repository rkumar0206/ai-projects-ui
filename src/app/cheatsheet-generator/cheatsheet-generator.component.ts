import {Component} from '@angular/core';
import {CheatsheetGeneratorService} from "./service/cheatsheet-generator.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-cheatsheet-generator',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    MatCard,
    MatCardContent,
    MatFormField,
    MatLabel,
    MatProgressSpinner,
    MatError,
    MatIcon,
    MatButton,
    MatInput
  ],
  templateUrl: './cheatsheet-generator.component.html',
  styleUrl: './cheatsheet-generator.component.css'
})
export class CheatsheetGeneratorComponent {

  technology = '';
  cheatsheetHtml: SafeHtml | null = null;
  loading = false;
  error: string | null = null;

  constructor(private _cheatSheetGeneratorService: CheatsheetGeneratorService, private sanitizer: DomSanitizer
  ) {
  }

  generateCheatsheet() {

    if (!this.technology.trim()) {
      this.error = 'Please enter a technology name';
      return;
    }

    this.loading = true;
    this.error = null;
    this.cheatsheetHtml = null;

    this._cheatSheetGeneratorService.generateCheatSheet(this.technology).subscribe({
      next: (htmlContent) => {
        const processedHtml = this.removeLinks(htmlContent);
        this.cheatsheetHtml = this.sanitizer.bypassSecurityTrustHtml(processedHtml);
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
        this.error = 'Failed to generate cheatsheet: ' + error.error;
        this.loading = false;
      }
    });
  }

  private removeLinks(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const links = doc.querySelectorAll('a');
    links.forEach(link => {
      const textNode = doc.createTextNode(link.textContent || '');
      link.parentNode?.replaceChild(textNode, link);
    });

    return doc.documentElement.outerHTML;
  }

}
