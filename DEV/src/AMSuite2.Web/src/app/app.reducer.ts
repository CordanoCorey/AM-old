import { build } from '@caiu/core';
import { Action, combineReducers, Store } from '@caiu/store';

import { RootRouteModel } from './app.model';
import { Account } from './account/account.model';
import { currentAccountSelector } from './account/account.reducer';
import { AppActions, UserActions } from './shared/actions';
import { AppModel, CurrentUser } from './shared/models';
import { Observable } from './shared/observable';
import { currentUserSelector } from './shared/selectors';

export function globalReducer(state: AppModel = new AppModel(), action: Action): AppModel {

    switch (action.type) {

        case UserActions.LOGIN_SUCCESS:
            return build(AppModel, state, { currentUserId: action.payload.user.id });

        default:
            return state;
    }
}

export function rootSelector(store: Store<any>): Observable<AppModel> {
    const route$ = rootRouteSelector(store);
    return route$.map(route => build(AppModel, { route }));
}

export function rootRouteSelector(store: Store<any>): Observable<RootRouteModel> {
    const account$ = currentAccountSelector(store);
    const user$ = currentUserSelector(store);

    return Observable.combineLatest(account$, user$,
        (account: Account, user: CurrentUser) => build(RootRouteModel, { account, user }));
}
