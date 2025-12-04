import {Component, OnInit} from '@angular/core';
import {CheatsheetGeneratorService} from "./service/cheatsheet-generator.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    MatInput,
    MatIconButton,
    NgForOf
  ],
  templateUrl: './cheatsheet-generator.component.html',
  styleUrl: './cheatsheet-generator.component.css'
})
export class CheatsheetGeneratorComponent implements OnInit {

  technology = '';
  cheatsheetHtml: SafeHtml | null = null;
  loading = false;
  error: string | null = null;
  hasCheatsheet = false; // Add this flag
  protected savedCheatsheets: string[] = []; // Initialize as empty array

  constructor(private _cheatSheetGeneratorService: CheatsheetGeneratorService, private sanitizer: DomSanitizer, private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.refreshSavedCheatSheet();
  }

  private refreshSavedCheatSheet() {
    this._cheatSheetGeneratorService.findAllTechnologies()
      .subscribe({
        next: value => {
          this.savedCheatsheets = value
        },
        error: (error) => {
          console.log(error);
          this.error = 'Failed to get saved cheatsheets: ' + error.error;
          this.snackBar.open('❌ Failed to get saved cheatsheets', 'Close', {
            duration: 3000,
            panelClass: ['mat-snackbar-error']
          });
        }
      })
  }

  generateCheatsheet() {

    if (!this.technology.trim()) {
      this.error = 'Please enter a technology name';
      return;
    }

    this.loading = true;
    this.error = null;
    this.cheatsheetHtml = null;
    this.hasCheatsheet = false;

    this._cheatSheetGeneratorService.generateCheatSheet(this.technology).subscribe({
      next: (htmlContent) => {
        const processedHtml = this.removeLinks(htmlContent);
        this.cheatsheetHtml = this.sanitizer.bypassSecurityTrustHtml(processedHtml);
        this.hasCheatsheet = true; // Set flag to true
        this.loading = false;
        this.refreshSavedCheatSheet()
      },
      error: (error) => {
        console.log(error);
        this.error = 'Failed to generate cheatsheet: ' + error.error;
        this.loading = false;
        this.hasCheatsheet = false;
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

  protected deleteCheatsheet(technology: string) {
    this._cheatSheetGeneratorService.deleteCheatSheet(technology).subscribe({
      next: value => {
        this.snackBar.open('✅ Cheatsheet deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-success']
        });

        if (technology === this.technology) {
          this.toDefaults()
        }

        this.refreshSavedCheatSheet();
      },
      error: (err) => {
        console.error('Failed to delete cheatsheet', err);
        this.snackBar.open('❌ Failed to delete cheatsheet. Try again.', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
      }
    })
  }

  protected getCheatSheet(sheet: string) {
    this.technology = sheet;
    this.generateCheatsheet()
  }

  private toDefaults() {

      this.cheatsheetHtml = null
      this.technology = ''
      this.loading = false
      this.error = null
      this.hasCheatsheet = false
  }
}
