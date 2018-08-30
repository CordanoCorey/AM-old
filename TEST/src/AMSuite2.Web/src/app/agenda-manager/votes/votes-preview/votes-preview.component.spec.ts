import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesPreviewComponent } from './votes-preview.component';

describe('VotesPreviewComponent', () => {
  let component: VotesPreviewComponent;
  let fixture: ComponentFixture<VotesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VotesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VotesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
