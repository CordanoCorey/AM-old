import { Dictionary, buildDictionaryFromArray, Collection, BaseEntity, build } from '@caiu/core';

import { Tabs } from './tabs/tabs.model';
import { Account, AccountMember, AccountRole } from '../account/account.model';
import { GroupMember, Group } from '../core/groups/groups.model';

export class User extends BaseEntity {
    agendaDateRangeId = 0;
    autoSaveEnabled = false;
    defaultGroupId = 0;
    emailAddress = '';
    failedPasswordAttemptCount = 0;
    firstName = '';
    fullName = '';
    generalInfo = '';
    groupIds: number[] = [];
    impersonating: CurrentUser = undefined;
    isActive = true;
    isLockedOut = false;
    lastLockoutDate: Date = new Date();
    lastLoginDate: Date = new Date();
    lastName = '';
    middleName = '';
    userName = '';
    userTitle = '';
    warnOnDirty = true;

    groups: Group[] = [];
    userAccounts: UserAccount[] = [];
    userGroups: GroupMember[] = [];

    private _userRole = '';

    get userRole(): string {
        return this._userRole;
    }

    set userRole(value: string) {
        this._userRole = value;
    }

    get isAccountActive(): boolean {
        return true;
    }

    isAccountMember(accountId: number) {
        return this.userAccounts.findIndex(account => account.id === accountId) !== -1;
    }
}

export class AppModel {
    currentUserId = 0;
    tabs: Tabs = new Tabs();
}

export class Config {
    dev?= false;
    test?= false;
    staging?= false;
    production = false;
    apiBase = '';
    viewMode?: 'Default' | 'Classic' | 'Material' = 'Default';
}

export class Token {
    access_token = '';
    expires_in = 0;
}

export enum SecurityStatus {
    DEFAULT,
    PRIVATE,
    GROUP_MEMBER,
    ACCOUNT,
    PUBLIC
}

export class LoggedInUser {
    access_token = '';
    expires_in = 0;
    user: User = new User();
}

export class UserAccount {
    id = 0;
    isPrimary = false;
    roleId = 0;
}

export class UserGroup {
    id = 0;
    roleId = 0;
    role = '';
}

export class Users extends Collection<User> {

    constructor() {
        super(User);
    }
}

export class CurrentUser extends User {
    accessFailedCount = 0;
    accountId = 0;
    accountLevel = 0;
    concurrencyStamp = '';
    emailConfirmed = false;
    lastPasswordChangedDate: Date = new Date();
    lockoutEnabled = false;
    lockoutEnd: Date = new Date();
    normalizedEmail = '';
    normalizedUserName = '';
    password = '';
    passwordHash = '';
    passwordResetCode = '';
    phoneNumber = '';
    phoneNumberConfirmed = false;
    securityStamp = '';
    serverSalt = '';
    token: Token = new Token();
    twoFactorEnabled = false;
    userId = 0;

    displayMode: DisplayMode = 'default';

    get accountIds(): number[] {
        return this.userAccounts.map(x => x.id);
    }

    get authenticated(): boolean {
        return this.token.expires_in > 0;
    }

    get hasAccount(): boolean {
        return this.accountId === 0 ? true : false;
    }

    get primaryAccountId(): number {
        const account = this.userAccounts.find(x => x.isPrimary === true);
        return account ? account.id : this.userAccounts[0].id;
    }

    logout() {
        this.token = new Token();
    }
}


export type DisplayMode = 'default' | 'classic';

export class UserSearchResult {

    id = 0;
    firstName = '';
    lastName = '';
    fullName = '';
    user: User = new User();

    static Build(user: User): UserSearchResult {
        return build(UserSearchResult, user, { user });
    }

    get displayName(): string {
        return `${this.lastName}, ${this.firstName}`;
    }
}
