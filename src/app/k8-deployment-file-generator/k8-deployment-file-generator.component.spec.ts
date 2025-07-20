import { ComponentFixture, TestBed } from '@angular/core/testing';

import { K8DeploymentFileGeneratorComponent } from './k8-deployment-file-generator.component';

describe('K8DeploymentFileGeneratorComponent', () => {
  let component: K8DeploymentFileGeneratorComponent;
  let fixture: ComponentFixture<K8DeploymentFileGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [K8DeploymentFileGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(K8DeploymentFileGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
