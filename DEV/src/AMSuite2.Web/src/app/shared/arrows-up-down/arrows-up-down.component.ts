import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'am-arrows-up-down',
  templateUrl: './arrows-up-down.component.html',
  styleUrls: ['./arrows-up-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArrowsUpDownComponent implements OnInit {

  @Output() clickUp = new EventEmitter();
  @Output() clickDown = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
