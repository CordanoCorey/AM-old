import { Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'am-panel-blue',
  templateUrl: './panel-blue.component.html',
  styleUrls: ['./panel-blue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelBlueComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
