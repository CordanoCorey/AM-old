import { Collection, build } from '@caiu/core';

import { AgendaItem } from '../agenda-items/agenda-items.model';
import { AccountMember } from '../../account/account.model';
import { Attachments } from '../../document-manager/attachments/attachments.model';
import { CurrentUser } from '../../shared/models';

export class BinItem {
    id = 0;
    accountId = 0;
    description = '';
    isSuggestion = false;
    isVotable = false;
    name = '';
    order = 0;
    parentId = 0;
    securityStatusId = 0;
    securityStatusName = '';
    userId = 0;

    attachments: Attachments = new Attachments();
    minutes: '';
    notes: '';
    options: BinItemOptions = new BinItemOptions();

    static BuildAgendaItem(binItem: BinItem, agendaId: number, order: number, options: BinItemOptions): AgendaItem {
        return build(AgendaItem, binItem, {
            agendaId,
            isVotable: options.isVotable
        });
    }

    get hasAttachments(): boolean {
        return this.attachments.empty;
    }

    get hasMinutes(): boolean {
        return this.minutes !== '';
    }

    get hasNotes(): boolean {
        return this.notes !== '';
    }

    buildAgendaItem(agendaId: number, order: number, options: BinItemOptions) {
        return BinItem.BuildAgendaItem(this, agendaId, order, options);
    }
}

export class BinItemOptions {
    alwaysPrivate = false;
    copyAttachments = false;
    copyDescription = false;
    copyMinutes = false;
    copyNotes = false;
    copySubitems = false;
    isVotable = false;
    removeAfterCopy = false;
}

export class Bin extends Collection<BinItem> {

    accountId = 0;
    agendaId = 0;
    displayOrder = 0;
    constructor() {
        super(BinItem);
        this.items[1] = build(BinItem, { id: 1, name: 'Item 1', description: 'Description for Item 1', accountId: 4 });
        this.items[2] = build(BinItem, { id: 2, name: 'Item 2', description: 'Description for Item 2', accountId: 4 });
        this.items[3] = build(BinItem, { id: 3, name: 'Item 3', description: 'Description for Item 3', accountId: 4 });
        this.items[4] = build(BinItem, { id: 4, name: 'Item 4', description: 'Description for Item 4', accountId: 1051 });
        this.items[5] = build(BinItem, { id: 5, name: 'Item 5', description: 'Description for Item 5', accountId: 11 });
        this.items[6] = build(BinItem, { id: 6, name: 'Item 6', description: 'Description for Item 6', accountId: 11 });
        this.items[7] = build(BinItem, { id: 7, name: 'Item 7', description: 'Description for Item 7', accountId: 11 });
        this.items[8] = build(BinItem, { id: 8, name: 'Item 8', description: 'Description for Item 8', accountId: 11 });
    }
    buildAgendaItem(options: BinItemOptions): AgendaItem {
        const activeItem = this.active || new BinItem();
        return activeItem.buildAgendaItem(this.agendaId, this.displayOrder, options);
    }
}
