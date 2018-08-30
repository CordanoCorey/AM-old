import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Account, AccountMember } from '../../account/account.model';
import { CurrentUserModel } from './current-user.model';
import { CurrentUser } from '../models';
import { revertToAdmin } from '../utils';

@Component({
  selector: 'am-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentUserComponent {

  @Input() user: CurrentUser = new CurrentUser();
  @Input() account: Account = new Account();
  @Input() userAccounts: AccountMember[] = [];
  @Output() revertToAdmin = new EventEmitter();
  showDialog = false;

  constructor() { }

  get activeUser(): CurrentUser {
    return this.user.impersonating ? this.user.impersonating : this.user;
  }

  get accountName(): string {
    return this.account.name;
  }

  get authenticated(): boolean {
    return this.activeUser.authenticated;
  }

  get hasAccount(): boolean {
    return this.account.id ? true : false;
  }

  onHover() {
    this.showDialog = true;
    setTimeout(() => {
      this.showDialog = false;
    }, 2000);
  }

  onRevertToAdmin() {
    this.revertToAdmin.emit();
  }

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

}
