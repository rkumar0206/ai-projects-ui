import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheRandomValueComponent } from './the-random-value.component';

describe('TheRandomValueComponent', () => {
  let component: TheRandomValueComponent;
  let fixture: ComponentFixture<TheRandomValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheRandomValueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheRandomValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
