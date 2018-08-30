import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaTreeItemComponent } from './agenda-tree-item.component';

describe('AgendaTreeItemComponent', () => {
  let component: AgendaTreeItemComponent;
  let fixture: ComponentFixture<AgendaTreeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaTreeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaTreeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
