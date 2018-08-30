import { ActionReducer, Action, Store } from '@caiu/store';

import { Email, EmailItem } from './email.model';
import { Observable } from '../../shared/observable';
import { build } from '@caiu/core';

export class EmailActions {
    static GET = '[Email] Get';
    static POST = '[Email] Post';
}

export class EmailItemActions {
    static GET = '[EmailItem] Get';
}

export function emailReducer(state: Email = new Email(), action: Action): Email {
    switch (action.type) {

        case EmailActions.POST:
            return state;

        case EmailItemActions.GET:
            return state;

        default:
            return state;
    }
}

export function emailSelector(store: Store<any>): Observable<Email> {
    return store.select('email');
}

export function emailItemSelector(store: Store<any>): Observable<EmailItem> {
    return emailSelector(store).map(email => email.active || new EmailItem());
}
