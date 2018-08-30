import { Validators } from '@angular/forms';
import { build, str2int, Metadata } from '@caiu/core';

import { Agenda } from '../agendas/agendas.model';
import { CurrentUser } from '../../shared/models';

export class AgendaEdit {

    agendaDescription = '';
    agendaName = '';
    displayMinutes = false;
    isPrivate = true;
    timeframeId = 0;
    metadata: Metadata = {
        ignore: ['_agenda', 'agenda', 'id'],
        agendaName: {
            validators: [Validators.required, Validators.maxLength(150)]
        }
    };

    static Build(agenda: Agenda, props: any = {}): AgendaEdit {
        return Object.assign(new AgendaEdit(agenda), props);
    }

    static BuildAgenda(agenda: Agenda, props: any = {}): Agenda {
        return AgendaEdit.Build(agenda, props).agenda;
    }

    constructor(private _agenda: Agenda = new Agenda()) {
        this.agendaDescription = this._agenda.description;
        this.agendaName = this._agenda.name;
        this.displayMinutes = this._agenda.displayMinutes;
        this.isPrivate = this._agenda.securityStatusId === 1;
        this.timeframeId = this._agenda.timeframeId;
    }

    get agenda(): Agenda {
        return build(Agenda, this._agenda, {
            description: this.agendaDescription,
            displayMinutes: this.displayMinutes,
            name: this.agendaName,
            securityStatusId: this.isPrivate ? 1 : 4, // 1=private, 4=public
            timeframeId: typeof (this.timeframeId) === 'string' ? str2int(this.timeframeId) : this.timeframeId
        });
    }

    get id(): number {
        return this.agenda.id;
    }
}
