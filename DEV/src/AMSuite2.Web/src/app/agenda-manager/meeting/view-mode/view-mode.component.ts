import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'am-view-mode',
  templateUrl: './view-mode.component.html',
  styleUrls: ['./view-mode.component.scss']
})
export class ViewModeComponent {

  @Output() toggle = new EventEmitter<'show' | 'hide'>();
  @Output() changeViewMode = new EventEmitter<string>();
  mode: 'Normal' | 'Slideshow' | 'Projector' = 'Normal';
  showDetail = true;
  inMenu = false;
  inTrigger = false;

  constructor() { }

  get inNormalMode(): boolean {
    return this.mode === 'Normal';
  }

  get inSlideshowMode(): boolean {
    return this.mode === 'Slideshow';
  }

  get inProjectorMode(): boolean {
    return this.mode === 'Projector';
  }

  get showModes(): boolean {
    return this.inTrigger || this.inMenu;
  }

  onChangeViewMode(mode: 'Normal' | 'Slideshow' | 'Projector') {
    this.mode = mode;
    this.changeViewMode.emit(mode);
  }

  onEnterTrigger() {
    if (!this.showModes) {
      this.inTrigger = true;
    }
  }

  onLeaveTrigger() {
    setTimeout(() => {
      this.inTrigger = false;
    }, 10);
  }

  onLeaveMenu() {
    this.inMenu = false;
    this.inTrigger = false;
  }

  onEnterMenu() {
    this.inMenu = true;
  }

}
