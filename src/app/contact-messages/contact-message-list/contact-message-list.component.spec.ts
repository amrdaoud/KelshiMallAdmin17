import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageListComponent } from './contact-message-list.component';

describe('ContactMessageListComponent', () => {
  let component: ContactMessageListComponent;
  let fixture: ComponentFixture<ContactMessageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactMessageListComponent]
    });
    fixture = TestBed.createComponent(ContactMessageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
