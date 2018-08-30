import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelControl } from '@caiu/forms';
import { Lookup } from '@caiu/http';

import { Profile } from '../profile.model';
import { GroupMember, Group } from '../../groups/groups.model';
import { Account } from '../../../account/account.model';

@Component({
  selector: 'am-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent implements OnInit {

  @ModelControl<Profile>(new Profile()) form: FormGroup;
  @Input() account: Account = new Account();
  @Input() dateRanges: Lookup;
  @Input() profile: Profile = new Profile();
  @Input() userGroups: GroupMember[] = [];
  @Output() save: EventEmitter<Profile> = new EventEmitter<Profile>();

  constructor() { }

  get accountId(): number {
    return this.account.id;
  }

  get accountUrl(): string {
    return this.account.url;
  }

  get formValue(): Profile {
    return this.profile;
  }

  get groups(): Group[] {
    return this.userGroups
      .map(g => g.group)
      .filter(g => g.accountId === this.accountId);
  }

  get showMessage(): boolean {
    return false;
  }

  get showSettings(): boolean {
    return true;
  }

  ngOnInit() {
    this.form.setValue(this.formValue);
    this.form.valueChanges.subscribe(x => { console.log(x); });
    console.log(this.dateRanges);
  }

  onSubmit() {
    this.save.next(Object.assign(this.formValue, this.form.value));
  }

}
