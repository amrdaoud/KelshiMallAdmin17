import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationWizardComponent } from './notification-wizard.component';

describe('NotificationWizardComponent', () => {
  let component: NotificationWizardComponent;
  let fixture: ComponentFixture<NotificationWizardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationWizardComponent]
    });
    fixture = TestBed.createComponent(NotificationWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
