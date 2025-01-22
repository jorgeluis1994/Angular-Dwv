import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DicomFixComponent } from './dicom-fix.component';

describe('DicomFixComponent', () => {
  let component: DicomFixComponent;
  let fixture: ComponentFixture<DicomFixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DicomFixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DicomFixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
