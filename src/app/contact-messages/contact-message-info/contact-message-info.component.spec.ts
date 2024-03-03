import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactMessageInfoComponent } from './contact-message-info.component';

describe('ContactMessageInfoComponent', () => {
  let component: ContactMessageInfoComponent;
  let fixture: ComponentFixture<ContactMessageInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ContactMessageInfoComponent]
    });
    fixture = TestBed.createComponent(ContactMessageInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
