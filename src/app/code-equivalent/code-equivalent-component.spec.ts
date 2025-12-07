import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEquivalentComponent } from './code-equivalent-component';

describe('CodeEquivalentComponent', () => {
  let component: CodeEquivalentComponent;
  let fixture: ComponentFixture<CodeEquivalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeEquivalentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeEquivalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
