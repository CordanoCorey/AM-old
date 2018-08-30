import { build, toInt } from '@caiu/core';
import { ActionReducer, Action, Store } from '@caiu/store';

import { AgendaItems, AgendaItem } from './agenda-items.model';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserSelector } from '../../shared/selectors';

export class AgendaItemsActions {
    static ACTIVATE = '[AgendaItems] Activate';
    static GET = '[AgendaItems] Get';
    static POST = '[AgendaItems] Post';

    static activate(id: number): Action {
        return {
            type: AgendaItemsActions.ACTIVATE,
            payload: id
        };
    }
}

export class AgendaItemActions {
    static ADD_ATTACHMENTS = '[AgendaItem] Add Attachments';
    static DELETE = '[AgendaItem] Delete';
    static GET = '[AgendaItem] Get';
    static PUT = '[AgendaItem] Put';
    static REMOVE_ATTACHMENTS = '[AgendaItem] Remove Attachment';
}

export function agendaItemsReducer(state: AgendaItems = new AgendaItems(), action: Action): AgendaItems {
    switch (action.type) {

        case AgendaItemsActions.ACTIVATE:
            return build(AgendaItems, state.activate(<number>action.payload));

        case AgendaItemsActions.GET:
            return build(AgendaItems, state.update(<AgendaItem[]>action.payload));

        case AgendaItemsActions.POST:
            return build(AgendaItems, state.update(<AgendaItem>action.payload));

        default:
            return state;
    }
}

export function agendaItemsSelector(store: Store<any>): Observable<AgendaItems> {
    return store.select('agendaItems');
}

export function agendaItemIdSelector(store: Store<any>): Observable<number> {
    return agendaItemsSelector(store).map(agendaItems => toInt(agendaItems.activeId)).distinctUntilChanged();
}

export function agendaIdItemsSelector(store: Store<any>, agendaId: number): Observable<AgendaItem[]> {
    return agendaItemsSelector(store).map(ai => ai.toArray().filter(item => item.agendaId === agendaId));
}

export function suggestionsSelector(store: Store<any>): Observable<AgendaItem[]> {
    return agendaItemsSelector(store)
        .map(agendaItems => agendaItems.toArray().filter(item => item.isSuggestion));
}

export function agendaItemSelector(store: Store<any>): Observable<AgendaItem> {
    return agendaItemsSelector(store).map(agendaItems => build(AgendaItem, agendaItems.active) || new AgendaItem());
}

export function activeAgendaItemIdSelector(store: Store<any>): Observable<number> {
    return agendaItemSelector(store).map(agendaItem => agendaItem.id).distinctUntilChanged();
}
