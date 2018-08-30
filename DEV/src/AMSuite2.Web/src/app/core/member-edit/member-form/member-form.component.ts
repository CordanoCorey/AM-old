import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { build } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';
import { Subscription } from 'rxjs/Subscription';

import { MemberEdit, MemberEditAction } from '../member-edit.model';
import { Member } from '../../members/members.model';
import { User } from '../../../shared/models';

@Component({
  selector: 'am-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class MemberFormComponent extends FormComponent implements OnInit {

  @Input() accountId = 0;
  @Input() accountUrl = '';
  @Input() member: Member = new Member;
  @ModelControl<MemberEdit>(new MemberEdit()) form: FormGroup;
  @Output() acceptMember = new EventEmitter<Member>();
  @Output() addExisting = new EventEmitter<Member>();
  @Output() addNew = new EventEmitter<Member>();
  @Output() cancelRequest = new EventEmitter<Member>();
  @Output() rejectMember = new EventEmitter<Member>();
  @Output() update = new EventEmitter<Member>();
  @Output() changes = new EventEmitter<Member>();
  modelKey = 'member';
  modelChanges = ['id'];

  constructor() {
    super();
  }

  get action(): MemberEditAction {
    return this.isAdd ? this.userExists ?
      'ADD_EXISTING_USER' : 'ADD_NEW_USER'
      : 'UPDATE_EXISTING_MEMBER';
  }

  get emailAddress(): AbstractControl {
    return this.getControl('emailAddress');
  }

  get firstName(): AbstractControl {
    return this.getControl('firstName');
  }

  get formModel(): FormModel<MemberEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): MemberEdit {
    return this.formModel.value;
  }

  get hasAccountRequest(): boolean {
    return false;
  }

  get isAdd(): boolean {
    return !this.member.isAccountMember;
  }

  get isLockedOut(): boolean {
    return this.user.isLockedOut;
  }

  get lastName(): AbstractControl {
    return this.getControl('firstName');
  }

  get lockedOut(): boolean {
    return this.user.isLockedOut;
  }

  get membersLink(): string {
    return `/${this.accountUrl}/members`;
  }

  get model(): MemberEdit {
    return new MemberEdit(this.member);
  }

  get valueOut(): Member {
    return MemberEdit.BuildMember(this.member, this.form.value);
  }

  get showGreeting(): boolean {
    return this.action === 'ADD_NEW_USER';
  }

  get submitText(): string {
    switch (this.action) {
      case 'ADD_EXISTING_USER':
        return 'Add Member';
      case 'ADD_NEW_USER':
        return 'Add and Send Invitation';
      case 'UPDATE_EXISTING_MEMBER':
        return 'Update Member';
    }
  }

  get user(): User {
    return build(User, this.member.user);
  }

  get userExists(): boolean {
    return this.user.id !== 0;
  }

  get valueChanges(): Subscription {
    return this.form.valueChanges.subscribe(value => {
      this.changes.emit(this.valueOut);
    });
  }

  ngOnInit() {
    this.subscribe([this.valueChanges]);
  }

  onAcceptMember() {
    this.acceptMember.emit(this.valueOut);
  }

  onRejectMember() {
    this.rejectMember.emit(this.valueOut);
  }

  onCancelRequest() {
    this.cancelRequest.emit(this.valueOut);
  }

  onSubmit(e: any) {
    e.preventDefault();
    switch (this.action) {
      case 'ADD_EXISTING_USER':
        this.addExisting.emit(this.valueOut);
        break;
      case 'ADD_NEW_USER':
        this.addNew.emit(this.valueOut);
        break;
      case 'UPDATE_EXISTING_MEMBER':
        this.update.emit(this.valueOut);
        break;
    }
  }

}
