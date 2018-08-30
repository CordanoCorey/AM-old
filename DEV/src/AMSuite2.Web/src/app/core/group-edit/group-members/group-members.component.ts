import { Component, ChangeDetectionStrategy, forwardRef, Input, ViewEncapsulation, OnChanges, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { build, getValue, QueryModel, compareStrings, Dictionary } from '@caiu/core';
import { GridColumn, Grid } from '@caiu/common';
import { ModelArrayControl, FormArray, FormArrayComponent } from '@caiu/forms';
import { HttpService } from '@caiu/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subscription } from 'rxjs/Subscription';

import { GroupMemberEdit } from '../group-edit.model';
import { GroupMember } from '../../groups/groups.model';
import { MemberRoles, Members } from '../../members/members.model';
import { AccountMember } from '../../../account/account.model';
import { UserSearchResult, User } from '../../../shared/models';
import { Observable } from '../../../shared/observable';

@Component({
  selector: 'am-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class GroupMembersComponent extends FormArrayComponent implements OnChanges, OnInit {

  @Input() accountId = 0;
  @Input() groupId = 0;
  @Input() members: GroupMember[] = [];
  @ModelArrayControl<GroupMemberEdit>(new GroupMemberEdit()) formArray: FormArray;
  attendanceTakerId = 0;
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
  minuteTakerId = 0;
  newMembers: GroupMember[] = [];
  rows: GroupMemberEdit[] = [];
  searchSubject: BehaviorSubject<string> = new BehaviorSubject('');
  searchResults: UserSearchResult[] = [];
  searchResults$: Observable<UserSearchResult[]>;
  searchTerm: string;
  voteTakerId = 0;
  userCount = 0;

  constructor(private http: HttpService) {
    super();
    this.searchResults$ = this.searchSubject.asObservable().switchMap(x => this.autoComplete$);
  }

  get autoComplete$() {
    return this.http.autoComplete(`accounts/${this.accountId}/members`, this.query)
      .map(response => {
        return response.results ? (<AccountMember[]>response.results)
          .map(member => UserSearchResult.Build(member.user)) : [];
      });
  }

  get formValue(): any[] {
    return this.formArray.controls.map(control => control.value);
  }

  get grid(): Grid<GroupMemberEdit> {
    return Grid.Build<GroupMemberEdit>(this.rows);
  }

  get query(): QueryModel<User> {
    return Object.assign(new QueryModel<User>(), {
      skip: 0,
      take: 10,
      term: this.searchTerm
    });
  }

  get users(): Dictionary<GroupMember[]> {
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

  get existingMemberRows(): GroupMemberEdit[] {
    return Object.keys(this.users)
      .map(key => new GroupMemberEdit(this.users[key]))
      .sort((x, y) => compareStrings(x.lastName, y.lastName));
  }

  get newMemberRows(): GroupMemberEdit[] {
    return this.newMembers.map(x => new GroupMemberEdit([x]));
  }

  get searchChanges(): Subscription {
    return this.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }

  get valueIn(): GroupMemberEdit[] {
    return this.rows.map(row => getValue(row));
  }

  get valueOut(): GroupMember[] {
    return this.members.filter(x => x.groupRoleId !== 0);
  }

  ngOnChanges() {
    if (this.members.length !== this.userCount) {
      this.userCount = this.members.length;
      this.refreshRows();
      console.dir(this.formArray);
    }
  }

  ngOnInit() {
    this.subscribe([this.searchChanges]);
  }

  findControl(key: string, userId: number): AbstractControl {
    const formGroup = this.findFormGroupByUserId(userId);
    return formGroup.get(key);
  }

  findFormGroupByUserId(userId: number): AbstractControl {
    return this.formArray.controls.find(control => control.value.userId === userId);
  }

  search(term: any) {
    this.searchSubject.next(term);
  }

  selectUser(result: UserSearchResult) {
    this.addMember(result);
    this.searchResults = [];
    this.searchTerm = '';
  }

  addMember(result: UserSearchResult): void {
    const newMember = build(GroupMember, {
      groupId: this.groupId,
      groupRoleId: 3,
      user: result.user
    });
    this.newMembers = [newMember, ...this.newMembers];
    this.refreshRows();
  }

  refreshRows(): void {
    this.rows = [...this.newMemberRows, ...this.existingMemberRows];
    console.dir(this.valueIn);
    this.resetValue();
  }

  resetValue() {
    this.formArray.resetValue(this.valueIn);
  }

  toggleAttendanceTaker(userId: number, value: boolean) {
    if (value) {
      this.setUserControlValue('isAttendanceTaker', this.attendanceTakerId, false);
      this.attendanceTakerId = userId;
    }
    this.setUserControlValue('isAttendanceTaker', userId, value);
  }

  toggleContributor(userId: number, value: any) {
    this.setUserControlValue('isContributor', userId, value.checked);
  }

  toggleManager(userId: number, value: boolean) {
    this.setUserControlValue('isManager', userId, value);
  }

  toggleMember(userId: number, value: boolean) {
    this.setUserControlValue('isMember', userId, value);
  }

  toggleMinuteTaker(userId: number, value: boolean) {
    if (value) {
      this.setUserControlValue('isMinuteTaker', this.minuteTakerId, false);
      this.minuteTakerId = userId;
    }
    this.setUserControlValue('isMinuteTaker', userId, value);
  }

  toggleVoter(userId: number, value: boolean) {
    this.setUserControlValue('isVoter', userId, value);
  }

  toggleVoteTaker(userId: number, value: boolean) {
    if (value) {
      this.setUserControlValue('isVoteTaker', this.voteTakerId, false);
      this.voteTakerId = userId;
    }
    this.setUserControlValue('isVoteTaker', userId, value);
  }

  private setUserControlValue(key: string, userId: number, value: boolean) {
    const control = userId ? this.findControl(key, userId) : false;
    if (control && control.setValue) {
      control.setValue(value);
    }
  }

}
