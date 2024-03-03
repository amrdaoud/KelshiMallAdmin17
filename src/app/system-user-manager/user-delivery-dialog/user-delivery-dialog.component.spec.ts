import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeliveryDialogComponent } from './user-delivery-dialog.component';

describe('UserDeliveryDialogComponent', () => {
  let component: UserDeliveryDialogComponent;
  let fixture: ComponentFixture<UserDeliveryDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UserDeliveryDialogComponent]
    });
    fixture = TestBed.createComponent(UserDeliveryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
