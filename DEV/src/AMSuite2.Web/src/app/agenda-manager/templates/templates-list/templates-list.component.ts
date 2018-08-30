import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Template } from '../templates.model';

@Component({
  selector: 'am-templates-list',
  templateUrl: './templates-list.component.html',
  styleUrls: ['./templates-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatesListComponent implements OnInit {

  @Input() templates: Template[] = [];

  constructor() { }

  get loading(): boolean {
    return false;
  }

  ngOnInit() {
  }

}
