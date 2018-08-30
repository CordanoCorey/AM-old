import { Collection, Metadata, build, BaseEntity } from '@caiu/core';

import { CurrentUser } from '../../shared/models';

export class AgendaItemMinutes extends BaseEntity {
    agendaItemId = 0;
    minutes = '';
    typeId = 1;
    typeName = 'Minutes';
}

export class Minutes extends Collection<AgendaItemMinutes> {

    constructor() {
        super(AgendaItemMinutes);
    }
}

export class MinutesEdit {

    minutes = '';
    metadata: Metadata = {
        ignore: ['_minutes', 'agendaItemMinutes']
    };

    static Build(minutes: AgendaItemMinutes, props: any = {}): MinutesEdit {
        return Object.assign(new MinutesEdit(minutes), props);
    }

    static BuildMinutes(minutes: AgendaItemMinutes, props: any = {}): AgendaItemMinutes {
        return MinutesEdit.Build(minutes, props).agendaItemMinutes;
    }

    constructor(private _minutes: AgendaItemMinutes = new AgendaItemMinutes()) {
        this.minutes = this._minutes.minutes;
    }

    get agendaItemMinutes(): AgendaItemMinutes {
        return build(AgendaItemMinutes, this._minutes, {
            minutes: this.minutes
        });
    }
}
