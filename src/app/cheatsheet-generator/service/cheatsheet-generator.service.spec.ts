import { TestBed } from '@angular/core/testing';

import { CheatsheetGeneratorService } from './cheatsheet-generator.service';

describe('CheatsheetGeneratorService', () => {
  let service: CheatsheetGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheatsheetGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
