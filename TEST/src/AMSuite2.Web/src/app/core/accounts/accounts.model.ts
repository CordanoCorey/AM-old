import { Collection, Metadata, PropertyMetadata, toInt, build, Dictionary } from '@caiu/core';
import { Action } from '@caiu/store';

import { Account } from '../../account/account.model';
import { accountReducer } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';

export class Accounts extends Collection<Account> {

    activeUrl = '';
    metadata: Metadata = Object.assign(new Metadata(), {
        items: [
            { label: 'Name', name: 'name' },
            { label: 'URL', name: 'url' },
            { label: 'Status', name: 'status' },
        ]
    });

    static FindAccountId(state: Accounts, url: string): number {
        const activeAccount = state.toArray().find(x => x.url === url);
        return activeAccount ? activeAccount.id || toInt(state.activeId) : 0;
    }

    static FindAccountUrl(state: Accounts, id: number | string): string {
        const activeAccount = state.toArray().find(x => x.id === id);
        return activeAccount ? activeAccount.url || state.activeUrl : '';
    }

    static ReduceAccount(state: Accounts, action: Action, accountId: number): Accounts {
        const account = accountReducer(state.get(accountId), action);
        return build(Accounts, state, state.update(account));
    }

    static ReduceAccounts(state: Accounts, payload: Account[]): Accounts {
        const items = payload.reduce((acc: Dictionary<Account>, item: Account) => {
            return Object.assign({}, acc, { [item.id]: item });
        }, Object.assign({}, state.items));
        return build(Accounts, state, { items });
    }

    static ReduceActivate(state: Accounts, id: number | string): Accounts {
        const activeAccount = state.toArray().find(x => x.id === id);
        const activeUrl = activeAccount ? activeAccount.url || state.activeUrl : '';
        return build(Accounts, state, { activeId: id, activeUrl });
    }

    constructor() {
        super(Account);
    }

    get active(): Account {
        return this.items[this.activeId] || new Account();
    }

    findAccountId(url: string): number {
        return Accounts.FindAccountId(this, url);
    }
}

export class AccountRow {

    constructor(public model: Account) {
    }

    get accountName() {
        return this.model.name;
    }

    get accountUrl() {
        return this.model.url;
    }

    get accountStatus() {
        return this.model.status;
    }
}
