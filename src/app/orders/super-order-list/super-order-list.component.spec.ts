import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperOrderListComponent } from './super-order-list.component';

describe('SuperOrderListComponent', () => {
  let component: SuperOrderListComponent;
  let fixture: ComponentFixture<SuperOrderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperOrderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperOrderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
