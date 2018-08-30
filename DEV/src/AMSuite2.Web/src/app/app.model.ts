import { Store } from '@caiu/store';

import { Account } from './account/account.model';
import { currentAccountSelector } from './account/account.reducer';
import { CurrentUser } from './shared/models';
import { Observable } from './shared/observable';
import { Tabs } from './shared/tabs/tabs.model';

export class AppModel {
    route: RootRouteModel;
}

export class RootRouteModel {
    account: Account = new Account();
    user: CurrentUser = new CurrentUser();

    get authenticated(): boolean {
        return this.user.authenticated;
    }

    get hasAccount(): boolean {
        return this.account.id === 0 ? false : true;
    }

    get path(): string {
        if (this.authenticated && this.hasAccount) {
            return `${this.account.url}/dashboard`;
        } else if (this.authenticated && !this.hasAccount) {
            return 'accounts';
        } else if (!this.authenticated && this.hasAccount) {
            return 'login';
        } else {
            return 'login';
        }
    }
}
