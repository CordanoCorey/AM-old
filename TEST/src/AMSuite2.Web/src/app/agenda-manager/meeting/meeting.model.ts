import { BaseEntity, inArray, DateHelper } from '@caiu/core';
import { RouterState } from '@caiu/router';

import { AgendaItem } from '../agenda-items/agenda-items.model';
import { Agenda } from '../agendas/agendas.model';
import { Account } from '../../account/account.model';
import { EmailItem } from '../../core/email/email.model';
import { GroupMember, Group } from '../../core/groups/groups.model';
import { SecurityStatus } from '../../shared/models';

export class Meeting extends BaseEntity {
    accountId = 0;
    attendanceTakerId = 0;
    comments = '';
    conferenceId = 0;
    date: Date = new Date();
    endTime: Date = new Date();
    groupId = 0;
    location = '';
    markedForDelete: Date = new Date();
    minuteTakerId = 0;
    name = '';
    startTime: Date = new Date();
    securityStatusId = 0;
    typeId = 0;
    voteTakerId = 0;

    account: Account = new Account();
    agendas: Agenda[] = [];
    durationHour = 0;
    durationMinutes = 0;
    email: EmailItem[] = [];
    generalInfo = '';
    groupMembers: GroupMember[] = [];
    groupName = '';
    groups: Group[] = [];
    securityStatusName = '';
    startHour = 0;
    startMinutes = 0;
    startMeridian: 'AM' | 'PM' = 'AM';

    get accountName(): string {
        return this.account.name;
    }

    set accountName(value: string) {
        if (this.account) {
            this.account.name = value;
        }
    }
}
