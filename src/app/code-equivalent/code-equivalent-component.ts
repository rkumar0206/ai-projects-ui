import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {CodeEquivalentService} from "./service/code-equivalent.service";
import {CodeEquivalentDto} from "./model/code-equivalent-dto";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cross-platform-mapping',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatError,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatProgressSpinner,
    NgIf,
    NgForOf,
    MatIconButton
  ],
  templateUrl: './code-equivalent-component.html',
  styleUrl: './code-equivalent-component.css'
})
export class CodeEquivalentComponent implements OnInit {

  protected source: string = '';
  protected target: string = '';
  protected tool: string = '';
  protected error: string | null = null;
  protected loading: boolean = false;
  protected hasReport: boolean = false;
  protected reportHtml: SafeHtml | null = null;
  protected savedReports: CodeEquivalentDto[] = [];

  private codeEquivalentService = inject(CodeEquivalentService)
  private sanitizer: DomSanitizer = inject(DomSanitizer)
  private snackBar: MatSnackBar = inject(MatSnackBar)

  ngOnInit(): void {
    this.refreshSavedReports()
  }

  protected generateReport() {

    let codeEquivalentDto: CodeEquivalentDto = this.constructDTO()

    if (!codeEquivalentDto || !this.source.trim() || !this.target.trim() || !this.tool.trim()) {
      this.error = "Please fill out all the required fields"
    }

    this.loading = true;
    this.error = null;
    this.reportHtml = null;
    this.hasReport = false;


    this.codeEquivalentService.generateReport(codeEquivalentDto).subscribe({
      next: (htmlContent) => {
        const processedHtml = this.removeLinks(htmlContent);
        this.reportHtml = this.sanitizer.bypassSecurityTrustHtml(processedHtml);
        this.hasReport = true; // Set flag to true
        this.loading = false;
        this.refreshSavedReports()
      },
      error: (error) => {
        console.log(error);
        this.error = 'Failed to generate report: ' + error.error;
        this.loading = false;
        this.hasReport = false;
      }
    });
  }

  private constructDTO() {

    return {
      id: null,
      source: this.source,
      target: this.target,
      tool: this.tool,
    }
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

  protected getReport(codeEquivalentDto: CodeEquivalentDto) {

    this.source = codeEquivalentDto.source;
    this.target = codeEquivalentDto.target;
    this.tool = codeEquivalentDto.tool;

    this.generateReport()
  }

  protected deleteReport(id: number | null) {

    if (!id) {
      this.error = "No id provided";
      return;
    }

    this.codeEquivalentService.deleteReportById(id).subscribe({
      next: (value) => {

        this.snackBar.open('Report deleted','Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });

        this.toDefaults()

        this.refreshSavedReports()
      },
      error: (error) => {
        this.snackBar.open('❌ Failed to get delet reports', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
      }
    })

  }

  private refreshSavedReports() {

    this.codeEquivalentService.getAllSavedReports().subscribe({
      next: (data: CodeEquivalentDto[]) => {
        this.savedReports = data;
      },
      error: (error) => {
        console.log(error);
        this.error = 'Failed to get saved reports: ' + error.error;
        this.snackBar.open('❌ Failed to get saved reports', 'Close', {
          duration: 3000,
          panelClass: ['mat-snackbar-error']
        });
      }
    })
  }


  private toDefaults() {

    this.reportHtml = null
    this.source = ''
    this.target = ''
    this.tool = ''
    this.loading = false
    this.error = null
    this.hasReport = false
  }
}
