import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestRoutesComponent } from './test-routes.component';

describe('TestRoutesComponent', () => {
  let component: TestRoutesComponent;
  let fixture: ComponentFixture<TestRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestRoutesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
