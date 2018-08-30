import { build, toInt } from '@caiu/core';
import { ActionReducer, Action, Store } from '@caiu/store';

import { Announcements, Announcement } from './announcements.model';
import { currentAccountSelector } from '../../account/account.reducer';
import { Observable } from '../../shared/observable';
import { activatedRouteSelector, currentUserSelector } from '../../shared/selectors';

export class AnnouncementsActions {
    static ACTIVATE = '[Announcements] Activate';
    static ADD = '[Announcements] Add Announcement';
    static DELETE = '[Announcements] Delete';
    static GET = '[Announcements] Get';
    static GET_ERROR = '[Announcements] Get Error';
    static POST = '[Announcements] Post';

    static activate(id: number): Action {
        return {
            type: AnnouncementsActions.ACTIVATE,
            payload: id
        };
    }
}

export class AnnouncementActions {
    static DELETE = '[Announcement] Delete';
    static GET = '[Announcement] Get';
    static PUT = '[Announcement] Put';
    static MOVE_ATTACHMENT = '[Announcement] Move Attachment';
}

export function announcementsReducer(state: Announcements = new Announcements(), action: Action) {

    switch (action.type) {

        case AnnouncementsActions.ACTIVATE:
            return build(Announcements, state.activate(action.payload));

        case AnnouncementsActions.GET:
            return build(Announcements, state.update(<Announcement[]>action.payload));

        case AnnouncementActions.DELETE:
            return build(Announcements, state.delete(<number>action.payload));

        case AnnouncementActions.GET:
            return build(Announcements, state.update(<Announcement>action.payload));

        case AnnouncementActions.PUT:
            return build(Announcements, state.update(<Announcement>action.payload));

        default:
            return state;
    }
}

export function announcementsSelector(store: Store<any>): Observable<Announcements> {
    return store.select('announcements');
}

export function activeAnnouncementIdSelector(store: Store<any>): Observable<number> {
    return announcementsSelector(store).map(announcements => toInt(announcements.activeId)).distinctUntilChanged();
}

export function announcementSelector(store: Store<any>): Observable<Announcement> {
    return announcementsSelector(store).map(announcements => build(Announcement, announcements.active || new Announcement()));
}
