import { Component, OnInit } from '@angular/core';
import { DialogAction } from '@caiu/common';
import { build } from '@caiu/core';
import { SmartComponent, Store } from '@caiu/store';

import { Template } from './templates.model';
import { templateSelector, templatesSelector } from './templates.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent extends SmartComponent implements OnInit {

  constructor(public store: Store<any>) {
    super(store);
  }

  get loading(): boolean {
    return false;
  }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
    ];
  }

  get title(): string {
    return 'Template Manager';
  }

  get template$(): Observable<Template> {
    return templateSelector(this.store);
  }

  get templates$(): Observable<Template[]> {
    return templatesSelector(this.store).map(templates => templates.toArray());
  }

  ngOnInit() {
  }

}
