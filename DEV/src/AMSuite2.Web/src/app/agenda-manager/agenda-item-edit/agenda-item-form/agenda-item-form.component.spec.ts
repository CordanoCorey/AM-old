import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemFormComponent } from './agenda-item-form.component';

describe('AgendaItemFormComponent', () => {
  let component: AgendaItemFormComponent;
  let fixture: ComponentFixture<AgendaItemFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaItemFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
