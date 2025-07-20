import { TestBed } from '@angular/core/testing';

import { K8DeploymentFileGeneratorService } from './k8-deployment-file-generator.service';

describe('K8DeploymentFileGeneratorService', () => {
  let service: K8DeploymentFileGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(K8DeploymentFileGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
