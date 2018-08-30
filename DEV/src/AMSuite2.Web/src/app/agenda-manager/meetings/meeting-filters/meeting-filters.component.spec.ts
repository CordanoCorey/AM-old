import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingFiltersComponent } from './meeting-filters.component';

describe('MeetingFiltersComponent', () => {
  let component: MeetingFiltersComponent;
  let fixture: ComponentFixture<MeetingFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
