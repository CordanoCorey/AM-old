import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-panel-blue-mini',
  templateUrl: './panel-blue-mini.component.html',
  styleUrls: ['./panel-blue-mini.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelBlueMiniComponent implements OnInit {

  @Input() heading = '';

  constructor() { }

  ngOnInit() {
  }

}
