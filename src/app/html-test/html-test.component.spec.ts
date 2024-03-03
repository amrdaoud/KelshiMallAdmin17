import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlTestComponent } from './html-test.component';

describe('HtmlTestComponent', () => {
  let component: HtmlTestComponent;
  let fixture: ComponentFixture<HtmlTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HtmlTestComponent]
    });
    fixture = TestBed.createComponent(HtmlTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
