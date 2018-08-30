import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersImportFormComponent } from './members-import-form.component';

describe('MembersImportFormComponent', () => {
  let component: MembersImportFormComponent;
  let fixture: ComponentFixture<MembersImportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersImportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersImportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
