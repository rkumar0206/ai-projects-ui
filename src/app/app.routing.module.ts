import {Routes} from '@angular/router';
import {
  K8DeploymentFileGeneratorComponent
} from "./k8-deployment-file-generator/k8-deployment-file-generator.component";
import {PromptRefinerComponent} from "./prompt-refiner/prompt-refiner.component";

export const routes: Routes = [
  {path: '', component: K8DeploymentFileGeneratorComponent},
  {path: 'deployment-configuration', component: K8DeploymentFileGeneratorComponent},
  {path: 'prompt-refiner', component: PromptRefinerComponent},
  {path: 'the-random-value', loadComponent: () => import('./the-random-value/the-random-value.component').then(m => m.TheRandomValueComponent)},
  {path: 'the-random-value/colors', loadComponent: () => import('./the-random-value/random-colors/random-colors.component').then(m => m.RandomColorsComponent)},
  {path: 'the-random-value/repositories', loadComponent: () => import('./the-random-value/random-repository/random-repository.component').then(m => m.RandomRepositoryComponent)},
  {path: 'the-random-value/images', loadComponent: () => import('./the-random-value/random-image/random-image.component').then(m => m.RandomImageComponent)},
  {path: 'the-random-value/recipes', loadComponent: () => import('./the-random-value/random-recipe/random-recipe.component').then(m => m.RandomRecipeComponent)},
];
