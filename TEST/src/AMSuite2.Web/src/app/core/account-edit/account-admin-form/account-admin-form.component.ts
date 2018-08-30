import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormComponent } from '@caiu/common';
import { QueryModel, build, hasChanged } from '@caiu/core';
import { FormModel, ModelControl, getFormValue } from '@caiu/forms';
import { HttpService } from '@caiu/http';
import { DumbComponent } from '@caiu/store';
import { Subscription } from 'rxjs/Subscription';

import { AccountAdmin } from '../account-edit.model';
import { Account } from '../../../account/account.model';
import { User, UserSearchResult } from '../../../shared/models';
import { Observable } from '../../../shared/observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'am-account-admin-form',
  templateUrl: './account-admin-form.component.html',
  styleUrls: ['./account-admin-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggle', [
      state('*', style({ height: '0px' })),
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class AccountAdminFormComponent extends FormComponent implements OnInit {

  @Input() account: Account = new Account();
  @Output() add = new EventEmitter<Account>();
  @Output() update = new EventEmitter<Account>();
  @Output() searchUsers = new EventEmitter<string>();
  @ModelControl<AccountAdmin>(new AccountAdmin()) public form: FormGroup;
  modelKey = 'account';
  modelChanges = ['id', 'ownerId'];
  opened = false;
  searchResults: UserSearchResult[] = [];
  searchTerm = '';

  constructor(private http: HttpService) {
    super();
  }

  get autoComplete$() {
    return this.http.autoComplete('users', this.query)
      .map(response => response.results ? (<User[]>response.results).map(user => UserSearchResult.Build(user)) : []);
  }

  get formModel(): FormModel<AccountAdmin> {
    return new FormModel(this.model);
  }

  get formValue(): AccountAdmin {
    return this.formModel.value;
  }

  get isValid(): boolean {
    return this.form.valid;
  }

  get model(): AccountAdmin {
    return new AccountAdmin(this.account);
  }

  get modelValue(): Account {
    return AccountAdmin.BuildAccount(this.account, this.form.value);
  }

  get ownerId(): AbstractControl {
    return this.form.get('ownerId');
  }

  get ownerId$(): Observable<number> {
    return this.ownerId.valueChanges;
  }

  get ownerIdChanges(): Subscription {
    return this.ownerId$.subscribe(id => {
      const user = this.findUserById(id);
      this.ownerInput.setValue(user.displayName);
    });
  }

  get ownerInput(): AbstractControl {
    return this.form.get('ownerInput');
  }

  get ownerInput$(): Observable<string> {
    return this.ownerInput.valueChanges;
  }

  get ownerInputChanges(): Subscription {
    return this.ownerInput$.subscribe(ownerInput => {
      this.searchTerm = ownerInput;
    });
  }

  get query(): QueryModel<User> {
    return Object.assign(new QueryModel<User>(), {
      skip: 0,
      take: 10,
      term: this.searchTerm
    });
  }

  get searchResults$(): Observable<UserSearchResult[]> {
    return this.ownerInput$.switchMap(ownerInput => this.autoComplete$);
  }

  get searchResultsChanges(): Subscription {
    return this.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }

  get showInfo(): boolean {
    return !this.useExisting;
  }

  get showSearch(): boolean {
    return this.useExisting;
  }

  get useExisting(): boolean {
    return this.form.get('useExisting').value;
  }

  findUserById(id: number): UserSearchResult {
    return this.searchResults.find(user => user.id === id) || new UserSearchResult();
  }

  ngOnInit() {
    this.subscribe([this.ownerIdChanges, this.ownerInputChanges, this.searchResultsChanges]);
  }

  markAsSubmitted() {
    this.form.markAsTouched();
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.modelValue) : this.update.emit(this.modelValue);
  }

  selectUser(user: UserSearchResult) {
    this.ownerId.setValue(user.id);
  }

  toggle() {
    this.opened = !this.opened;
  }

}
