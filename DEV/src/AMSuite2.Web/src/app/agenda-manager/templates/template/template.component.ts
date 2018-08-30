import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Template } from '../templates.model';

@Component({
  selector: 'am-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateComponent implements OnInit {

  @Input() template: Template = new Template();

  constructor() { }

  get active(): boolean {
    return false;
  }

  get showAddButton(): boolean {
    return false;
  }

  get showDeleteButton(): boolean {
    return false;
  }

  get showError(): boolean {
    return false;
  }

  ngOnInit() {
  }

}
