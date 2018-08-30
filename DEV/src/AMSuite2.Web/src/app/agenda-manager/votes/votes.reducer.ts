import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Votes } from './votes.model';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class VotesActions {
    static GET = '[Votes] Get Votes';
    static POST = '[Votes] Post Vote';
    static PUT = '[Votes] Put Vote';
}

export class VoteActions {
    static GET = '[Vote] Get Vote';
    static PUT = '[Vote] Put Vote';
}

export function votesReducer(state: Votes = new Votes(), action: Action): Votes {
    switch (action.type) {

        default:
            return state;
    }
}

export function votesSelector(store: Store<any>): Observable<Votes> {
    return store.select('votes');
}
