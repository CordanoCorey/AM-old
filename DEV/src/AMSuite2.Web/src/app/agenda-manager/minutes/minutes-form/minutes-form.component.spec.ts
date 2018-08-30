import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinutesFormComponent } from './minutes-form.component';

describe('MinutesFormComponent', () => {
  let component: MinutesFormComponent;
  let fixture: ComponentFixture<MinutesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinutesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinutesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
