import { Action } from '@caiu/store';

import { File } from './files.model';

export class FileActions {
    static DELETE = '[File] Delete';
    static GET = '[File] Get';
    static PUT = '[File] Put';
}

export function fileReducer(state: File = new File(), action: Action): File {
    switch (action.type) {

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
