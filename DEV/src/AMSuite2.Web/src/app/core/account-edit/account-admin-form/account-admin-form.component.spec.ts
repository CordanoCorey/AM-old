import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAdminFormComponent } from './account-admin-form.component';

describe('AccountAdminFormComponent', () => {
  let component: AccountAdminFormComponent;
  let fixture: ComponentFixture<AccountAdminFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAdminFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAdminFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
