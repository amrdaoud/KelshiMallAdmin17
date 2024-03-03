import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostStatusReasonComponent } from './post-status-reason.component';

describe('PostStatusReasonComponent', () => {
  let component: PostStatusReasonComponent;
  let fixture: ComponentFixture<PostStatusReasonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostStatusReasonComponent]
    });
    fixture = TestBed.createComponent(PostStatusReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
