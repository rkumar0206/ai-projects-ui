import {Component} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {NgForOf, NgIf} from "@angular/common";
import {PromptRefinerService} from "./service/prompt-refiner.service";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-prompt-refiner',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatSelect,
    MatOption,
    NgForOf,
    NgIf,
    MatIcon,
    HttpClientModule,
    MatProgressSpinner
  ],
  templateUrl: './prompt-refiner.component.html',
  styleUrl: './prompt-refiner.component.css'
})
export class PromptRefinerComponent {

  promptForm: FormGroup;
  isLoading = false;
  refinedPrompt: string = '';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private refinerService: PromptRefinerService
  ) {
    this.promptForm = this.fb.group({
      rawPrompt: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  submit(): void {
    if (this.promptForm.invalid) {
      this.promptForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.refinedPrompt = '';
    const raw = this.promptForm.value.rawPrompt;

    this.refinerService.refinePrompt(raw).subscribe({
      next: (response: string) => {
        this.refinedPrompt = response.replace('Refined Prompt:\n', '');
        this.isLoading = false;
      },
      error: () => {
        this.refinedPrompt = 'Something went wrong. Please try again.';
        this.isLoading = false;
      }
    });
  }

  copyToClipboard(): void {
    if (!this.refinedPrompt) return;

    navigator.clipboard.writeText(this.refinedPrompt)
      .then(() => {
        this.snackBar.open('Prompt copied to clipboard!', 'Close', {
          duration: 2000
        });
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  }
}
