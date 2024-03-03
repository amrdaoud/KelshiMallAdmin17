import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperOrderProviderListComponent } from './super-order-provider-list.component';

describe('SuperOrderProviderListComponent', () => {
  let component: SuperOrderProviderListComponent;
  let fixture: ComponentFixture<SuperOrderProviderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperOrderProviderListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperOrderProviderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
