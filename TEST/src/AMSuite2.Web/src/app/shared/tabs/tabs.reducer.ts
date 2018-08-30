import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Tabs } from './tabs.model';
import { Observable } from '../observable';

export class TabsActions {
    static ACTIVATE = '[Tabs] Active Tab';
    static UPDATE_TABS = '[Tabs] Update Tabs';

    static activate(activeTab: string, order: string[] = []): Action {
        return {
            type: TabsActions.ACTIVATE,
            payload: { activeTab, order }
        };
    }

    static updateTabs(tabs: Tabs): Action {
        return {
            type: TabsActions.UPDATE_TABS,
            payload: tabs
        };
    }
}

export function tabsReducer(state: Tabs = new Tabs(), action: Action): Tabs {

    switch (action.type) {

        case TabsActions.ACTIVATE:
            const order = action.payload.order.length > 0 ? <string[]>action.payload.order : [...state.order];
            return build(Tabs, state, { activeId: <string>action.payload.activeTab, order });

        case TabsActions.UPDATE_TABS:
            const tabs = build(Tabs, <Tabs>action.payload, { activeId: <string>action.payload.activeTab });
            return build(Tabs, state.setValue(tabs));

        default:
            return state;
    }
}

export function tabsSelector(store: Store<any>): Observable<Tabs> {
    return store.select(s => s['tabs']);
}
