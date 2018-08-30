import { build, toInt } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Bin, BinItem } from './bin.model';
import { userAccountsSelector } from '../../core/accounts/accounts.reducer';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class BinActions {
    static ACTIVATE = '[Bin] Activate';
    static ACTIVATE_ACCOUNT = '[Bin] Activate Account';
    static DELETE = '[Bin] Delete';
    static GET = '[Bin] Get';
    static POST = '[Bin] Post';

    static activate(id: number): Action {
        return {
            type: BinActions.ACTIVATE,
            payload: id
        };
    }

    static activateAccount(id: number): Action {
        return {
            type: BinActions.ACTIVATE_ACCOUNT,
            payload: id
        };
    }
}

export function activeIdInAccount(bin: Bin): boolean {
    const binItem = bin.active || new BinItem();
    return binItem.accountId === bin.accountId;
}

export function accountHasItems(bin: Bin): boolean {
    return bin.toArray().findIndex(item => item.accountId === bin.accountId) !== -1;
}

export function getAccountItems(bin: Bin): BinItem[] {
    return bin.toArray().filter(item => item.accountId === bin.accountId);
}

export function getActiveIdForAccount(bin: Bin): number {
    return activeIdInAccount(bin) ? toInt(bin.activeId)
        : accountHasItems(bin) ? getAccountItems(bin)[0].id : 0;
}

export function activateAccount(state: Bin, accountId: number): Bin {
    const bin = build(Bin, state, { accountId });
    return build(Bin, bin, { activeId: getActiveIdForAccount(bin) });
}

export function binReducer(state: Bin = new Bin(), action: Action): Bin {
    switch (action.type) {

        case BinActions.ACTIVATE:
            return build(Bin, state.activate(<number>action.payload));

        case BinActions.ACTIVATE_ACCOUNT:
            return activateAccount(state, <number>action.payload);

        case BinActions.GET:
            return build(Bin, state.update(<BinItem[]>action.payload));

        case BinActions.POST:
            return build(Bin, state.update([<BinItem>action.payload]));

        default:
            return state;
    }
}

export function binSelector(store: Store<any>): Observable<Bin> {
    return store.select('bin');
}

export function binItemSelector(store: Store<any>): Observable<BinItem> {
    return binSelector(store).map(bin => bin.active || new BinItem());
}

export function activeBinItemIdSelector(store: Store<any>): Observable<number> {
    return binSelector(store).map(bin => toInt(bin.activeId)).distinctUntilChanged();
}

export function binAgendaIdSelector(store: Store<any>): Observable<number> {
    return binSelector(store).map(bin => bin.agendaId).distinctUntilChanged();
}

export function binDisplayOrderSelector(store: Store<any>): Observable<number> {
    return binSelector(store).map(bin => bin.displayOrder).distinctUntilChanged();
}
