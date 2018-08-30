import { build, inArray, Collection, Dictionary, toInt, distinct } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Members, Member } from './members.model';
import { Group, GroupMember } from '../groups/groups.model';
import { GroupsActions, GroupActions, groupsSelector, groupsSearchSelector, groupSelector, accountGroupsSelector } from '../groups/groups.reducer';
import { Account, AccountMember } from '../../account/account.model';
import { UsersActions } from '../../shared/actions';
import { User } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserSelector, userIdSelector, usersSelector, currentUserIdSelector } from '../../shared/selectors';

export class AccountMembersActions {
    static ACTIVATE = '[Account Members] Activate';
    static CHANGE_ACCOUNT = '[Account Members] Change Account';
    static GET = '[Account Members] Get';
    static POST = '[Account Members] Post';

    static activate(id: number): Action {
        return {
            type: AccountMembersActions.ACTIVATE,
            payload: id
        };
    }

    static changeAccount(accountId: number): Action {
        return {
            type: AccountMembersActions.CHANGE_ACCOUNT,
            payload: accountId
        };
    }
}

export class AccountMemberActions {
    static GET = '[Account Member] Get';
    static PUT = '[Account Member] Put';
}

export class GroupMembersActions {
    static GET = '[Group Members] Get';
    static POST = '[Group Members] Post';
    static GET_ACCOUNT_GROUPS = '[Group Members] Get Account Groups';
    static UPDATE_USER_GROUPS = '[Group Members] Update User Groups';
}

export class MembersActions {
    static ACTIVATE_ACCOUNT = '[Members] Activate Account';
    static ACTIVATE_USER = '[Members] Activate User';

    static activateAccount(id: number): Action {
        return {
            type: MembersActions.ACTIVATE_ACCOUNT,
            payload: id
        };
    }

    static activateUser(id: number): Action {
        return {
            type: MembersActions.ACTIVATE_USER,
            payload: id
        };
    }
}

export function accountMembersReducer(state = new Collection<AccountMember>(), action: Action): Collection<AccountMember> {
    switch (action.type) {

        case AccountMembersActions.ACTIVATE:
            return state.activate(<number>action.payload);

        case AccountMembersActions.GET:
            return Members.ReduceAccountMembers(state, <AccountMember[]>action.payload.results);

        case AccountMembersActions.POST:
            return Members.ReduceAccountMembers(state, <AccountMember[]>action.payload);

        case AccountMemberActions.GET:
            return Members.ReduceAccountMembers(state, [Members.BuildAccountMember(<AccountMember>action.payload)]);

        case AccountMemberActions.PUT:
            return Members.ReduceAccountMembers(state, [<AccountMember>action.payload]);

        default:
            return state;
    }
}

export function groupMembersReducer(state: GroupMember[] = [], action: Action): GroupMember[] {
    switch (action.type) {

        case GroupMembersActions.GET:
            return Members.ReduceGroupMembers(state, <GroupMember[]>action.payload.results);

        case GroupMembersActions.POST:
            return Members.ReduceGroupMembers(state, <GroupMember[]>[action.payload]);

        case GroupMembersActions.UPDATE_USER_GROUPS:
            return Members.ReduceGroupMembers(state, <GroupMember[]>[action.payload]);

        case GroupActions.GET:
            return Members.UpdateGroupMembers(state, (<Group>action.payload).members);

        case GroupsActions.GET_USER_GROUPS:
            return Members.ReduceGroupMembers(state, <GroupMember[]>action.payload);

        default:
            return state;
    }
}


export function membersReducer(state: Members = new Members(), action: Action): Members {
    switch (action.type) {

        case MembersActions.ACTIVATE_ACCOUNT:
            return build(Members, state, { accountId: <number>action.payload });

        case MembersActions.ACTIVATE_USER:
            return build(Members, state, { userId: <number>action.payload });

        default:
            return state;
    }
}

