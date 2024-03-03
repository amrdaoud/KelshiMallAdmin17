import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipExpiryReportComponent } from './membership-expiry-report.component';

describe('MembershipExpiryReportComponent', () => {
  let component: MembershipExpiryReportComponent;
  let fixture: ComponentFixture<MembershipExpiryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MembershipExpiryReportComponent]
    });
    fixture = TestBed.createComponent(MembershipExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
