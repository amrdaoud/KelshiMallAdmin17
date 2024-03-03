import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNotificationComponent } from './post-notification.component';

describe('PostNotificationComponent', () => {
  let component: PostNotificationComponent;
  let fixture: ComponentFixture<PostNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostNotificationComponent]
    });
    fixture = TestBed.createComponent(PostNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
