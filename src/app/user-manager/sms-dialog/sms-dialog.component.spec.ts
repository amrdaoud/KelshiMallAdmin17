import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDialogComponent } from './sms-dialog.component';

describe('SmsDialogComponent', () => {
  let component: SmsDialogComponent;
  let fixture: ComponentFixture<SmsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SmsDialogComponent]
    });
    fixture = TestBed.createComponent(SmsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
