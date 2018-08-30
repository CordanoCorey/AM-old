import { build } from '@caiu/core';

import { Account } from '../../account/account.model';
import { Agenda } from '../../agenda-manager/agendas/agendas.model';
import { Meeting } from '../../agenda-manager/meeting/meeting.model';
import { Meetings } from '../../agenda-manager/meetings/meetings.model';

export class RestoreRow {

    constructor(private _agenda: Agenda, private _accountName = '') {
    }

    get agenda(): Agenda {
        return build(Agenda, this._agenda);
    }

    get accountName(): string {
        return this.agenda.meeting.account ? this.agenda.meeting.account.name : this._accountName;
    }

    get meeting(): Meeting {
        return this.agenda.meeting;
    }

    get meetingDeleted(): boolean {
        return this.meeting.markedForDelete ? true : false;
    }

    get meetingName(): string {
        return this.meeting.name;
    }

    get agendaName(): string {
        return this.agenda.name;
    }

    get groupName(): string {
        return this.agenda.groupName;
    }

    get deletedOn(): Date {
        return this.meetingDeleted ? this.meeting.markedForDelete : this.agenda.markedForDelete;
    }
}
