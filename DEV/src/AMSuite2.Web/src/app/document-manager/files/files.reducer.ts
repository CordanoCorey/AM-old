import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Files, File } from './files.model';
import { FileActions } from './file.reducer';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class FilesActions {
    static GET = '[Files] Get';
    static POST = '[Files] Post';
}

export function filesReducer(state: Files = new Files(), action: Action): Files {
    switch (action.type) {

        case FilesActions.GET:
            return state;

        case FilesActions.POST:
            return build(Files, state.update(<File[]>action.payload));

        case FileActions.DELETE:
            return state;

        case FileActions.GET:
            return state;

        case FileActions.PUT:
            return state;

        default:
            return state;
    }
}

export function filesSelector(store: Store<any>): Observable<Files> {
    return store.select('files');
}
