import { Injectable, Injector } from '@angular/core';
import { Effect, Actions } from '@caiu/effects';
import { RouterActions } from '@caiu/router';
import { Action } from '@caiu/store';

import { UserActions } from './actions';
import { Observable } from './observable';
import { Account } from '../account/account.model';
import { AccountsActions } from '../core/accounts/accounts.reducer';
import { MembersActions } from '../core/members/members.reducer';

@Injectable()
export class UserEffects {

    /**
     * Navigate to root url upon successful login.
     */
    @Effect() onLoginSuccess: Observable<Action> = this.actions$
        .ofType(UserActions.LOGIN_SUCCESS)
        .map(action => RouterActions.navigate('/accounts'));

    /**
     * Navigate to login page after logging out.
     */
    @Effect() onLogout: Observable<Action> = this.actions$
        .ofType(UserActions.LOGOUT)
        .map(action => RouterActions.navigate('/login'));

    /**
     * Navigate to reset password after recovering password.
     */
    @Effect() onRecoverPassword: Observable<Action> = this.actions$
        .ofType(UserActions.RECOVER_PASSWORD)
        .map(action => RouterActions.navigate('/reset-password'));

    constructor(private actions$: Actions) {
    }
}

@Injectable()
export class AccountEffects {

    /**
     * Navigate to root url upon successful password reset.
     */
    @Effect() onActivate: Observable<Action> = this.actions$
        .ofType(AccountsActions.ACTIVATE_AND_REDIRECT)
        .map(action => this.activate(<Account>action.payload));

    /**
     * Navigate to root url upon successful password reset.
     */
    @Effect() onActivateId: Observable<Action> = this.actions$
        .ofType(AccountsActions.ACTIVATE_ID)
        .map(action => MembersActions.activateAccount(action.payload));

    constructor(private actions$: Actions) {
    }

    activate(account: Account): Action {
        return RouterActions.navigate(`/${account.url}/dashboard`);
    }
}
