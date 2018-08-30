import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Headers } from '@angular/http';
import { build } from '@caiu/core';
import { ErrorOutlet, ErrorActions, errorSelector } from '@caiu/errors';
import { ModelControl } from '@caiu/forms';
import { HttpActions, HttpPostPayload } from '@caiu/http';
import { Store, SmartComponent } from '@caiu/store';

import { Login } from './login.model';
import { UserActions } from '../../shared/actions';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends SmartComponent implements OnInit, OnDestroy {

  @ModelControl<Login>(new Login()) form: FormGroup;
  routeName = 'login';
  _showLoading = false;

  constructor(public store: Store<any>) {
    super(store);
  }

  get credentials(): string {
    const login = <Login>this.form.value;
    return `grant_type=${login.grant_type}&username=${login.username}&password=${login.password}`;
  }

  get errorMessage$(): Observable<string> {
    return errorSelector(this.store, 'login').map(error => error.message || '').distinctUntilChanged();
  }

  get errorOutlet(): ErrorOutlet {
    return {
      key: 'login'
    };
  }

  get loginHeaders(): Headers {
    const headers: Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  get showLoading(): boolean {
    return this._showLoading;
  }

  set showLoading(value: boolean) {
    this._showLoading = value;
  }

  get showPasswordRequired(): boolean {
    return this.form.controls['password'].value === '' && this.form.controls['password'].touched;
  }

  get showRecoveredPassword(): boolean {
    return false;
  }

  get showUsernameRequired(): boolean {
    return this.form.controls['username'].value === '' && this.form.controls['username'].touched;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.dispatch(ErrorActions.remove('login'));
  }

  login() {
    this.dispatch(
      HttpActions.httpPost(Object.assign(new HttpPostPayload<string>(),
        {
          path: 'token',
          model: this.credentials,
          headers: this.loginHeaders,
          onSuccess: UserActions.LOGIN_SUCCESS,
          onError: this.errorOutlet
        }))
    );
  }

  recoverPassword() {
    this.showLoading = true;
    const body = { emailAddress: this.form.controls['username'].value };
    this.dispatch(HttpActions.post('recoverpassword', body, UserActions.RECOVER_PASSWORD, this.errorOutlet));
  }

}
