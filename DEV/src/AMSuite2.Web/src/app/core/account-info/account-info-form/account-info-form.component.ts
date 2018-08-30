import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { hasChanged } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { AccountInfo } from '../account-info.model';
import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-account-info-form',
  templateUrl: './account-info-form.component.html',
  styleUrls: ['./account-info-form.component.scss']
})
export class AccountInfoFormComponent extends FormComponent {

  @Input() account: Account = new Account();
  @Input() accountUrl = '';
  @Output() add: EventEmitter<Account> = new EventEmitter<Account>();
  @Output() update: EventEmitter<Account> = new EventEmitter<Account>();
  @ModelControl<AccountInfo>(new AccountInfo()) form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'name', 'description', 'signature', 'logo'];

  constructor() {
    super();
  }

  get cancelLink(): string {
    return this.accountUrl === 'admin' ? `/admin/accounts` : `/${this.accountUrl}/dashboard`;
  }

  get formModel(): FormModel<AccountInfo> {
    return new FormModel(this.model);
  }

  get valueIn(): AccountInfo {
    return this.formModel.value;
  }

  get model(): AccountInfo {
    return new AccountInfo(this.account);
  }

  get valueOut(): Account {
    return AccountInfo.BuildAccount(this.account, this.form.value);
  }

  onSubmit(e: any) {
    e.preventDefault();
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
