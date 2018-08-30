import { build } from '@caiu/core';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Meeting } from './meeting.model';
import { agendaToggleSelector } from '../agendas/agendas.reducer';
import { agendaSelector } from '../agendas/agendas.reducer';
import { meetingsSelector, MeetingActions } from '../meetings/meetings.reducer';
import { activeAccountUrlSelector } from '../../account/account.reducer';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, routeSelector, currentUserSelector } from '../../shared/selectors';
import { agendaIdItemsSelector, agendaItemIdSelector } from '../agenda-items/agenda-items.reducer';

export function meetingReducer(state: Meeting = new Meeting(), action: Action): Meeting {
    switch (action.type) {

        case MeetingActions.DELETE:
            return state;

        case MeetingActions.GET:
            return state;

        case MeetingActions.PUT:
            return state;

        default:
            return state;
    }
}

export function meetingSelector(store: Store<any>): Observable<Meeting> {
    return meetingsSelector(store).map(meetings => build(Meeting, meetings.active));
}
