import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'am-panel-blue-header',
  template: `
    <div class="panel-blue-header">
      <div class="panel-blue-title">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [`
    .panel-blue-header {
        width: 100%;
        background-color: #00568c;
        padding: 0.2em 0em 0.7em 0em;
    }`,
    `.panel-blue-title {
        font-weight: bold;
        font-size: 1em;
        padding-left: 3%;
        color: #fff;
    }`
  ]
})
export class PanelBlueHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
