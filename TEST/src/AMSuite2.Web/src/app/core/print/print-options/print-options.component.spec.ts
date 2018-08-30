import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintOptionsComponent } from './print-options.component';

describe('PrintOptionsComponent', () => {
  let component: PrintOptionsComponent;
  let fixture: ComponentFixture<PrintOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
