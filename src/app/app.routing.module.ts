import {Routes} from '@angular/router';
import {
  K8DeploymentFileGeneratorComponent
} from "./k8-deployment-file-generator/k8-deployment-file-generator.component";
import {PromptRefinerComponent} from "./prompt-refiner/prompt-refiner.component";

export const routes: Routes = [
  {path: '', component: K8DeploymentFileGeneratorComponent},
  {path: 'deployment-configuration', component: K8DeploymentFileGeneratorComponent},
  {path: 'prompt-refiner', component: PromptRefinerComponent}
];
