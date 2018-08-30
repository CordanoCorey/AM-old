import { build } from '@caiu/core';
import { lookupKeySelector } from '@caiu/http';
import { Store } from '@caiu/store';

import { Accounts } from '../accounts/accounts.model';
import { GroupMember } from '../groups/groups.model';
import { Account, AccountMember } from '../../account/account.model';
import { CurrentUser } from '../../shared/models';
import { Tabs, Tab } from '../../shared/tabs/tabs.model';

export class Profile {
    userId = 0;
    agendaDateRangeId = 10;
    autoSaveEnabled = false;
    emailAddress = '';
    firstName = '';
    generalInfo = '';
    groupId = 0;
    lastName = '';
    userTitle = '';
    warnOnDirty = true;
    newPassword = '';
    confirmPassword = '';
}

export class AccountRequest {
    accountId = 0;
    accountName = '';
    notificationStatus = 'Action Required';
    notificationStatusId = 1;
    notificationType = 'Account Request';
    notificationTypeId = 0;
    reason = '';
    userId = 0;
    userName = '';
}
