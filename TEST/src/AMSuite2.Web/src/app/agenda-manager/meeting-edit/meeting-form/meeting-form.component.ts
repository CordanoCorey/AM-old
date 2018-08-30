import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, AbstractControl } from '@angular/forms';
import { FormComponent } from '@caiu/common';
import { DateHelper, str2int, QueryModel, toInt } from '@caiu/core';
import { FormModel, ModelControl } from '@caiu/forms';
import { Lookup, LookupValue, HttpService } from '@caiu/http';
import { Subscription } from 'rxjs/Subscription';

import { MeetingEdit } from '../meeting-edit.model';
import { Meeting } from '../../meeting/meeting.model';
import { Group, GroupMember } from '../../../core/groups/groups.model';
import { Observable } from '../../../shared/observable';
import { UserSearchResult, User } from '../../../shared/models';

@Component({
  selector: 'am-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('toggle', [
      state('*', style({ left: '160px' })),
      state('show', style({ left: '160px' })),
      state('hide', style({ left: '-100%' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class MeetingFormComponent extends FormComponent implements OnInit {

  @Input() accountUrl = '';
  @Input() groups: Group[] = [];
  @Input() groupMembers: GroupMember[] = [];
  @Input() meeting: Meeting = new Meeting();
  @Input() lookupHours: LookupValue[] = [];
  @Input() lookupMinutesBy5: LookupValue[] = [];
  @Input() lookupMinutesBy15: LookupValue[] = [];
  @Output() add = new EventEmitter<Meeting>();
  @Output() changeGroup = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<Meeting>();
  @ModelControl<MeetingEdit>(new MeetingEdit()) form: FormGroup;
  activeTaker: 'attendance' | 'minute' | 'vote';
  endTime: Date;
  groupId = 0;
  hasGroup = false;
  modelKey = 'meeting';
  modelChanges = ['id', 'groupId'];
  searchResults: UserSearchResult[] = [];
  searchTerm = '';

  constructor(private http: HttpService) {
    super();
  }

  get attendanceTakerIdChanges(): Subscription {
    return this.subscribeToChanges('attendanceTakerId', id => {
      if (id) {
        const user = this.findUserById(id);
        this.setControlValue('attendanceTakerInput', user.fullName);
      }
    }, 0);
  }

  get attendanceTakerInput$(): Observable<string> {
    return this.getValueChanges('attendanceTakerInput', '');
  }

  get attendanceTakerInputChanges(): Subscription {
    return this.attendanceTakerInput$.subscribe(x => {
      this.activeTaker = 'attendance';
      this.searchTerm = x;
    });
  }

  get attendanceTakerResults(): UserSearchResult[] {
    return this.activeTaker === 'attendance' ? this.searchResults : [];
  }

  get attendanceTakerSelectChanges(): Subscription {
    return this.subscribeToChanges('attendanceTakerSelect', x => {
      this.setControlValue('attendanceTakerId', toInt(x));
    });
  }

  get autoComplete$() {
    return this.http.autoComplete('users', this.query)
      .map(response => response.results ? (<User[]>response.results).map(user => UserSearchResult.Build(user)) : []);
  }

  get durationHours$(): Observable<number> {
    return this.getValueChanges('durationHours', 0);
  }

  get durationMinutes$(): Observable<number> {
    return this.getValueChanges('durationMinutes', 0);
  }

  get endTime$(): Observable<Date> {
    return Observable.combineLatest(this.startTime$, this.durationHours$, this.durationMinutes$,
      (startTime, durationHours, durationMinutes) =>
        DateHelper.BuildEndTime(startTime, durationHours, durationMinutes));
  }

  get endTimeChanges(): Subscription {
    return this.endTime$.subscribe(endTime => {
      this.endTime = endTime;
    });
  }

  get formModel(): FormModel<MeetingEdit> {
    return new FormModel(this.model);
  }

  get formValue(): MeetingEdit {
    return this.formModel.value;
  }

  get groupIdChanges(): Subscription {
    return this.subscribeToChanges('groupId', id => {
      this.groupId = toInt(id);
      this.hasGroup = this.groupId !== 0;
      this.changeGroup.emit(this.groupId);
    });
  }

  get loadingTakers(): boolean {
    return false;
  }

  get lookupHoursNoZero(): LookupValue[] {
    return this.lookupHours.slice(1);
  }

  get meetingId(): number {
    return this.meeting.id;
  }

  get meetingName(): AbstractControl {
    return this.getControl('meetingName');
  }

  get meetingsLink(): string {
    return `/${this.accountUrl}/meetings`;
  }

  get minuteTakerIdChanges(): Subscription {
    return this.subscribeToChanges('minuteTakerId', id => {
      if (id) {
        const user = this.findUserById(id);
        this.setControlValue('minuteTakerInput', user.fullName);
      }
    }, 0);
  }

  get minuteTakerInput$(): Observable<string> {
    return this.getValueChanges('minuteTakerInput', '');
  }

  get minuteTakerInputChanges(): Subscription {
    return this.minuteTakerInput$.subscribe(x => {
      this.activeTaker = 'minute';
      this.searchTerm = x;
    });
  }

  get minuteTakerResults(): UserSearchResult[] {
    return this.activeTaker === 'minute' ? this.searchResults : [];
  }

  get minuteTakerSelectChanges(): Subscription {
    return this.subscribeToChanges('minuteTakerSelect', x => {
      this.setControlValue('minuteTakerId', toInt(x));
    });
  }

  get mode(): 'add' | 'edit' {
    return this.meetingId === 0 ? 'add' : 'edit';
  }

  get model(): MeetingEdit {
    return new MeetingEdit(this.meeting);
  }

  get modelValue(): Meeting {
    return MeetingEdit.BuildMeeting(this.meeting, this.form.value);
  }

  get query(): QueryModel<User> {
    return Object.assign(new QueryModel<User>(), {
      skip: 0,
      take: 10,
      term: this.searchTerm
    });
  }

  get searchResults$(): Observable<UserSearchResult[]> {
    return this.takerInput$.switchMap(x => this.autoComplete$);
  }

  get searchResultsChanges(): Subscription {
    return this.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }

  get meetingDate$(): Observable<Date> {
    return this.getValueChanges('meetingDate', new Date());
  }

  get startHours$(): Observable<number> {
    return this.getValueChanges('startTimeHour', 0);
  }

  get startMeridian$(): Observable<'AM' | 'PM'> {
    return this.getValueChanges('startTimeMeridian', 'AM');
  }

  get startMinutes$(): Observable<number> {
    return this.getValueChanges('startTimeMinutes', 0);
  }

  get startTime$(): Observable<Date> {
    return Observable.combineLatest(this.meetingDate$, this.startHours$, this.startMeridian$, this.startMinutes$,
      (meetingDate, startHours, startMeridian, startMinutes) =>
        DateHelper.BuildStartTime(meetingDate, startHours, startMinutes, startMeridian));
  }

  get submitText(): string {
    return this.mode === 'edit' ? 'Update Meeting' : 'Create Meeting';
  }

  get takerInput$(): Observable<string> {
    return Observable.combineLatest(this.attendanceTakerInput$, this.minuteTakerInput$, this.voteTakerInput$,
      (attendance, minute, vote) => {
        switch (this.activeTaker) {
          case 'attendance':
            return attendance;
          case 'minute':
            return minute;
          case 'vote':
            return vote;
          default:
            return '';
        }
      });
  }

  get voteTakerIdChanges(): Subscription {
    return this.subscribeToChanges('voteTakerId', id => {
      if (id) {
        const user = this.findUserById(id);
        this.setControlValue('voteTakerInput', user.fullName);
      }
    }, 0);
  }

  get voteTakerInput$(): Observable<string> {
    return this.getValueChanges('voteTakerInput', '');
  }

  get voteTakerInputChanges(): Subscription {
    return this.voteTakerInput$.subscribe(x => {
      this.activeTaker = 'vote';
      this.searchTerm = x;
    });
  }

  get voteTakerResults(): UserSearchResult[] {
    return this.activeTaker === 'vote' ? this.searchResults : [];
  }

  get voteTakerSelectChanges(): Subscription {
    return this.subscribeToChanges('voteTakerSelect', x => {
      this.setControlValue('voteTakerId', toInt(x));
    });
  }

  clearResults() {
    this.searchResults = [];
  }

  findUserById(id: number): UserSearchResult {
    return this.searchResults.find(user => user.id === id) || new UserSearchResult();
  }

  onDelete() {
    this.delete.emit(this.meetingId);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.modelValue) : this.update.emit(this.modelValue);
  }

  ngOnInit() {
    this.subscribe([
      this.endTimeChanges, this.groupIdChanges, this.searchResultsChanges,
      this.attendanceTakerIdChanges, this.attendanceTakerInputChanges, this.attendanceTakerSelectChanges,
      this.minuteTakerIdChanges, this.minuteTakerInputChanges, this.minuteTakerSelectChanges,
      this.voteTakerIdChanges, this.voteTakerInputChanges, this.voteTakerSelectChanges
    ]);
  }

  selectAttendanceTaker(user: UserSearchResult) {
    this.setControlValue('attendanceTakerId', user.id);
    this.clearResults();
  }

  selectMinuteTaker(user: UserSearchResult) {
    this.setControlValue('minuteTakerId', user.id);
    this.clearResults();
  }

  selectVoteTaker(user: UserSearchResult) {
    this.setControlValue('voteTakerId', user.id);
    this.clearResults();
  }

}
