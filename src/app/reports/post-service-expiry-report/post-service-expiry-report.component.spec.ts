import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostServiceExpiryReportComponent } from './post-service-expiry-report.component';

describe('PostServiceExpiryReportComponent', () => {
  let component: PostServiceExpiryReportComponent;
  let fixture: ComponentFixture<PostServiceExpiryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostServiceExpiryReportComponent]
    });
    fixture = TestBed.createComponent(PostServiceExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
