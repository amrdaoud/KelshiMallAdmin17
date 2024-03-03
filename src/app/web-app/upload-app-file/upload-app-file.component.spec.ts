import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAppFileComponent } from './upload-app-file.component';

describe('UploadAppFileComponent', () => {
  let component: UploadAppFileComponent;
  let fixture: ComponentFixture<UploadAppFileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UploadAppFileComponent]
    });
    fixture = TestBed.createComponent(UploadAppFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
