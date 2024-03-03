import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipAddComponent } from './membership-add.component';

describe('MembershipAddComponent', () => {
  let component: MembershipAddComponent;
  let fixture: ComponentFixture<MembershipAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MembershipAddComponent]
    });
    fixture = TestBed.createComponent(MembershipAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
