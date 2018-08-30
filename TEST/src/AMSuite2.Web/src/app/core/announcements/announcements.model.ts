import { BaseEntity, Collection, build } from '@caiu/core';
import { RouterState } from '@caiu/router';
import { Store } from '@caiu/store';

import { Account } from '../../account/account.model';
import { File } from '../../document-manager/files/files.model';
import { CurrentUser } from '../../shared/models';

export class Announcements extends Collection<Announcement> {
    dashboard: number[] = [];

    constructor() {
        super(Announcement);
    }
}

export class Announcement extends BaseEntity {
    accountId = 0;
    announcementTypeId = 0;
    description = '';
    groupId = 0;
    subject = '';
    signature = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
    attachments: File[] = [];

    _announcementTypeName = '';

    get announcementTypeName(): string {
        let typeName = this._announcementTypeName;

        switch (this.announcementTypeId) {
            case 0:
                typeName = 'System Admin';
                break;
            case 1:
                typeName = 'System';
                break;
            case 2:
                typeName = 'Account';
                break;
            case 3:
                typeName = 'Group';
                break;
        }
        return typeName;
    }

    set announcementTypeName(value: string) {
        this._announcementTypeName = value;
    }

    get hasAttachments(): boolean {
        return this.attachments.length > 0;
    }
}

export class SysAdminAnnouncement extends BaseEntity {
    subject = '';
    message = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
}

export enum AnnouncementType {
    DEFAULT,
    SYSTEM_WIDE,
    ACCOUNT_ONLY,
    GROUP
}

export class AnnouncementRow {

    constructor(private _announcement: Announcement) {
    }

    get announcement(): Announcement {
        return build(Announcement, this._announcement);
    }

    get announcementId(): number {
        return this.announcement.id;
    }

    get endDate(): Date {
        return new Date(this.announcement.endDate);
    }

    get startDate(): Date {
        return new Date(this.announcement.startDate);
    }

    get subject(): string {
        return this.announcement.subject;
    }

    get type(): string {
        return this.announcement.announcementTypeName;
    }
}
