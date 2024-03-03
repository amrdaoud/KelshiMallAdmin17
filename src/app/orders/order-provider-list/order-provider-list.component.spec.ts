import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProviderListComponent } from './order-provider-list.component';

describe('OrderProviderListComponent', () => {
  let component: OrderProviderListComponent;
  let fixture: ComponentFixture<OrderProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderProviderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
