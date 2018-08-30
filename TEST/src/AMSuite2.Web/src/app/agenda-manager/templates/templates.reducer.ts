import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Templates, Template } from './templates.model';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class TemplatesActions {
    static ACTIVATE = '[Templates] Activate';
    static GET = '[Templates] Get';
    static POST = '[Templates] Post';

    static activate(id: number): Action {
        return {
            type: TemplatesActions.ACTIVATE,
            payload: id
        };
    }
}

export function templatesReducer(state: Templates = new Templates(), action: Action): Templates {
    switch (action.type) {

        case TemplatesActions.ACTIVATE:
            return build(Templates, state.activate(action.payload));

        case TemplatesActions.GET:
            return build(Templates, state.update(<Template[]>action.payload));

        case TemplatesActions.POST:
            return build(Templates, state.update(<Template>action.payload));

        default:
            return state;
    }
}

export function templatesSelector(store: Store<any>): Observable<Templates> {
    return store.select('templates');
}

export function templateSelector(store: Store<any>): Observable<Template> {
    return templatesSelector(store).map(templates => templates.active || new Template());
}
