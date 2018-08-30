import { Dictionary, build } from '@caiu/core';
import { Events, Event } from '@caiu/events';
import { RouterState } from '@caiu/router';
import { Store } from '@caiu/store';

import { CurrentUser, Users, User, DisplayMode } from './models';
import { Observable } from './observable';

export function eventsSelector(store: Store<any>): Observable<Dictionary<Event>> {
    return store.select(s => s['events']).map((events: Events) => events.items).distinctUntilChanged();
}

export function routeSelector(store: Store<any>): Observable<RouterState> {
    return store.select('route');
}

export function activatedRouteSelector(store: Store<any>): Observable<string> {
    return routeSelector(store).map(router => router.activatedRouteName).distinctUntilChanged();
}

export function authenticatedSelector(store: Store<any>): Observable<boolean> {
    return currentUserSelector(store).map(user => user.authenticated).take(1);
}

export function hasAccountSelector(store: Store<any>): Observable<boolean> {
    return currentUserSelector(store).map(user => user.hasAccount).take(1);
}

export function usersSelector(store: Store<any>): Observable<Users> {
    return store.select('users');
}

export function currentUserSelector(store: Store<any>): Observable<CurrentUser & User> {
    const currentUser$: Observable<CurrentUser> = store.select(x => (<CurrentUser>x['currentUser']));
    const users$ = usersSelector(store);

    return currentUser$.withLatestFrom(users$, (cu: CurrentUser, users: Users) => {
        const activeUser = cu.impersonating ? cu.impersonating : cu;
        const user = users.items[activeUser.id];
        return build(CurrentUser, cu, user);
    });
}

export function currentUserIdSelector(store: Store<any>): Observable<number> {
    return currentUserSelector(store).map(user => user.id).distinctUntilChanged();
}

export function userSelector(store: Store<any>): Observable<User> {
    return usersSelector(store).map(users => users.active || new User())
        .distinctUntilChanged();
}

export function userIdSelector(store: Store<any>, id: number): Observable<User> {
    return usersSelector(store).map(users => users.items[id] || new User())
        .distinctUntilChanged();
}

export function displayModeSelector(store: Store<any>, id: number): Observable<DisplayMode> {
    return currentUserSelector(store).map(user => user.displayMode).distinctUntilChanged();
}