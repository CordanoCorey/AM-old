import { Collection, Dictionary, build, Metadata, DateHelper, DateRange, QueryModel } from '@caiu/core';

import { Agenda } from '../agendas/agendas.model';
import { Meeting } from '../meeting/meeting.model';
import { Account } from '../../account/account.model';
import { Group } from '../../core/groups/groups.model';
import { CurrentUser } from '../../shared/models';

export class Meetings extends Collection<Meeting> {
    dashboard: number[] = [];

    constructor() {
        super(Meeting);
    }
}

export class MeetingsSearch extends QueryModel<Meeting> {
    private _dateRangeId = 0;
    private _dateRange: DateRange = new DateRange();
    groupId = 0;
    metadata: Metadata = {
        controls: ['dateRange'],
        ignore: [...['_dateRangeId', '_dateRange', 'today', 'month', 'year', 'query'], ...this.keys]
    };

    get dateRangeId(): number {
        return this._dateRangeId;
    }

    set dateRangeId(value: number) {
        this._dateRangeId = value;
        if (value !== 1) {
            this.setDateRange(value);
        }
    }

    get dateRange(): DateRange {
        return this._dateRange;
    }

    set dateRange(value: DateRange) {
        this._dateRange = value;
        this.dateRangeId = 1;
    }

    get query() {
        return {
            dateRange: this.dateRange,
            dateRangeId: this.dateRangeId,
            groupId: this.groupId
        };
    }

    setDateRange(dateRangeId: number) {
        this._dateRange = DateHelper.BuildDateRange(dateRangeId);
    }
}

export class MeetingRow {

    constructor(public meeting: Meeting, public accountUrl) {
    }

    get agendas(): Agenda[] {
        return this.meeting.agendas;
    }

    get group(): string {
        return this.meeting.groupName;
    }

    get location(): string {
        return this.meeting.location;
    }

    get meetingDate(): Date {
        return this.meeting.date;
    }

    get meetingId(): number {
        return this.meeting.id;
    }

    get meetingLink(): string {
        return `/${this.accountUrl}/meetings/${this.meetingId}`;
    }

    get meetingName(): string {
        return this.meeting.name;
    }

    get startTime(): Date {
        const str = this.meeting.date ? this.meeting.date.toString() : null;
        const date = str ? new Date(`${str.substring(0, str.length - 8)}${this.meeting.startTime}`) : new Date();
        return date;
    }
}
