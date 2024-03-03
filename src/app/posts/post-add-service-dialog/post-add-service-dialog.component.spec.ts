import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAddServiceDialogComponent } from './post-add-service-dialog.component';

describe('PostAddServiceDialogComponent', () => {
  let component: PostAddServiceDialogComponent;
  let fixture: ComponentFixture<PostAddServiceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostAddServiceDialogComponent]
    });
    fixture = TestBed.createComponent(PostAddServiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
