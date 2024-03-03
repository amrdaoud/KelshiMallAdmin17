import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusReasonDialogComponent } from './status-reason-dialog.component';

describe('StatusReasonDialogComponent', () => {
  let component: StatusReasonDialogComponent;
  let fixture: ComponentFixture<StatusReasonDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StatusReasonDialogComponent]
    });
    fixture = TestBed.createComponent(StatusReasonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
