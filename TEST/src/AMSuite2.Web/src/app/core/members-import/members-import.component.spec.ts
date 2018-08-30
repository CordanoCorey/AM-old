/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembersImportComponent } from './members-import.component';

describe('MembersImportComponent', () => {
  let component: MembersImportComponent;
  let fixture: ComponentFixture<MembersImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
