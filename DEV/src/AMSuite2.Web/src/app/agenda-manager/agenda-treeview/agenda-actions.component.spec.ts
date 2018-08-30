import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaActionsComponent } from './agenda-actions.component';

describe('AgendaActionsComponent', () => {
  let component: AgendaActionsComponent;
  let fixture: ComponentFixture<AgendaActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
