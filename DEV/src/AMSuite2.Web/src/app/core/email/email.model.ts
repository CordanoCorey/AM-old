import { Collection, BaseEntity, Metadata, build } from '@caiu/core';

import { AgendaItem } from '../../agenda-manager/agenda-items/agenda-items.model';
import { Attachment } from '../../document-manager/attachments/attachments.model';
import { CurrentUser } from '../../shared/models';

export class EmailItem extends BaseEntity {
    to = '';
    from = '';
    cc = '';
    bcc = '';
    subject = '';
    body = '';
    previewHtml = '';
    addAttachments = false;
    convertAttachments = false;

    agendaItem: AgendaItem = new AgendaItem();
    attachements: Attachment[] = [];

    get agendaItemName(): string {
        return this.agendaItem.name;
    }
}

export class Email extends Collection<EmailItem> {

    constructor() {
        super(EmailItem);
    }
}

export class EmailEdit {

    to: string | string[] = [];
    from = '';
    cc = '';
    bcc = '';
    subject = '';
    body = '';
    agendaItemName = '';
    previewHtml = '';
    addAttachments = false;
    convertAttachments = false;
    metadata: Metadata = {
        ignore: ['_emailItem', 'emailItem']
    };

    static Build(emailItem: EmailItem, props: any = {}): EmailEdit {
        return Object.assign(new EmailEdit(emailItem), props);
    }

    static BuildEmail(emailItem: EmailItem, props: any = {}): EmailItem {
        return EmailEdit.Build(emailItem, props).emailItem;
    }

    constructor(private _emailItem: EmailItem = new EmailItem()) {
        this.to = this._emailItem.to;
        this.from = this._emailItem.from;
        this.cc = this._emailItem.cc;
        this.bcc = this._emailItem.bcc;
        this.subject = this._emailItem.subject;
        this.body = this._emailItem.body;
    }

    get emailItem(): EmailItem {
        return build(EmailItem, this._emailItem, {
            to: this.to,
            from: this.from,
            cc: this.cc,
            bcc: this.bcc,
            subject: this.subject,
            body: this.body
        });
    }
}
