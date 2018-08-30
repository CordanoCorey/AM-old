import { build } from '@caiu/core';
import { Action, ActionReducer, Store } from '@caiu/store';

import { Dashboard, DashboardMessage } from './dashboard.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { Observable } from '../../shared/observable';

export class DashboardActions {
    static GET = `[Dashboard] Get`;
    static GET_ERROR = `[Dashboard] Get Error`;
    static GET_MESSAGE = `[Dashboard] Get Message`;
    static UPDATE_MESSAGE = `[Dashboard] Update Message`;
}

export function dashboardReducer(state: Dashboard = new Dashboard(), action: Action): Dashboard {
    switch (action.type) {

        case DashboardActions.GET:
            return build(Dashboard, action.payload);

        case DashboardActions.GET_MESSAGE:
            return build(Dashboard, action.payload);

        case DashboardActions.UPDATE_MESSAGE:
            return build(Dashboard, action.payload);

        default:
            return state;
    }
}

export function dashboardSelector(store: Store<any>): Observable<Dashboard> {
    return Observable.of(new Dashboard());
}

export function dashboardMessageSelector(store: Store<any>): Observable<DashboardMessage> {
    return Observable.of(new DashboardMessage());
}
