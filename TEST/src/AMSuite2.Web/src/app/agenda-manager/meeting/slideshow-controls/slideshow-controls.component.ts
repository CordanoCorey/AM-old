import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-slideshow-controls',
  templateUrl: './slideshow-controls.component.html',
  styleUrls: ['./slideshow-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlideshowControlsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
