import { build } from '@caiu/core';
import { Action, Store } from '@caiu/store';

import { Attendance, Attendee } from './attendance.model';
import { Observable } from '../../shared/observable';
import { currentUserSelector } from '../../shared/selectors';

export class AttendanceActions {
    static GET = '[Attendance] Get';
    static POST = '[Attendance] Post';
}

export function attendanceReducer(state: Attendance = new Attendance(), action: Action): Attendance {
    switch (action.type) {

        case AttendanceActions.GET:
            return build(Attendance, state.update(<Attendee[]>action.payload));

        case AttendanceActions.POST:
            return build(Attendance, state.update(<Attendee>action.payload));

        default:
            return state;
    }
}

export function attendanceSelector(store: Store<any>): Observable<Attendance> {
    return store.select('attendance');
}
