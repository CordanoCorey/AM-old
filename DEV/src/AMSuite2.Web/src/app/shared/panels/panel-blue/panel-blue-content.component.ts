import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-panel-blue-content',
  template: `
    <div class="panel-blue-content scrollable">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .panel-blue-content {
        width: 98%;
        background-color: #fff;
        overflow: hidden;
        font-size: 0.85em;
        margin: 0;
        margin-left: 2%;
        max-height: 400px;
        overflow-y: auto;
    }
  `]
})
export class PanelBlueContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
