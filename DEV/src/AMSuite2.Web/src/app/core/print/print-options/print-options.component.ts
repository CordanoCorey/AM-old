import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'am-print-options',
  templateUrl: './print-options.component.html',
  styleUrls: ['./print-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintOptionsComponent implements OnInit {

  @Input() export = true;

  constructor() { }

  ngOnInit() {
  }

}
