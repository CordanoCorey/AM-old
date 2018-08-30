import { Injectable, Injector } from '@angular/core';
import { Effect, Actions } from '@caiu/effects';
import { RouterActions } from '@caiu/router';
import { Action } from '@caiu/store';

import { UserActions } from '../../shared/actions';
import { Observable } from '../../shared/observable';

@Injectable()
export class ResetPasswordEffects {

    /**
     * Navigate to root url upon successful password reset.
     */
    @Effect() navigate: Observable<Action> = this.actions$
        .ofType(UserActions.RESET_PASSWORD)
        .map(action => RouterActions.navigate('/'));

    constructor(
        private actions$: Actions
    ) { }
}