export function membersSelector(store: Store<any>, accountId = 0): Observable<Members> {
    const accountMembers$ = accountIdMembersSelector(store, accountId);
    const groupMembers$ = groupIdMembersSelector(store, 0, accountId);
    const accountId$ = membersAccountIdSelector(store);
    const userId$ = membersUserIdSelector(store);
    return Observable.combineLatest(accountMembers$, groupMembers$, accountId$, userId$, Members.BuildMembers);
}

export function memberIdSelector(store: Store<any>, accountId = 0): Observable<string> {
    return membersSelector(store).map(members => members.activeId).distinctUntilChanged();
}

export function accountMembersSelector(store: Store<any>): Observable<Collection<AccountMember>> {
    return store.select('accountMembers');
}

export function accountMembersIdSelector(store: Store<any>): Observable<number> {
    return accountMembersSelector(store).map(accountMembers => toInt(accountMembers.activeId)).distinctUntilChanged();
}

export function membersUserIdSelector(store: Store<any>): Observable<number> {
    return store.select('members').map(members => members['userId']).distinctUntilChanged();
}

export function membersAccountIdSelector(store: Store<any>): Observable<number> {
    return store.select('members').map(members => members['accountId']).distinctUntilChanged();
}

export function accountIdMembersSelector(store: Store<any>, accountId = 0): Observable<AccountMember[]> {
    const accountMembers$: Observable<AccountMember[]> = accountMembersSelector(store)
        .map((accountMembers: Collection<AccountMember>) => accountMembers.toArray());
    return accountId === 0 ? accountMembers$
        : accountMembers$.map(accountMembers => accountMembers.filter(member => member.accountId === accountId));
}

export function accountMemberRolesSelector(store: Store<any>, accountId = 0, roles: number[] = []): Observable<AccountMember[]> {
    const members$ = accountIdMembersSelector(store, accountId);
    return members$.map(members => distinct(members.filter(x => inArray(roles, x.accountRoleId)), 'userId'));
}

export function groupMembersSelector(store: Store<any>, groupId = 0, accountId = 0): Observable<GroupMember[]> {
    return store.select('groupMembers');
}

export function groupIdMembersSelector(store: Store<any>, groupId = 0, accountId = 0): Observable<GroupMember[]> {
    const groupMembers$ = groupMembersSelector(store);
    const members$ = groupId === 0 ? (accountId === 0 ? groupMembers$
        : groupMembers$.map(groupMembers => groupMembers.filter(member => member.accountId === accountId)))
        : groupMembers$.map(groupMembers => groupMembers.filter(member => member.groupId === groupId));
    return members$.combineLatest(usersSelector(store), (members, users) => {
        return members.map(member => build(GroupMember, member, { user: users.get(member.userId) }));
    });
}

export function groupMembersByAccountSelector(store: Store<any>, accountId = 0, groupId = 0): Observable<GroupMember[]> {
    const members$ = membersSelector(store, accountId);
    return members$.map(members => {
        return members.toArray().map(member => {
            const groupMember = member.groups.find(group => group.groupId === groupId);
            return groupMember || build(GroupMember, {
                user: member.user,
                groupId
            });
        });
    });
}

export function memberSelector(store: Store<any>): Observable<Member> {
    const member$ = membersSelector(store).map(members => members.active);
    const userId$ = member$.map(member => member.userId).distinctUntilChanged();
    const user$ = userId$.mergeMap(id => userIdSelector(store, id));
    return Observable.combineLatest(member$, user$,
        (member, user) => build(Member, member.base, { user }));
}

export function activeMemberIdSelector(store: Store<any>): Observable<number> {
    return memberSelector(store).map(member => member.userId).distinctUntilChanged();
}

export function userGroupsSelector(store: Store<any>): Observable<Member[]> {
    const userId$ = currentUserIdSelector(store);
    return userId$.mergeMap(id => userMembershipsSelector(store, id));
}

export function userMembershipsSelector(store: Store<any>, userId: number): Observable<Member[]> {
    return membersSelector(store)
        .map(members => {
            return members.toArray().filter(member => member.userId === userId);
        });
}
