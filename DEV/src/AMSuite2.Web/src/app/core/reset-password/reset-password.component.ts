import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Dictionary, build } from '@caiu/core';
import { ModelControl } from '@caiu/forms';
import { ErrorOutlet } from '@caiu/errors';
import { EventActions, Event } from '@caiu/events';
import { HttpActions } from '@caiu/http';
import { CustomStore, CustomComponent, Action, provideCustomStoreAsync, Store, SmartComponent } from '@caiu/store';

import { ResetPassword } from './reset-password.model';
import { CurrentUser } from '../../shared/models';
import { UserActions } from '../../shared/actions';
import { Observable } from '../../shared/observable';
import { eventsSelector, currentUserSelector } from '../../shared/selectors';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'am-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends SmartComponent implements OnInit {

  @ModelControl<ResetPassword>(new ResetPassword()) form: FormGroup;
  events$: Observable<Dictionary<Event>>;
  loginLinkKey = '';
  passwordResetCode = '';
  passwordResetCode$: Observable<string>;
  routeName = 'reset-password';
  showLoginLink$: Observable<boolean>;
  user$: Observable<CurrentUser>;

  constructor(public store: Store<any>) {
    super(store);
    this.events$ = eventsSelector(this.store);
    this.user$ = currentUserSelector(this.store);
    this.passwordResetCode$ = this.user$.map(user => user.passwordResetCode).distinctUntilChanged();
    this.showLoginLink$ = this.events$.map(events => {
      return events[this.loginLinkKey] ? (<Event>events[this.loginLinkKey]).value : false;
    });
  }

  get errorOutlet(): ErrorOutlet {
    return {
      key: 'resetpassword'
    };
  }

  get passwordResetCodeChanges(): Subscription {
    return this.passwordResetCode$.subscribe(code => {
      this.passwordResetCode = code;
      this.form.setValue({
        passwordResetCode: this.passwordResetCode,
        password: '',
        confirmPassword: ''
      });
    });
  }

  get showConfirmRequired(): boolean {
    return this.form.controls['confirmPassword'].value === '' && this.form.controls['confirmPassword'].touched;
  }

  get showPasswordRequired(): boolean {
    return this.form.controls['password'].value === '' && this.form.controls['password'].touched;
  }

  ngOnInit() {
    this.subscribe([this.passwordResetCodeChanges]);
    this.addEvents();
  }

  addEvents() {
    function onResetPassword(action: Action) {
      return true;
    }
    const actionWithKey = EventActions.addEvent(UserActions.RESET_PASSWORD, onResetPassword, false);
    this.loginLinkKey = actionWithKey.key;
    this.dispatch(actionWithKey);
  }

  onSubmit() {
    const payload = Object.assign(new ResetPassword, this.form.value, { passwordResetCode: this.passwordResetCode });
    this.resetPassword(payload);
  }

  resetPassword(payload: ResetPassword) {
    this.dispatch(HttpActions.post('resetpassword', payload, UserActions.RESET_PASSWORD, this.errorOutlet));
  }

}
