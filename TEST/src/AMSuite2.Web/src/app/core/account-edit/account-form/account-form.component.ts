import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '@caiu/common';
import { hasChanged } from '@caiu/core';
import { ModelControl, FormModel } from '@caiu/forms';

import { AccountEdit } from '../account-edit.model';
import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountFormComponent extends FormComponent {

  @Input() account: Account = new Account;
  @Output() add = new EventEmitter<Account>();
  @Output() update = new EventEmitter<Account>();
  @ModelControl<AccountEdit>(new AccountEdit()) form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'name', 'statusId', 'url'];

  constructor() {
    super();
  }

  get modelValue(): Account {
    return AccountEdit.BuildAccount(this.account, this.form.value);
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  get formModel(): FormModel<AccountEdit> {
    return new FormModel(this.model);
  }

  get formValue(): AccountEdit {
    return this.formModel.value;
  }

  get model(): AccountEdit {
    return new AccountEdit(this.account);
  }

  markAsSubmitted() {
    this.form.markAsTouched();
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsTouched();
    });
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.modelValue) : this.update.emit(this.modelValue);
  }

}
