import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ViewEncapsulation, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { valueChanged, distinct } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';
import { Lookup, LookupValue } from '@caiu/http';

import { GroupEdit } from '../group-edit.model';
import { Group, GroupMember } from '../../groups/groups.model';
import { Member } from '../../members/members.model';
import { AccountMember } from '../../../account/account.model';
import { GroupMembersComponent } from '../group-members/group-members.component';

@Component({
  selector: 'am-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class GroupFormComponent extends FormComponent {

  @Input() accountId = 0;
  @Input() accountUrl = '';
  @Input() admins: AccountMember[] = [];
  @Input() group: Group = new Group();
  @Input() groupMembers: GroupMember[] = [];
  @Input() lkpOutlines: Lookup = new Lookup();
  @Output() add = new EventEmitter<Group>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Group>();
  @ModelControl<GroupEdit>(new GroupEdit()) form: FormGroup;
  @ViewChild(GroupMembersComponent) membersForm;
  modelKey = 'group';
  modelChanges = ['id'];

  constructor() {
    super();
  }

  get formModel(): FormModel<GroupEdit> {
    return new FormModel(this.model);
  }

  get groupId(): number {
    return this.group.id;
  }

  get groupName(): AbstractControl {
    return this.form.get('groupName');
  }

  get groupsLink(): string {
    return `/${this.accountUrl}/groups`;
  }

  get membersValue(): GroupMember[] {
    return this.membersForm.valueOut;
  }

  get mode(): 'add' | 'edit' {
    return this.groupId === 0 ? 'add' : 'edit';
  }

  get model(): GroupEdit {
    return new GroupEdit(this.group);
  }

  get outlineFormats(): LookupValue[] {
    return this.lkpOutlines ? this.lkpOutlines.values : [];
  }

  get submitText(): string {
    return this.mode === 'edit' ? 'Update Group' : 'Create Group';
  }

  get valueIn(): GroupEdit {
    return this.formModel.value;
  }

  get valueOut(): Group {
    const props = Object.assign(this.form.value, { members: this.membersValue });
    return GroupEdit.BuildGroup(this.group, props);
  }

  onDelete() {
    this.delete.emit(this.groupId);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
