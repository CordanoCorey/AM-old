import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Notes } from './notes.model';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class NotesActions {
    static DELETE = '[Notes] Delete Notes';
    static GET = '[Notes] Get Notes';
    static POST = '[Notes] Post Notes';
    static PUT = '[Notes] Put Notes';
}

export function notesReducer(state: Notes = new Notes(), action: Action): Notes {
    switch (action.type) {

        default:
            return state;
    }
}

export function notesSelector(store: Store<any>): Observable<Notes> {
    return store.select('notes');
}
