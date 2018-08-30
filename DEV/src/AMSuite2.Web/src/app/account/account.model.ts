import { Collection, build } from '@caiu/core';

import { Accounts } from '../core/accounts/accounts.model';
import { GroupMember } from '../core/groups/groups.model';
import { File } from '../document-manager/files/files.model';
import { CurrentUser, User } from '../shared/models';
import { Observable } from '../shared/observable';
import { Tab, Tabs } from '../shared/tabs/tabs.model';

export class Account {
    id = 0;
    allowRequests?= false;
    defaultSignature = '';
    description?= '';
    emailAgendaTemplate = '';
    emailTemplate = '';
    memberContentSourceId = '';
    name = '';
    ownerId = 0;
    publicContentSourceId = '';
    status = '';
    statusId = 0;
    trialPeriodStartDate: Date = new Date();
    trialPeriodEndDate: Date = new Date();
    url = '';

    administrator?: User = new User();
    logo?: File = new File();
}

export class AccountMember {
    userId = 0;
    user: User = new User();
    account: Account = new Account();
    accountRole = '';
    accountRoleId = 0;
    groupIds: number[] = [];
    isPrimaryAccount = false;
    isUserActive = false;
    isGroupManager = false;
    isGroupContributor = false;
    role: AccountRole = AccountRole.DEFAULT;
    _accountId = 0;
    _groups: GroupMember[] = [];

    get id(): string {
        return `${this.accountId}_${this.userId}`;
    }

    get accountId(): number {
        return this._accountId || this.account.id;
    }

    set accountId(value: number) {
        this._accountId = value;
    }

    get displayName(): string {
        return `${this.user.lastName}, ${this.user.firstName}`;
    }

    get fullName(): string {
        return this.user.fullName;
    }

    set fullName(value: string) {
        this.user.fullName = value;
    }

    get groups(): GroupMember[] {
        return this._groups;
    }

    set groups(value: GroupMember[]) {
        if (value) {
            this._groups = value;
        }
    }
}

export enum AccountRole {
    DEFAULT = 0,
    SystemAdministrator = 1,
    Administrator = 2,
    GroupAdministrator = 3,
    Member = 4
}

export enum AccountStatus {
    DEFAULT,
    ACTIVE,
    CLOSED,
    TRIAL
}
