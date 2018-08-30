import { Component, OnInit, Input, trigger, state, style, transition, animate, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModelControl } from '@caiu/forms';

import { AccountRequest } from '../profile.model';
import { Account } from '../../../account/account.model';
import { CurrentUser } from '../../../shared/models';

@Component({
  selector: 'am-join-account',
  templateUrl: './join-account.component.html',
  styleUrls: ['./join-account.component.scss'],
  animations: [
    trigger('toggle', [
      state('*', style({ display: 'none', height: '0px' })),
      state('show', style({ display: 'block', height: '*' })),
      state('hide', style({ display: 'none', height: '0px' })),
      transition('show <=> hide', [
        animate('350ms ease-out')
      ])
    ])
  ]
})
export class JoinAccountComponent implements OnInit {

  @Input() accounts: Account[] = [];
  @Input() toggle = 'hide';
  @Input() user: CurrentUser = new CurrentUser();
  @Output() join = new EventEmitter<AccountRequest>();
  @ModelControl<AccountRequest>(new AccountRequest()) form: FormGroup;
  value: AccountRequest = new AccountRequest();

  constructor() { }

  get accountId(): number {
    return this.value.accountId;
  }

  set accountId(value: number) {
    this.value.accountId = value;
  }

  get accountName(): string {
    return this.value.accountName;
  }

  set accountName(value: string) {
    this.value.accountName = value;
  }

  get filteredAccounts(): Account[] {
    return this.hasAccountName ? this.accounts
      .filter(account => account.name.toLowerCase().includes(this.accountName.toLowerCase())) : [];
  }

  get hasAccountName(): boolean {
    return !(this.accountName === '' || this.accountName === 'account name...');
  }

  get reason(): string {
    return this.value.reason;
  }

  set reason(value: string) {
    this.value.reason = value;
  }

  ngOnInit() {
    this.value.userId = this.user.id;
    this.value.userName = this.user.userName;
    this.value.notificationTypeId = 2;
  }

  onAccountNameChange(value: string) {
    this.accountName = value;
  }

  onAccountNameFocus() {
    this.accountName = this.value.accountName === 'account name...' ? '' : this.value.accountName;
  }

  onReasonChange(value: string) {
    this.reason = value;
  }

  onSubmit() {
    this.join.emit(this.value);
  }

  selectAccount(account: Account) {
    this.accountName = account.name;
    this.accountId = account.id;
    this.form.setValue(this.value);
  }

}
