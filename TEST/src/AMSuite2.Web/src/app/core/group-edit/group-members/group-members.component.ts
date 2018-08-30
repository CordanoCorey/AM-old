import { Component, ChangeDetectionStrategy, forwardRef, Input, ViewEncapsulation, OnChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { build } from '@caiu/core';
import { GridColumn, Grid } from '@caiu/common';
import { ModelArrayControl, FormArray } from '@caiu/forms';

import { GroupMemberEdit } from '../group-edit.model';
import { GroupMember } from '../../groups/groups.model';
import { MemberRoles, Members } from '../../members/members.model';

@Component({
  selector: 'am-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GroupMembersComponent implements OnChanges {

  @Input() members: GroupMember[] = [];
  @ModelArrayControl<GroupMemberEdit>(new GroupMemberEdit()) formArray: FormArray;
  rows: GroupMemberEdit[] = [];
  userCount = 0;
  columnWidths = {
    userName: 160,
    email: 160,
    member: 60,
    contributor: 74,
    manager: 64,
    voter: 42,
    voteTaker: 74,
    minuteTaker: 88,
    attendanceTaker: 116
  };

  constructor() { }

  get grid(): Grid<GroupMemberEdit> {
    return Grid.Build<GroupMemberEdit>(this.rows);
  }

  get users(): any {
    return Members.GetUserMemberships(this.members);
  }

  get nameColumn(): GridColumn<any> {
    return new GridColumn('userName', 'Name');
  }

  get emailColumn(): GridColumn<any> {
    return new GridColumn('emailAddress', 'Email Address');
  }

  get memberColumn(): GridColumn<any> {
    return new GridColumn('isMember', 'Member');
  }

  get contributorColumn(): GridColumn<any> {
    return new GridColumn('isContributor', 'Contributor');
  }

  get managerColumn(): GridColumn<any> {
    return new GridColumn('isManager', 'Manager');
  }

  get voterColumn(): GridColumn<any> {
    return new GridColumn('isVoter', 'Voter');
  }

  get voteTakerColumn(): GridColumn<any> {
    return new GridColumn('isVoteTaker', 'Vote Taker');
  }

  get minuteTakerColumn(): GridColumn<any> {
    return new GridColumn('isMinuteTaker', 'Minute Taker');
  }

  get attendanceTakerColumn(): GridColumn<any> {
    return new GridColumn('isAttendanceTaker', 'Attendance Taker');
  }

  ngOnChanges() {
    if (this.members.length !== this.userCount) {
      this.userCount = this.members.length;
      this.rows = Object.keys(this.users).map(key => new GroupMemberEdit(this.users[key]));
    }
  }

}
