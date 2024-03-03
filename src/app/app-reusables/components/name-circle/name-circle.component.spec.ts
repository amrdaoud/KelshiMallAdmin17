import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameCircleComponent } from './name-circle.component';

describe('NameCircleComponent', () => {
  let component: NameCircleComponent;
  let fixture: ComponentFixture<NameCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NameCircleComponent]
    });
    fixture = TestBed.createComponent(NameCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
