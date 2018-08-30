import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { valueChanged } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { EmailEdit, EmailItem } from '../email.model';

@Component({
  selector: 'am-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailFormComponent extends FormComponent {

  @Input() emailItem: EmailItem = new EmailItem();
  @ModelControl<EmailEdit>(new EmailEdit()) form: FormGroup;
  @Output() send = new EventEmitter<EmailItem>();
  modelKey = 'email';
  modelChanges = [];

  constructor() {
    super();
  }

  get formModel(): FormModel<EmailEdit> {
    return new FormModel(this.model);
  }

  get formStyle(): number {
    return 2;
  }

  get valueIn(): EmailEdit {
    return this.formModel.value;
  }

  get model(): EmailEdit {
    return new EmailEdit(this.emailItem);
  }

  get valueOut(): EmailItem {
    return EmailEdit.BuildEmail(this.emailItem, this.form.value);
  }

  get showActions(): boolean {
    return false;
  }

  onSubmit(e: any) {
    this.send.emit(this.valueOut);
  }

}
