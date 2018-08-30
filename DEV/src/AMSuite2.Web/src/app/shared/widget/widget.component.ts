import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style } from '@angular/animations';

@Component({
  selector: 'am-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss'],
  animations: [
    trigger('expando', [
      state('expand', style({
        height: '*'
      }))
    ])
  ]
})
export class WidgetComponent implements OnInit {

  height = 'expand';

  constructor() { }

  ngOnInit() {
  }

}
