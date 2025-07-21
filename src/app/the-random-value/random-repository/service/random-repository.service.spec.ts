import { TestBed } from '@angular/core/testing';

import { RandomRepositoryService } from './random-repository.service';

describe('RandomRepositoryService', () => {
  let service: RandomRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
