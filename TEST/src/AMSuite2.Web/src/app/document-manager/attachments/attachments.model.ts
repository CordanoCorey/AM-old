import { BaseEntity, Collection } from '@caiu/core';

import { CurrentUser } from '../../shared/models';

export class Attachment extends BaseEntity {
    agendaItemId = 0;
    name = '';
    fileExtension = '';
    fileId = '';
    isPrivate = false;
    order = 0;
}

export class Attachments extends Collection<Attachment> {

    constructor() {
        super(Attachment);
    }
}

export class AttachmentsActions {
    static ADD = '[Attachments] Add Attachment';
    static REMOVE = '[Attachments] Remove Attachment';
}
