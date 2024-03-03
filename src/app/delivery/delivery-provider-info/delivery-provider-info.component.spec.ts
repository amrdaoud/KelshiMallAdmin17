import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryProviderInfoComponent } from './delivery-provider-info.component';

describe('DeliveryProviderInfoComponent', () => {
  let component: DeliveryProviderInfoComponent;
  let fixture: ComponentFixture<DeliveryProviderInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DeliveryProviderInfoComponent]
    });
    fixture = TestBed.createComponent(DeliveryProviderInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
