import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { AgendaItemMinutes, Minutes } from './minutes.model';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class MinutesActions {
    static DELETE = '[Minutes] Delete Minutes';
    static GET = '[Minutes] Get Minutes';
    static POST = '[Minutes] Post Minutes';
    static PUT = '[Minutes] Put Minutes';
}

export function minutesReducer(state: Minutes = new Minutes(), action: Action): Minutes {
    switch (action.type) {

        default:
            return state;
    }
}

export function minutesSelector(store: Store<any>): Observable<Minutes> {
    return store.select('minutes');
}
