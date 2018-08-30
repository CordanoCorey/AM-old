import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideshowControlsComponent } from './slideshow-controls.component';

describe('SlideshowControlsComponent', () => {
  let component: SlideshowControlsComponent;
  let fixture: ComponentFixture<SlideshowControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideshowControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideshowControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
