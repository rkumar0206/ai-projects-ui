import { TestBed } from '@angular/core/testing';

import { PromptRefinerService } from './prompt-refiner.service';

describe('PromptRefinerService', () => {
  let service: PromptRefinerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptRefinerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
