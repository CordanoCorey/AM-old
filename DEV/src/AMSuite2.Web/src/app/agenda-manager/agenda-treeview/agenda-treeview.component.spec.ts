import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaTreeviewComponent } from './agenda-treeview.component';

describe('AgendaTreeviewComponent', () => {
  let component: AgendaTreeviewComponent;
  let fixture: ComponentFixture<AgendaTreeviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaTreeviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaTreeviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
