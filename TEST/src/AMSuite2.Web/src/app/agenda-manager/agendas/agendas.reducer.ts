import { build, toInt } from '@caiu/core';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Agendas, Agenda } from './agendas.model';
import { agendaIdItemsSelector } from '../agenda-items/agenda-items.reducer';
import { MeetingActions, meetingsSelector } from '../meetings/meetings.reducer';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';
import { routeSelector, currentUserSelector } from '../../shared/selectors';

export class AgendasActions {
    static ACTIVATE = '[Agendas] Activate';
    static DELETE = '[Agendas] Delete';
    static GET = '[Agendas] Get';
    static POST = '[Agendas] Post';
    static TOGGLE = '[Agenda] Toggle';

    static activate(id: number): Action {
        return {
            type: AgendasActions.ACTIVATE,
            payload: id
        };
    }

    static toggle(show: boolean) {
        return {
            type: AgendasActions.TOGGLE,
            payload: show
        };
    }
}

export class AgendaActions {
    static GET = '[Agenda] Get';
    static PUT = '[Agenda] Put';
}

export function agendasReducer(state: Agendas = new Agendas(), action: Action): Agendas {
    switch (action.type) {

        case AgendasActions.ACTIVATE:
            return build(Agendas, state.activate(<number>action.payload));

        case AgendasActions.DELETE:
            return build(Agendas, state.removeItem(<number>action.payload));

        case AgendasActions.GET:
            return build(Agendas, state.update(<Agenda[]>action.payload));

        case AgendasActions.POST:
            return build(Agendas, state.update(<Agenda>action.payload));

        case AgendaActions.GET:
            return build(Agendas, state.update(<Agenda>action.payload));

        case AgendaActions.PUT:
            return build(Agendas, state.update(<Agenda>action.payload));

        case AgendasActions.TOGGLE:
            return build(Agendas, state, { showAgenda: <boolean>action.payload });

        case MeetingActions.GET:
            return build(Agendas, state.update(<Agenda[]>action.payload.agendas));

        default:
            return state;
    }
}

export function agendasSelector(store: Store<any>): Observable<Agendas> {
    return store.select('agendas');
}

export function agendaIdSelector(store: Store<any>): Observable<number> {
    return agendasSelector(store).map(agendas => toInt(agendas.activeId)).distinctUntilChanged();
}

export function meetingAgendasSelector(store: Store<any>, meetingId: number): Observable<Agenda[]> {
    const agendas$ = agendasSelector(store);
    return agendas$.map(agendas => agendas.toArray().filter(agenda => agenda.meetingId === meetingId));
}

export function deletedAgendasSelector(store: Store<any>, accountId: number): Observable<Agenda[]> {
    return agendasSelector(store)
        .map((agendas: Agendas): Agenda[] => agendas.toArray()
            .filter(agenda => agenda.markedForDelete && (accountId === 6 || agenda.accountId === accountId)));
}

export function agendaToggleSelector(store: Store<any>): Observable<boolean> {
    return agendasSelector(store).map(agendas => agendas.showAgenda).distinctUntilChanged();
}

export function agendaDecorator(store: Store<any>, agenda$: Observable<Agenda>): Observable<Agenda> {
    const meetings$ = meetingsSelector(store);
    const agendaId$ = agenda$.map(agenda => agenda ? agenda.id : 0).distinctUntilChanged();
    const agendaItems$ = agendaId$.mergeMap(id => agendaIdItemsSelector(store, id));

    return agenda$.combineLatest(agendaItems$, (agenda, agendaItems) => build(Agenda, agenda, { agendaItems }))
        .withLatestFrom(meetings$, (agenda, meetings) => {
            const meetingId = agenda ? agenda.meetingId : 0;
            return build(Agenda, agenda, { meeting: meetings.get(meetingId) });
        });
}

export function agendaSelector(store: Store<any>, agendaId = 0): Observable<Agenda> {
    let agenda$: Observable<Agenda>;
    if (agendaId === 0) {
        agenda$ = agendasSelector(store).map(agendas => agendas.active || new Agenda());
    } else {
        agenda$ = agendasSelector(store).map(agendas => agendas.get(agendaId));
    }
    return agendaDecorator(store, agenda$);
}
