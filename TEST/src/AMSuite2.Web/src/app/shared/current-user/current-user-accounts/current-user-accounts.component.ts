import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-current-user-accounts',
  templateUrl: './current-user-accounts.component.html',
  styleUrls: ['./current-user-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentUserAccountsComponent implements OnInit {

  @Input() accounts: Account[] = [];
  @Input() activeId = 0;
  @Output() changeAccount: EventEmitter<any> = new EventEmitter();

  constructor() { }

  get hasAccounts() {
    return this.accounts.length > 1;
  }

  ngOnInit() {
  }

  onAccountChange(accountId: string) {
    const account = this.accounts.find(x => x.id === parseInt(accountId, 10));
    this.changeAccount.emit(account);
  }

}
