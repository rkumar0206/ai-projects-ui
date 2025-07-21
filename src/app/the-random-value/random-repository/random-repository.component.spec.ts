import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomRepositoryComponent } from './random-repository.component';

describe('RandomRepositoryComponent', () => {
  let component: RandomRepositoryComponent;
  let fixture: ComponentFixture<RandomRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomRepositoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
