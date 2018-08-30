import { Collection, BaseEntity, build } from '@caiu/core';
import { Tree, TreeItem } from '@caiu/core';

import { AgendaItemMinutes } from '../minutes/minutes.model';
import { AgendaItemNotes } from '../notes/notes.model';
import { Votes } from '../votes/votes.model';
import { EmailItem } from '../../core/email/email.model';
import { Attachment } from '../../document-manager/attachments/attachments.model';
import { CurrentUser, SecurityStatus } from '../../shared/models';

export class AgendaItem extends BaseEntity {

    static get TreeItem(): TreeItem<AgendaItem> {
        return new TreeItem<AgendaItem>(new AgendaItem());
    }

    agendaId = 0;
    description = '';
    isAcceptingSuggestions = false;
    isPrivate = false;
    isSuggestion = false;
    isVotable = false;
    name = '';
    order = 0;
    parentId = 0;

    agendaItems: AgendaItem[] = [];
    attachments: Attachment[] = [];
    email: EmailItem[] = [];
    minutes: AgendaItemMinutes = new AgendaItemMinutes();
    notes: AgendaItemNotes = new AgendaItemNotes();
    // securityStatus: SecurityStatus = SecurityStatus.DEFAULT;
    votes: Votes = new Votes();

    get hasAttachments(): boolean {
        return this.attachments.length > 0;
    }

    get treeItem(): TreeItem<AgendaItem> {
        return Object.assign(AgendaItem.TreeItem, TreeItem.Build<AgendaItem>(this));
    }
}

export class AgendaItems extends Collection<AgendaItem> {

    static BuildTree(items: AgendaItem[]): Tree<AgendaItem> {
        return Tree.Build(items.map(item => build(AgendaItem, item).treeItem), AgendaItem);
    }

    constructor() {
        super(AgendaItem);
    }

    get tree(): Tree<AgendaItem> {
        return AgendaItems.BuildTree(this.toArray());
    }

    get treeItems(): TreeItem<AgendaItem>[] {
        return this.tree.treeItems;
    }
}
