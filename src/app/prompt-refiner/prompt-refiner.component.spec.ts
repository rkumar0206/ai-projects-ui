import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromptRefinerComponent } from './prompt-refiner.component';

describe('PromptRefinerComponent', () => {
  let component: PromptRefinerComponent;
  let fixture: ComponentFixture<PromptRefinerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromptRefinerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PromptRefinerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
