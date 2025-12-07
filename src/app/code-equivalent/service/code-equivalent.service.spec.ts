import { TestBed } from '@angular/core/testing';

import { CodeEquivalentService } from './code-equivalent.service';

describe('CodeEquivalentService', () => {
  let service: CodeEquivalentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CodeEquivalentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
