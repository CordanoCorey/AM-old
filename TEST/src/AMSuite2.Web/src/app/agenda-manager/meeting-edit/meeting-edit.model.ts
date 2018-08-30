import { Metadata, build, DateHelper } from '@caiu/core';

import { Meeting } from '../meeting/meeting.model';
import { Validators } from '@angular/forms';

export class MeetingEdit {

    meetingName = '';
    meetingDate: Date = new Date();
    startTimeHour = 0;
    startTimeMinutes = 0;
    startTimeMeridian: 'AM' | 'PM' = 'AM';
    durationHours = 0;
    durationMinutes = 0;
    meetingLocation = '';
    groupId = 0;
    minuteTakerId = 0;
    minuteTakerInput = '';
    minuteTakerSelect = 0;
    attendanceTakerId = 0;
    attendanceTakerInput = '';
    attendanceTakerSelect = 0;
    voteTakerId = 0;
    voteTakerInput = '';
    voteTakerSelect = 0;
    securityStatusId = 0;
    generalInfo = '';
    metadata: Metadata = {
        ignore: ['_meeting', 'id', 'meeting', 'startTime', 'endTime'],
        meetingDate: {
            validators: [Validators.required]
        },
        meetingName: {
            validators: [Validators.required, Validators.maxLength(75)]
        },
        startTimeHour: {
            validators: [Validators.required]
        },
        startTimeMinutes: {
            validators: [Validators.required]
        }
    };

    static Build(meeting: Meeting, props: any = {}): MeetingEdit {
        return Object.assign(new MeetingEdit(meeting), props);
    }

    static BuildMeeting(meeting: Meeting, props: any = {}): Meeting {
        return MeetingEdit.Build(meeting, props).meeting;
    }

    constructor(private _meeting: Meeting = new Meeting()) {
        this.meetingName = this._meeting.name;
        this.meetingDate = new Date(this._meeting.date);
        this.startTimeHour = this._meeting.startHour || 8;
        this.startTimeMinutes = this._meeting.startMinutes;
        this.startTimeMeridian = this._meeting.startMeridian;
        this.durationHours = this._meeting.durationHour || 1;
        this.durationMinutes = this._meeting.durationMinutes;
        this.meetingLocation = this._meeting.location;
        this.groupId = this._meeting.groupId;
        this.minuteTakerId = this._meeting.minuteTakerId;
        this.attendanceTakerId = this._meeting.attendanceTakerId;
        this.voteTakerId = this._meeting.voteTakerId;
        this.securityStatusId = this._meeting.securityStatusId;
        this.generalInfo = this._meeting.generalInfo;
    }

    get meeting(): Meeting {
        return build(Meeting, this._meeting, {
            name: this.meetingName,
            date: this.meetingDate,
            startTime: this.startTime,
            endTime: this.endTime,
            location: this.meetingLocation,
            groupId: this.groupId,
            minuteTakerId: this.minuteTakerId,
            attendanceTakerId: this.attendanceTakerId,
            voteTakerId: this.voteTakerId,
            securityStatusId: this.securityStatusId,
            generalInfo: this.generalInfo
        });
    }

    get id(): number {
        return this.meeting.id;
    }

    get startTime(): Date {
        return DateHelper.BuildStartTime(this.meetingDate, this.startTimeHour, this.startTimeMinutes, this.startTimeMeridian);
    }

    get endTime(): Date {
        return DateHelper.BuildEndTime(this.startTime, this.durationHours, this.durationMinutes);
    }
}
