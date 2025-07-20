import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatOption, MatSelect} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {K8DeploymentFileGeneratorService} from "./service/k8-deployment-file-generator.service";
import {DeploymentRequest} from "./model/DeploymentRequest";
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-k8-deployment-file-generator',
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
  templateUrl: './k8-deployment-file-generator.component.html',
  styleUrl: './k8-deployment-file-generator.component.css'
})
export class K8DeploymentFileGeneratorComponent implements OnInit {
  deploymentForm!: FormGroup;
  frameworks = ['SPRINGBOOT'/*, 'NODE_JS', 'ANGULAR', 'REACT'*/];
  isLoading = false;


  constructor(private fb: FormBuilder, private _k8DeploymentFileGenerator: K8DeploymentFileGeneratorService) {
  }

  ngOnInit() {
    this.deploymentForm = this.fb.group({
      framework: ['SPRINGBOOT'],
      appName: [''],
      port: [8080],
      replicas: [1],
      tag: ['v1.0.0'],
      envVariables: this.fb.array([]),
      secrets: this.fb.array([]),
      enableIngress: [false],
      ingressHost: [''],
      enableHPA: [false],
      dockerfileConfig: this.fb.group({
        baseImage: ['gradle:8.5-jdk21'],
        artifactName: [''],
        labels: this.fb.array([]),
        arguments: this.fb.array([])
      }),
      resourceLimits: this.fb.group({
        cpu: ['500m'],
        memory: ['512Mi']
      }),
      hpa: this.fb.group({
        minReplicas: [1],
        maxReplicas: [3],
        targetCPUUtilizationPercentage: [80]
      })
    });

    // add one default row
    this.addEnvVar();
    this.addSecret();
    this.addLabel();
    this.addArgument();
  }

  // --- Environment Variables ---
  get envVariables(): FormArray {
    return this.deploymentForm.get('envVariables') as FormArray;
  }

  addEnvVar(): void {
    this.envVariables.push(this.fb.group({ key: '', value: '' }));
  }

  removeEnvVar(index: number): void {
    this.envVariables.removeAt(index);
  }

  // --- Secrets ---
  get secrets(): FormArray {
    return this.deploymentForm.get('secrets') as FormArray;
  }

  addSecret(): void {
    this.secrets.push(this.fb.group({ key: '', value: '' }));
  }

  removeSecret(index: number): void {
    this.secrets.removeAt(index);
  }


  // --- Dockerfile Labels ---
  get labels(): FormArray {
    return this.deploymentForm.get('dockerfileConfig')?.get('labels') as FormArray;
  }

  addLabel(): void {
    this.labels.push(this.fb.group({ key: '', value: '' }));
  }

  removeLabel(index: number): void {
    this.labels.removeAt(index);
  }

  // --- Dockerfile Arguments ---
  get arguments(): FormArray {
    return this.deploymentForm.get('dockerfileConfig')?.get('arguments') as FormArray;
  }

  addArgument(): void {
    this.arguments.push(this.fb.group({ key: '', value: '' }));
  }

  removeArgument(index: number): void {
    this.arguments.removeAt(index);
  }

  // --- Submit handler ---
  submit(): void {
    if (this.deploymentForm.invalid) {
      this.deploymentForm.markAllAsTouched();
      return;
    }

    const requestPayload: DeploymentRequest = this.transformToBackendModel(this.deploymentForm.value);
    console.log('🚀 Final Payload:', requestPayload);
    // Send this to backend via service

    this.isLoading = true;

    this._k8DeploymentFileGenerator.generateYamlZip(requestPayload).subscribe({
      next: (zipBlob) => {
        const url = window.URL.createObjectURL(zipBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = requestPayload.appName + '.zip';
        a.click();
        window.URL.revokeObjectURL(url);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Deployment failed:', err);
        this.isLoading = false;
      }
    });
  }

  private transformToBackendModel(formValue: any): DeploymentRequest {
    return {
      ...formValue,
      envVariables: this.arrayToMap(formValue.envVariables),
      secrets: this.arrayToMap(formValue.secrets),
      dockerfileConfig: {
        ...formValue.dockerfileConfig,
        labels: this.arrayToMap(formValue.dockerfileConfig.labels),
        arguments: this.arrayToMap(formValue.dockerfileConfig.arguments),
      }
    };
  }

  private arrayToMap(arr: { key: string; value: string }[]): { [key: string]: string } {
    const map: { [key: string]: string } = {};
    arr.forEach(item => {
      if (item.key) map[item.key] = item.value;
    });
    return map;
  }
}
