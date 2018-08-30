import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'am-agenda-actions',
  templateUrl: './agenda-actions.component.html',
  styleUrls: ['./agenda-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class AgendaActionsComponent implements OnInit {

  @Output() newItem = new EventEmitter();
  @Output() quickItem = new EventEmitter();
  @Output() up = new EventEmitter();
  @Output() down = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  get binLink(): any {
    return [`/`, { outlets: { popup: 'bin' } }];
  }

  get printLink(): any {
    return [`/`, { outlets: { popup: 'print' } }];
  }

}
