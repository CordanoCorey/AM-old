import { build, Metadata, DateRange } from '@caiu/core';
import { FileUpload } from '@caiu/common';

import { Announcement } from '../announcements/announcements.model';
import { Group } from '../groups/groups.model';
import { mapFileUpload } from '../../document-manager/files/files.model';

export class AnnouncementEdit {

    announcementTypeId = 0;
    description = '';
    groupId = 0;
    subject = '';
    signature = '';
    dateRange: DateRange = new DateRange();
    attachments: FileUpload[] = [];
    metadata: Metadata = {
        ignore: ['_announcement', 'announcement'],
        controls: ['dateRange']
    };

    static Build(announcement: Announcement, props: any = {}): AnnouncementEdit {
        return Object.assign(new AnnouncementEdit(announcement), props);
    }

    static BuildAnnouncement(announcement: Announcement, props: any = {}): Announcement {
        return AnnouncementEdit.Build(announcement, props).announcement;
    }

    constructor(private _announcement: Announcement = new Announcement) {
        this.announcementTypeId = this._announcement.announcementTypeId;
        this.description = this._announcement.description;
        this.groupId = this._announcement.groupId;
        this.subject = this._announcement.subject;
        this.signature = this._announcement.signature;
        this.dateRange.startDate = this._announcement.startDate;
        this.dateRange.endDate = this._announcement.endDate;
    }

    get announcement(): Announcement {
        return build(Announcement, this._announcement, {
            announcementTypeId: this.announcementTypeId,
            attachments: this.attachments.map(upload => {
                const file = this._announcement.attachments ?
                    this._announcement.attachments.find(f => f.fileName === upload.name) : null;
                return mapFileUpload(upload, file);
            }),
            description: this.description,
            groupId: this.groupId,
            subject: this.subject,
            signature: this.signature,
            startDate: this.dateRange.startDate,
            endDate: this.dateRange.endDate
        });
    }
}
