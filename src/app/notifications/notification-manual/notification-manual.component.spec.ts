import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationManualComponent } from './notification-manual.component';

describe('NotificationManualComponent', () => {
  let component: NotificationManualComponent;
  let fixture: ComponentFixture<NotificationManualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationManualComponent]
    });
    fixture = TestBed.createComponent(NotificationManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
