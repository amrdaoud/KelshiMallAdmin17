import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepProgressBarComponent } from './step-progress-bar.component';

describe('StepProgressBarComponent', () => {
  let component: StepProgressBarComponent;
  let fixture: ComponentFixture<StepProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepProgressBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
