import { TestBed } from '@angular/core/testing';

import { RandomRecipeService } from './random-recipe.service';

describe('RandomRecipeService', () => {
  let service: RandomRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
