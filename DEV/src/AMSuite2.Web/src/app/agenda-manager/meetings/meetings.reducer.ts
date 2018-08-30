import { build, toInt } from '@caiu/core';
import { lookupKeySelector } from '@caiu/http';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Meetings } from './meetings.model';
import { Meeting } from '../meeting/meeting.model';
import { Observable } from '../../shared/observable';
import { currentAccountSelector, currentAccountIdSelector } from '../../account/account.reducer';
import { accountGroupsSelector } from '../../core/groups/groups.reducer';
import { currentUserSelector } from '../../shared/selectors';

export class MeetingsActions {
    static ACTIVATE = '[Meetings] Activate';
    static GET = '[Meetings] Get';
    static POST = '[Meetings] Post';

    static activate(id: number): Action {
        return {
            type: MeetingsActions.ACTIVATE,
            payload: id
        };
    }
}

export class MeetingActions {
    static DELETE = '[Meeting] Delete';
    static GET = '[Meeting] Get';
    static PUT = '[Meeting] Put';
}

export function meetingsReducer(state: Meetings = new Meetings(), action: Action): Meetings {

    switch (action.type) {

        case MeetingsActions.ACTIVATE:
            return build(Meetings, state.activate(<number>action.payload));

        case MeetingsActions.GET:
            return build(Meetings, state.update(<Meeting[]>action.payload));

        case MeetingsActions.POST:
            return build(Meetings, state.update(<Meeting[]>action.payload));

        case MeetingActions.GET:
            return build(Meetings, state.update(action.payload));

        case MeetingActions.PUT:
            return build(Meetings, state.update(action.payload));

        case MeetingActions.DELETE:
            return build(Meetings, state.removeItem(action.payload));

        default:
            return state;
    }
}

export function meetingsSelector(store: Store<any>): Observable<Meetings> {
    return store.select('meetings');
}

export function meetingIdSelector(store: Store<any>): Observable<number> {
    return meetingsSelector(store).map(meetings => toInt(meetings.activeId)).distinctUntilChanged();
}

export function deletedMeetingsSelector(store: Store<any>, accountId: number): Observable<Meeting[]> {
    return meetingsSelector(store)
        .map((meetings: Meetings): Meeting[] => meetings.toArray()
            .filter(meeting => meeting.markedForDelete && (accountId === 6 || meeting.accountId === accountId)));
}
