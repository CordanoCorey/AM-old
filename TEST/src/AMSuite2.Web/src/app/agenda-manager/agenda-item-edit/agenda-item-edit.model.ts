import { build, Metadata } from '@caiu/core';

import { CurrentUser } from '../../shared/models';
import { AgendaItem } from '../agenda-items/agenda-items.model';

export class AgendaItemEdit {

    attachments = [];
    rejectReason = '';
    metadata: Metadata = {
        ignore: ['_agendaItem', 'agendaItem']
    };

    static Build(agendaItem: AgendaItem, props: any = {}): AgendaItemEdit {
        return Object.assign(new AgendaItemEdit(agendaItem), props);
    }

    static BuildAgendaItem(agendaItem: AgendaItem, props: any = {}): AgendaItem {
        return AgendaItemEdit.Build(agendaItem, props).agendaItem;
    }

    constructor(private _agendaItem: AgendaItem = new AgendaItem()) {
    }

    get agendaItem(): AgendaItem {
        return build(AgendaItem, this._agendaItem, {
            name: this.agendaItemName,
            description: this.description,
            isPrivate: this.isPrivate,
            isVotable: this.isVotable
        });
    }

    get agendaItemName(): string {
        return this._agendaItem.name;
    }

    get description(): string {
        return this._agendaItem.description;
    }

    get isPrivate(): boolean {
        return this._agendaItem.isPrivate;
    }

    get isVotable(): boolean {
        return this._agendaItem.isVotable;
    }
}
