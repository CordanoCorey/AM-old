import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Search } from './search.model';
import { Observable } from '../../shared/observable';

export class SearchActions {
    static POST = '[Search] Post';
}

export function searchReducer(state: Search = new Search(), action: Action): Search {
    switch (action.type) {

        case SearchActions.POST:
            return state;

        default:
            return state;
    }
}

export function searchSelector(store: Store<any>): Observable<Search> {
    return store.select('search');
}
