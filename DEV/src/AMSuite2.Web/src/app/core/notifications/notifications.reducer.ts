import { Action, Store } from '@caiu/store';
import { build } from '@caiu/core';

import { Notifications, Notification } from './notifications.model';
import { Observable } from '../../shared/observable';

export class NotificationsActions {
    static ADD_ACCOUNT_REQUEST = '[Notifications] Add Account Request';
    static GET = '[Notifications] Get';
}

export class NotificationActions {
    static DELETE = '[Notification] Delete';
    static PUT = '[Notification] Update';
}

export function notificationsReducer(state: Notifications = new Notifications(), action: Action): Notifications {
    switch (action.type) {

        case NotificationsActions.GET:
            return build(Notifications, state.update(<Notification[]>action.payload));

        case NotificationActions.DELETE:
            return build(Notifications, state.delete(<number>action.payload));

        case NotificationActions.PUT:
            return build(Notifications, state.update(<Notification>action.payload));

        default:
            return state;
    }
}

export function notificationsSelector(store: Store<any>): Observable<Notifications> {
    return store.select('notifications');
}

export function notificationSelector(store: Store<any>): Observable<Notification> {
    return notificationsSelector(store).map(notifications => build(Notification, notifications.active || new Notification()));
}
