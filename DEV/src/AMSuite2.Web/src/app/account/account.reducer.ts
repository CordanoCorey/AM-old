import { Collection, build } from '@caiu/core';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Account, AccountMember } from './account.model';
import { Accounts } from '../core/accounts/accounts.model';
import { userAccountsSelector } from '../core/accounts/accounts.reducer';
import { File } from '../document-manager/files/files.model';
import { AccountActions } from '../shared/actions';
import { CurrentUser } from '../shared/models';
import { Observable } from '../shared/observable';
import { currentUserSelector } from '../shared/selectors';
import { Tabs } from '../shared/tabs/tabs.model';
import { AccountMembersActions } from '../core/members/members.reducer';

export function reduceAccountLogo(state: Account, payload: File): Account {
    return build(Account, state, {
        logo: payload
    });
}

export function accountReducer(state: Account = new Account(), action: Action): Account {
    switch (action.type) {

        case AccountActions.GET_ACCOUNT_LOGO:
            return reduceAccountLogo(state, action.payload);

        case AccountMembersActions.GET:
            return build(Account, state, { members: action.payload.results });

        default:
            return state;
    }
}

export function currentAccountSelector(store: Store<any>): Observable<Account> {
    return store.select('accounts').map((accounts: Collection<Account>) => build(Account, accounts.active));
}

export function currentAccountIdSelector(store: Store<any>): Observable<number> {
    return currentAccountSelector(store).map(account => account.id).distinctUntilChanged();
}

export function accountNameSelector(store: Store<any>): Observable<string> {
    return currentAccountSelector(store).map(account => account.name).distinctUntilChanged();
}

export function activeAccountUrlSelector(store: Store<any>): Observable<string> {
    return currentAccountSelector(store).map(account => account.url).distinctUntilChanged();
}
