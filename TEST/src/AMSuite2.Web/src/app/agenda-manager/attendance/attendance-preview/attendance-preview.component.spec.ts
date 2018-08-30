import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendancePreviewComponent } from './attendance-preview.component';

describe('AttendancePreviewComponent', () => {
  let component: AttendancePreviewComponent;
  let fixture: ComponentFixture<AttendancePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendancePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendancePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
