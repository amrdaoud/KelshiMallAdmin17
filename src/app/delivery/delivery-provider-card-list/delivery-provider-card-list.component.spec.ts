import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProviderCardListComponent } from './delivery-provider-card-list.component';

describe('DeliveryProviderCardListComponent', () => {
  let component: DeliveryProviderCardListComponent;
  let fixture: ComponentFixture<DeliveryProviderCardListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryProviderCardListComponent]
    });
    fixture = TestBed.createComponent(DeliveryProviderCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
