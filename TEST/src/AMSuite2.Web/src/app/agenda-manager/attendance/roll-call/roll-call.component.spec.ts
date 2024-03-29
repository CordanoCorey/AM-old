/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RollCallComponent } from './roll-call.component';

describe('RollCallComponent', () => {
  let component: RollCallComponent;
  let fixture: ComponentFixture<RollCallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollCallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
