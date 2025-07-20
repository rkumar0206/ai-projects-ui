import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomColorsComponent } from './random-colors.component';

describe('RandomColorsComponent', () => {
  let component: RandomColorsComponent;
  let fixture: ComponentFixture<RandomColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomColorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RandomColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
