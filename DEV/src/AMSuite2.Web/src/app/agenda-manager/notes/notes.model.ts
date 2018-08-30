import { Collection, Metadata, build, BaseEntity } from '@caiu/core';

import { CurrentUser } from '../../shared/models';

export class AgendaItemNotes extends BaseEntity {
    agendaItemId = 0;
    notes = '';
    typeId = 1;
    typeName = 'Notes';
}

export class Notes extends Collection<AgendaItemNotes> {

    constructor() {
        super(AgendaItemNotes);
    }
}

export class NotesEdit {

    notes = '';
    metadata: Metadata = {
        ignore: ['_notes', 'agendaItemNotes']
    };

    static Build(notes: AgendaItemNotes, props: any = {}): NotesEdit {
        return Object.assign(new NotesEdit(notes), props);
    }

    static BuildNotes(notes: AgendaItemNotes, props: any = {}): AgendaItemNotes {
        return NotesEdit.Build(notes, props).agendaItemNotes;
    }

    constructor(private _notes: AgendaItemNotes = new AgendaItemNotes()) {
        this.notes = this._notes.notes;
    }

    get agendaItemNotes(): AgendaItemNotes {
        return build(AgendaItemNotes, this._notes, {
            notes: this.notes
        });
    }
}
