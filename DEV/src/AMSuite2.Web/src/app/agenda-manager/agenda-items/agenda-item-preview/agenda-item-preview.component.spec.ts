import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaItemPreviewComponent } from './agenda-item-preview.component';

describe('AgendaItemPreviewComponent', () => {
  let component: AgendaItemPreviewComponent;
  let fixture: ComponentFixture<AgendaItemPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgendaItemPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaItemPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
