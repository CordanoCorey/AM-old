import { Dictionary, Collection, build, HasId } from '@caiu/core';
import { Events, Event } from '@caiu/events';
import { Store, Action } from '@caiu/store';

import { CurrentUser, LoggedInUser, User, Users, Token, UserAccount } from './models';
import { Observable } from './observable';
import { userReducer } from './reducers';
import { AccountMember } from '../account/account.model';
import { GroupMember } from '../core/groups/groups.model';

export function reduceActivate(state: CurrentUser, payload: CurrentUser): CurrentUser {
    return build(CurrentUser, payload);
}

export function reduceCollection<TCollection extends Collection<TItem>, TItem extends HasId>
    (state: TCollection, payload: TItem[]): TCollection {
    const items = payload.reduce((acc: Dictionary<TItem>, item: TItem) => {
        return Object.assign({}, acc, { [item.id]: item });
    }, Object.assign({}, state.items));
    return Object.assign(state, { items });
}

export function impersonate(state: CurrentUser, payload: LoggedInUser): CurrentUser {
    const token = build(Token, { access_token: payload.access_token, expires_in: payload.expires_in });
    const impersonating = build(CurrentUser, payload.user, { token: token, userId: payload.user.id });
    return build(CurrentUser, state, { impersonating });
}

export function init(state: CurrentUser, payload: any): CurrentUser {
    return build(CurrentUser, payload['currentUser']);
}

export function login(state: CurrentUser, payload: LoggedInUser): CurrentUser {
    const token = build(Token, { access_token: payload.access_token, expires_in: payload.expires_in });
    return build(CurrentUser, state, payload.user, { token: token, userId: payload.user.id });
}

export function logout(state: CurrentUser, payload: LoggedInUser): CurrentUser {
    return build(CurrentUser, state, { token: new Token() });
}

export function recoverPassword(state: CurrentUser, payload: any): CurrentUser {
    return build(CurrentUser, state, { passwordResetCode: payload.passwordResetCode });
}

export function resetPassword(state: CurrentUser, payload: any): CurrentUser {
    return build(CurrentUser, payload);
}

export function revertToAdmin(state: CurrentUser, payload: LoggedInUser): CurrentUser {
    return build(CurrentUser, state, { impersonating: false });
}

export function reduceMember(state: User, payload: User): User {
    const fixedState = {
        groupIds: state.groupIds,
        userGroups: state.userGroups,
        userAccounts: payload.userAccounts || state.userAccounts
    };
    return build(User, state, payload, fixedState);
}

export function reduceUserGroups(state: User, payload: GroupMember[]): User {
    return build(User, state, {
        groupIds: payload.map(member => member.group.id),
        userGroups: payload
    });
}

export function findUserIdByEmail(state: Users, emailAddress: string): number {
    const user: User = state.toArray().find(u => u.emailAddress === emailAddress);
    return user ? user.id : 0;
}

export function findUserAccounts(state: Users, member: AccountMember): UserAccount[] {
    const user = state.get(member.userId) || new User();
    return user['userAccounts'] || [];
}

export function getMemberId(accountId: number, userId: number): string {
    return `${accountId}_${userId}`;
}
