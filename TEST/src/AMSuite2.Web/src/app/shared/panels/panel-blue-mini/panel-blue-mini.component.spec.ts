import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBlueMiniComponent } from './panel-blue-mini.component';

describe('PanelBlueMiniComponent', () => {
  let component: PanelBlueMiniComponent;
  let fixture: ComponentFixture<PanelBlueMiniComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBlueMiniComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBlueMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
