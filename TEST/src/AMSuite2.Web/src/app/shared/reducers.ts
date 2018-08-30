import { HasId, Collection, Dictionary, build } from '@caiu/core';
import { RouterState } from '@caiu/router';
import { Action, Store } from '@caiu/store';

import { AppActions, ConfigActions, UsersActions, UserActions } from './actions';
import { CurrentUser, Token, LoggedInUser, Config, Users, User } from './models';
import { Observable } from './observable';
import { Tabs } from './tabs/tabs.model';
import { tabsSelector } from './tabs/tabs.reducer';
import { currentAccountSelector } from '../account/account.reducer';
import { AccountMember } from '../account/account.model';
import { userAccountsSelector } from '../core/accounts/accounts.reducer';
import { GroupsActions } from '../core/groups/groups.reducer';
import { Header } from '../core/header/header.model';
import { AccountMembersActions, AccountMemberActions } from '../core/members/members.reducer';
import { findUserAccounts, reduceMember, reduceUserGroups, logout, login, impersonate, recoverPassword, resetPassword, revertToAdmin, init } from './utils';

export function currentUserReducer(state: CurrentUser = new CurrentUser(), action: Action): CurrentUser {

    switch (action.type) {

        case AppActions.INIT_STORE:
            return init(state, action.payload);

        case UserActions.ACTIVATE:
            return build(CurrentUser, action.payload);

        case UserActions.GET_PROFILE:
            return state;

        case UserActions.IMPERSONATE:
            return impersonate(state, action.payload);

        case UserActions.LOGIN_SUCCESS:
            return login(state, action.payload);

        case UserActions.LOGOUT:
            return logout(state, action.payload);

        case UserActions.RECOVER_PASSWORD:
            return recoverPassword(state, action.payload);

        case UserActions.RESET_PASSWORD:
            return resetPassword(state, action.payload);

        case UserActions.REVERT_TO_ADMIN:
            return revertToAdmin(state, action.payload);

        case UserActions.UPDATE_PROFILE:
            return state;

        default:
            return state;
    }
}

export function configReducer(state: Config = new Config(), action: Action): Config {
    switch (action.type) {

        case ConfigActions.INITIALIZE:
            return build(Config, state, action.payload);

        default:
            return state;
    }
}

export function usersReducer(state: Users = new Users(), action: Action): Users {
    switch (action.type) {

        case AppActions.INIT_STORE:
            return build(Users, action.payload['users']);

        case UsersActions.GET:
            return build(Users, state.update(<User[]>action.payload));

        case UserActions.ACTIVATE:
            return build(Users, { activeId: action.payload });

        case UserActions.GET_PROFILE:
            return reduceUser(state, UserActions.update(action.payload.user), action.payload.userId);

        case UserActions.UPDATE_PROFILE:
            return reduceUser(state, UserActions.update(action.payload.user), action.payload.userId);

        case UserActions.LOGIN_SUCCESS:
            return reduceUser(
                build(Users, state, { activeId: action.payload.user.id }),
                UserActions.update(action.payload.user), action.payload.user.id);

        case UserActions.RECOVER_PASSWORD:
            return build(Users, { activeId: action.payload.id });

        case UserActions.PUT:
            return state.update(<User>action.payload);

        case GroupsActions.GET_USER_GROUPS:
            return reduceUser(state, UserActions.updateGroups(action.payload), action.payload[0] ? action.payload[0].userId : 0);

        case AccountMembersActions.GET:
            return build(Users, state.update(<User[]>action.payload.results.map((member: AccountMember) =>
                build(User, member.user, { userRole: member.accountRole, userAccounts: findUserAccounts(state, member) }))));

        case AccountMemberActions.GET:
            return build(Users, state.update(build(User, action.payload.user, {
                userRole: action.payload.accountRole,
                userAccounts: findUserAccounts(state, action.payload)
            })));

        default:
            return state;
    }
}

export function userReducer(state: User = new User(), action: Action): User {
    switch (action.type) {

        case UserActions.UPDATE_USER:
            return reduceMember(state, action.payload);

        case GroupsActions.GET_USER_GROUPS:
            return reduceUserGroups(state, action.payload);

        default:
            return state;
    }
}

export function reduceUser(state: Users, action: Action, id?: number): Users {
    const item = userReducer(id ? state.items[id] : state.active || new User(), action);
    const items = Object.assign({}, state.items, { [item.id]: item });
    return build(Users, state, { items });
}
