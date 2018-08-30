import { build } from '@caiu/core';
import { lookupKeySelector } from '@caiu/http';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Profile } from './profile.model';
import { accountsSelector, userAccountsSelector } from '../accounts/accounts.reducer';
import { GroupMember } from '../groups/groups.model';
import { AccountMember } from '../../account/account.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class ProfileActions {
    static GET = '[Profile] Get';
    static PUT = '[Profile] Put';
}

export function profileReducer(state: Profile = new Profile(), action: Action): Profile {
    switch (action.type) {

        default:
            return state;
    }
}

export function profileSelector(store: Store<any>): Observable<Profile> {
    const user$: Observable<CurrentUser> = currentUserSelector(store);

    return user$.map(user => build(Profile, {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        userTitle: user.userTitle,
        generalInfo: user.generalInfo,
        warnOnDirty: user.warnOnDirty,
        autoSaveEnabled: user.autoSaveEnabled
    }));
}
