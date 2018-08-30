import { Component, Input, Output, OnChanges, EventEmitter, SimpleChanges, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormComponent } from '@caiu/common';
import { valueChanged, distinct } from '@caiu/core';
import { ModelControl, FormModel } from '@caiu/forms';
import { Lookup, LookupValue } from '@caiu/http';

import { GroupEdit } from '../group-edit.model';
import { Group, GroupMember } from '../../groups/groups.model';
import { Member } from '../../members/members.model';
import { AccountMember } from '../../../account/account.model';

@Component({
  selector: 'am-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated
})
export class GroupFormComponent extends FormComponent {

  @Input() accountUrl = '';
  @Input() admins: AccountMember[] = [];
  @Input() group: Group = new Group();
  @Input() groupMembers: GroupMember[] = [];
  @Input() lkpOutlines: Lookup = new Lookup();
  @Output() add = new EventEmitter<Group>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Group>();
  @ModelControl<GroupEdit>(new GroupEdit()) form: FormGroup;
  modelKey = 'group';
  modelChanges = ['id'];

  constructor() {
    super();
  }

  get formModel(): FormModel<GroupEdit> {
    return new FormModel(this.model);
  }

  get formValue(): GroupEdit {
    return this.formModel.value;
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

  get mode(): 'add' | 'edit' {
    return this.groupId === 0 ? 'add' : 'edit';
  }

  get model(): GroupEdit {
    return new GroupEdit(this.group);
  }

  get modelValue(): Group {
    return GroupEdit.BuildGroup(this.group, this.form.value);
  }

  get outlineFormats(): LookupValue[] {
    return this.lkpOutlines ? this.lkpOutlines.values : [];
  }

  get submitText(): string {
    return this.mode === 'edit' ? 'Update Group' : 'Create Group';
  }

  onDelete() {
    this.delete.emit(this.groupId);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.modelValue) : this.update.emit(this.modelValue);
  }

}
