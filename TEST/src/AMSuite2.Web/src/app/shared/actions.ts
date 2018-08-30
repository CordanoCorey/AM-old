import { StorageActions } from '@caiu/storage';
import { Action } from '@caiu/store';

import { Config, User } from './models';
import { Tabs } from './tabs/tabs.model';
import { GroupMember } from '../core/groups/groups.model';
import { GroupsActions } from '../core/groups/groups.reducer';
import { Profile } from '../core/profile/profile.model';

export class AppActions {
    static INIT_STORE = StorageActions.INIT_STORE;
    static LOAD_JSON = '[App] Load Json';

    static initStore(store: any): Action {
        return {
            type: AppActions.INIT_STORE,
            payload: store
        };
    }
}

export class AccountActions {
    static ACTIVATE = '[Account] Set Active Account';
    static ADD_ACCOUNT_LOGO = '[Account] Add Account Member';
    static GET = '[Account] Get';
    static GET_ACCOUNT_LOGO = '[Account] Get Account Logo';
    static POST = '[Account] Post';
    static PUT = '[Account] Put';
}

export class ConfigActions {
    static INITIALIZE = '[Config] Initialize Configuration';

    static initialize(config: Config): Action {
        return {
            type: ConfigActions.INITIALIZE,
            payload: config
        };
    }
}

export class UsersActions {
    static GET = '[Users] Get';
    static POST = '[Users] Post';
}

export class UserActions {
    static ACTIVATE = '[User] Set Active User';
    static GET_PROFILE = '[User] Get Profile';
    static DELETE = '[User] Delete';
    static PUT = '[User] Put';
    static IMPERSONATE = '[User] Impersonate User';
    static LOGOUT = '[User] Logout';
    static LOGIN_SUCCESS = '[User] Login Success';
    static LOGIN_ERROR = '[User] Login Error';
    static RECOVER_PASSWORD = '[User] Recover Password';
    static RESET_PASSWORD = '[User] Reset Password';
    static REVERT_TO_ADMIN = '[User] Revert to Admin';
    static UPDATE_PROFILE = '[User] Update Profile';
    static UPDATE_USER = '[User] Update User';

    static impersonate(userId: number): Action {
        return {
            type: UserActions.IMPERSONATE,
            payload: userId
        };
    }

    static logout(): Action {
        return {
            type: UserActions.LOGOUT
        };
    }

    static recoverPassword(): Action {
        return {
            type: UserActions.RECOVER_PASSWORD
        };
    }

    static resetPassword(payload: any): Action {
        return {
            type: UserActions.RESET_PASSWORD,
            payload: payload
        };
    }

    static update(user: User): Action {
        return {
            type: UserActions.UPDATE_USER,
            payload: user
        };
    }

    static updateGroups(groups: GroupMember[]): Action {
        return {
            type: GroupsActions.GET_USER_GROUPS,
            payload: groups
        };
    }

    static updateProfile(profile: Profile): Action {
        return {
            type: UserActions.UPDATE_PROFILE,
            payload: profile
        };
    }
}
