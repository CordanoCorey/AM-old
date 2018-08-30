import { BaseEntity, Collection, Metadata, build } from '@caiu/core';

import { CurrentUser } from '../../shared/models';


export class Attendee extends BaseEntity {
    agendaId = 0;
    agendaItemId = 0;
    isPresent = false;
    meetingId = 0;
    typeId = 0;
    userId = 0;
    writeInAttendees = '';

    userName = '';

    get datetime(): string {
        return Attendance.getDatetime(this.createdDate);
    }

    get isRollCall() {
        return this.typeId === 1;
    }

    get isWriteIn() {
        return this.writeInAttendees ? true : false;
    }

    get logStatus(): string {
        return this.id === 0 ? 'Attendees'
            : this.typeId === 1 ? this.isPresent ? 'RollCall/Present' : 'RollCall/Absent'
                : this.isPresent ? 'Joined' : 'Departed';
    }

    get logUpdate(): string {
        const date = this.createdDate.toDateString();
        return this.isRollCall ? '' : this.isWriteIn ? Attendance.getWriteInUpdate(this.writeInAttendees, date)
            : this.isPresent ? Attendance.getJoinedUpdate(this.userName, date) : Attendance.getLeftUpdate(this.userName, date);
    }
}

export class Attendance extends Collection<Attendee> {

    static getDatetime(date) {
        let hours = date.getHours();
        let minutes = `${date.getMinutes()}`;
        if (hours > 12) {
            hours = hours - 12;
        }
        if (minutes.length < 2) {
            minutes = `0${minutes}`;
        }
        return `${date.getMonth() + 1} / ${date.getDate()} / ${date.getFullYear()} @ ${hours}:${minutes}`;
    }

    static getJoinedUpdate(attendee: string, createdOn: string) {
        return `${attendee} joined at ${createdOn}.`;
    }

    static getLeftUpdate(attendee: string, createdOn: string) {
        return `${attendee} left at ${createdOn}.`;
    }

    static getWriteInUpdate(attendee: string, createdOn: string) {
        return `${attendee}.  (Write-In at ${createdOn}).`;
    }

    get attendees(): Attendee[] {
        return this.toArray();
    }

    get absent(): Attendee[] {
        return this.toArray().filter(x => !x.isPresent);
    }

    get logUpdates(): Attendee[] {
        return this.toArray().filter(x => x.logUpdate !== '');
    }

    get present(): Attendee[] {
        return this.toArray().filter(x => x.isPresent);
    }

    get writeIns(): Attendee[] {
        return this.toArray().filter(x => x.isWriteIn);
    }

    constructor() {
        super(Attendee);
    }
}

export class AttendeeEdit {

    isPresent = false;
    metadata: Metadata = {
        ignore: ['_attendee', 'attendee']
    };

    static Build(attendee: Attendee, props: any = {}): AttendeeEdit {
        return Object.assign(new AttendeeEdit(attendee), props);
    }

    static BuildAttendee(attendee: Attendee, props: any = {}): Attendee {
        return AttendeeEdit.Build(attendee, props).attendee;
    }

    constructor(private _attendee: Attendee = new Attendee()) {
        this.isPresent = this._attendee.isPresent;
    }

    get attendee(): Attendee {
        return build(Attendee, this._attendee, {
            isPresent: this.isPresent
        });
    }
}
