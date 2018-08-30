import { Collection, BaseEntity, build } from '@caiu/core';
import { RouterState } from '@caiu/router';
import { Store } from '@caiu/store';

import { AgendaItem } from '../agenda-items/agenda-items.model';
import { Meeting } from '../meeting/meeting.model';
import { Group } from '../../core/groups/groups.model';
import { Attachment } from '../../document-manager/attachments/attachments.model';
import { CurrentUser, SecurityStatus } from '../../shared/models';

export class Agenda extends BaseEntity {
    agendaDate: Date = undefined;
    createdByName = '';
    deleted = false;
    description = '';
    displayMinutes = false;
    displayOrder = 0;
    groupId = 0;
    groupName = '';
    hasChildren = 0;
    markedForDelete: Date = null;
    meetingId = 0;
    name = '';
    rollcallTaken = false;
    securityStatusId = 0;
    timeframeId = 0;

    agendaItems: AgendaItem[] = [];
    attachments: Attachment[] = [];
    group: Group = new Group();
    meeting: Meeting = new Meeting();
    securityStatus = '';

    get accountId(): number {
        return this.meeting.accountId;
    }

    get accountName(): string {
        return this.meeting.accountName;
    }

    set accountName(value: string) {
        this.meeting.accountName = value;
    }

    get meetingDeleted(): boolean {
        return this.meeting.markedForDelete ? true : false;
    }

    get visibility(): string {
        switch (this.securityStatusId) {
            case 1:
                return 'only those with edit permissions.';
            case 2:
                return 'all group members.';
            case 3:
                return 'members of this account.';
            case 4:
                return 'the public.';
            default:
                return 'only those with edit permissions.';
        }
    }

    buildTemplate(templateName: string): Agenda {
        return build(Agenda, this, { name: templateName });
    }
}

export class AgendaAttendance {
    agendaId = 0;
    attendee = '';
    createdOn = '';
    isPresent = false;
    writeIn = '';
}

export class Agendas extends Collection<Agenda> {
    showAgenda = true;

    constructor() {
        super(Agenda);
    }
}
