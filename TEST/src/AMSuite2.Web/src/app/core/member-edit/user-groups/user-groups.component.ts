import { Component, ChangeDetectionStrategy, OnChanges, Input, forwardRef, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { inArray } from '@caiu/core';
import { Subscription } from 'rxjs/Subscription';

import { Group } from '../../groups/groups.model';

@Component({
  selector: 'am-user-groups',
  templateUrl: './user-groups.component.html',
  styleUrls: ['./user-groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class UserGroupsComponent implements OnChanges, OnInit {

  private onModelChange: Function;
  private onTouch: Function;

  @Input() accountUrl = '';
  @Input() groups: Group[] = [];
  @Input() userGroupIds: number[] = [];
  @Output() updateGroups = new EventEmitter<number[]>();
  formArray: FormArray;
  groupsCount = 0;
  term = '';
  userGroupsCount = 0;
  valueChanges: Subscription;

  constructor() { }

  get controlValue(): boolean[] {
    return this.groupIds.map(id => this.userGroupIds.findIndex(x => x === id) === -1 ? false : true);
  }

  get filteredGroups(): Group[] {
    return this.term === '' ?
      this.groups : this.groups.filter(group => group.name.toLowerCase().includes(this.term.toLowerCase()));
  }

  get filteredGroupIds(): number[] {
    return this.filteredGroups.map(group => group.id);
  }

  get filteredGroupIndexes(): any {
    return this.filteredGroupIds.reduce((acc, id, index) => Object.assign(acc, { [id]: index }), {});
  }

  get groupIds(): number[] {
    return this.groups.map(group => group.id);
  }

  get groupIndexes(): any {
    return this.groupIds.reduce((acc, id, index) => Object.assign(acc, { [id]: index }), {});
  }

  get selectedGroupIds(): number[] {
    return Array.isArray(this.formArray.value) ? this.formArray.value.reduce((acc, value, index) => {
      return value ? [...acc, this.groupIds[index]] : acc;
    }, []) : [];
  }

  ngOnChanges() {
    if (this.formArray && this.userGroupIds
      && (this.userGroupIds.length !== this.userGroupsCount) || (this.groupIds.length !== this.groupsCount)) {
      this.updateFormArray();
      this.groupsCount = this.groupIds.length;
      this.userGroupsCount = this.userGroupIds.length;
    }
  }

  ngOnInit() {
    this.updateFormArray();
  }

  buildFormControls(value: boolean[]): FormControl[] {
    return value.map(x => new FormControl(x));
  }

  findFormControl(groupId: number): AbstractControl {
    return this.formArray.at(this.findGroupIndex(groupId)) || new FormControl(0);
  }

  findGroupId(index: number) {
    return this.groupIds[index];
  }

  findGroupIndex(groupId: number): number {
    return this.groupIndexes[groupId] || 0;
  }

  subscribe() {
    if (this.valueChanges && this.valueChanges.unsubscribe) {
      this.valueChanges.unsubscribe();
    }
    this.valueChanges = this.formArray.valueChanges.subscribe(value => {
      this.updateGroups.emit(this.selectedGroupIds);
    });
  }

  updateFormArray() {
    const controls = this.buildFormControls(this.controlValue);
    this.formArray = new FormArray(controls);
    this.subscribe();
  }

}
