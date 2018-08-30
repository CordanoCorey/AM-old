import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { GridColumn, Grid, SortDescriptor } from '@caiu/common';

import { Member, MemberRow } from '../members.model';
import { Group } from '../../groups/groups.model';
import { Account } from '../../../account/account.model';
import { User } from '../../../shared/models';

@Component({
  selector: 'am-members-grid',
  templateUrl: './members-grid.component.html',
  styleUrls: ['./members-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersGridComponent {

  @Input() members: Member[] = [];
  @Input() account: Account = new Account();
  @Input() canImpersonate: boolean;
  @Input() group: Group = new Group();
  @Input() showInactive = false;
  @Output() impersonate = new EventEmitter<User>();
  @Output() invite = new EventEmitter<number>();
  defaultWidths = {
    firstName: 120,
    lastName: 135,
    email: 240,
    title: 180,
    role: 150,
    locked: 80,
    active: 70,
    actions: 225,
  };
  impersonatingWidths = {
    firstName: 120,
    lastName: 135,
    email: 220,
    title: 125,
    role: 110,
    locked: 80,
    active: 70,
    actions: 340,
  };
  private _sort: SortDescriptor[] = [
    Grid.BuildSort('lastName', 'asc')
  ];

  constructor() { }

  get grid(): Grid<MemberRow> {
    return Grid.Build<MemberRow>(this.rows);
  }

  get rows(): MemberRow[] {
    return this.members.map(member => new MemberRow(member, this.accountUrl));
  }

  get accountUrl(): string {
    return this.account.url;
  }

  get actionsColumn(): GridColumn<any> {
    return new GridColumn('actions', 'Actions');
  }

  get accountActiveColumn(): GridColumn<boolean> {
    return new GridColumn<boolean>('accountActive', 'Active');
  }

  get emailColumn(): GridColumn<string> {
    return new GridColumn<string>('emailAddress', 'Email');
  }

  get firstNameColumn(): GridColumn<string> {
    return new GridColumn<string>('firstName', 'First Name');
  }

  get lastNameColumn(): GridColumn<string> {
    return new GridColumn<string>('lastName', 'Last Name');
  }

  get lockedColumn(): GridColumn<boolean> {
    return new GridColumn<boolean>('locked', 'Locked');
  }

  get roleColumn(): GridColumn<string> {
    return new GridColumn<string>('userRole', 'Role');
  }

  get titleColumn(): GridColumn<string> {
    return new GridColumn<string>('userTitle', 'Title');
  }

  get userActiveColumn(): GridColumn<boolean> {
    return new GridColumn<boolean>('userActive', 'Active');
  }

  get sort(): SortDescriptor[] {
    return this._sort;
  }

  set sort(value: SortDescriptor[]) {
    this._sort = value;
  }

  get widths(): any {
    return this.canImpersonate ? this.impersonatingWidths : this.defaultWidths;
  }

  onImpersonate(member: Member) {
    this.impersonate.emit(member.user);
  }

  onInvite(userId: number) {
    this.invite.emit(userId);
  }

}
