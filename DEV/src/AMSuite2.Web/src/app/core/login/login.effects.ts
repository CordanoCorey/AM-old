import { Injectable, Injector } from '@angular/core';
import { Effect, Actions } from '@caiu/effects';
import { RouterActions } from '@caiu/router';
import { Action } from '@caiu/store';
import { Observable } from 'rxjs/Observable';
import { UserActions } from '../../shared/actions';

@Injectable()
export class LoginEffects {

    /**
     * Navigate to root url upon successful login.
     */
    @Effect() onLoginSuccess: Observable<Action> = this.actions$
        .ofType(UserActions.LOGIN_SUCCESS)
        .map(action => {
            return RouterActions.navigate('/');
        });

    /**
     * Navigate to reset password after recovering password.
     */
    @Effect() onRecoverPassword: Observable<Action> = this.actions$
        .ofType(UserActions.RECOVER_PASSWORD)
        .map(action => RouterActions.navigate('/reset-password'));

    constructor(
        private actions$: Actions
    ) {
    }
}
