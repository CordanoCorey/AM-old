import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersGridComponent } from './members-grid.component';

describe('MembersGridComponent', () => {
  let component: MembersGridComponent;
  let fixture: ComponentFixture<MembersGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
