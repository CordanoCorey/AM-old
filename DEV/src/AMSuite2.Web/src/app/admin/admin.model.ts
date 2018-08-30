import { Store } from '@caiu/store';
import { build } from '@caiu/core';

import { AccountMember, Account } from '../account/account.model';
import { Accounts } from '../core/accounts/accounts.model';
import { userAccountsSelector } from '../core/accounts/accounts.reducer';
import { CurrentUser } from '../shared/models';
import { currentUserSelector } from '../shared/selectors';
import { Tabs, Tab } from '../shared/tabs/tabs.model';

export class Admin {
    baseUrl = '';
}
