import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExpiryReportComponent } from './post-expiry-report.component';

describe('PostExpiryReportComponent', () => {
  let component: PostExpiryReportComponent;
  let fixture: ComponentFixture<PostExpiryReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostExpiryReportComponent]
    });
    fixture = TestBed.createComponent(PostExpiryReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
