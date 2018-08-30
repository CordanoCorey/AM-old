import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { DialogModel, DialogAction } from '@caiu/common';
import { build } from '@caiu/core';

@Component({
  selector: 'am-template-dialog',
  templateUrl: './template-dialog.component.html',
  styleUrls: ['./template-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateDialogComponent implements OnInit {

  @ViewChild('nameInput') nameInput;

  constructor() { }

  get actions(): DialogAction[] {
    return [
      build(DialogAction, { value: null, label: 'Close' }),
      build(DialogAction, { value: this.templateName, label: 'Save Template' }),
    ];
  }

  get dialog(): DialogModel {
    return build(DialogModel, {
      title: this.title,
      actions: this.actions
    });
  }

  get templateName(): string {
    return this.nameInput.nativeElement.value;
  }

  get title(): string {
    return 'New Template';
  }

  ngOnInit() {
  }

}
