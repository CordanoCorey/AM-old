import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemActionsComponent } from './agenda-item-actions.component';

describe('AgendaItemActionsComponent', () => {
  let component: AgendaItemActionsComponent;
  let fixture: ComponentFixture<AgendaItemActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaItemActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaItemActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
