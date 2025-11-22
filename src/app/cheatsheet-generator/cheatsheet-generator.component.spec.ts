import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheatsheetGeneratorComponent } from './cheatsheet-generator.component';

describe('CheatsheetGeneratorComponent', () => {
  let component: CheatsheetGeneratorComponent;
  let fixture: ComponentFixture<CheatsheetGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheatsheetGeneratorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheatsheetGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
