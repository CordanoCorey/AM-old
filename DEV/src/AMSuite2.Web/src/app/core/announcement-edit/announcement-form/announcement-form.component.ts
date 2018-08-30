import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { str2int, hasChanged } from '@caiu/core';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';
import { Subscription } from 'rxjs/Subscription';

import { AnnouncementEdit } from '../announcement-edit.model';
import { Announcement } from '../../announcements/announcements.model';
import { Group } from '../../groups/groups.model';
import { Observable } from '../../../shared/observable';

@Component({
  selector: 'am-announcement-form',
  templateUrl: './announcement-form.component.html',
  styleUrls: ['./announcement-form.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.Emulated,
  animations: [
    trigger('toggle', [
      state('show', style({ height: '*' })),
      state('hide', style({ height: '0px' })),
      transition('show <=> hide', [
        animate('500ms ease-out')
      ])
    ])
  ]
})
export class AnnouncementFormComponent extends FormComponent implements OnInit {

  @Input() announcement: Announcement = new Announcement();
  @Input() groups: Group[] = [];
  @Input() cancelLink = '/';
  @Output() add = new EventEmitter<Announcement>();
  @Output() preview = new EventEmitter<Announcement>();
  @Output() update = new EventEmitter<Announcement>();
  @ModelControl<AnnouncementEdit>(new AnnouncementEdit()) form: FormGroup;
  announcementTypeId$: Observable<number>;
  groupId$: Observable<number>;
  modelKey = 'announcement';
  modelChanges = ['id', 'subject', 'description'];
  toggle = 'show';

  constructor() {
    super();
    this.announcementTypeId$ = this.form.controls['announcementTypeId'].valueChanges.map(x => str2int(x));
    this.groupId$ = this.form.controls['groupId'] ? this.form.controls['groupId'].valueChanges : Observable.of(0);
  }

  get announcementId(): number {
    return this.announcement.id;
  }

  get announcementTypeIdChanges(): Subscription {
    return this.announcementTypeId$.subscribe(typeId => {
      this.toggle = typeId === 0 ? 'hide' : 'show';
    });
  }

  get formModel(): FormModel<AnnouncementEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): AnnouncementEdit {
    return this.formModel.value;
  }

  get model(): AnnouncementEdit {
    return new AnnouncementEdit(this.announcement);
  }

  get valueOut(): Announcement {
    return AnnouncementEdit.BuildAnnouncement(this.announcement, this.form.value);
  }

  get showAttachments(): boolean {
    return true;
  }

  get showDefaultSignature(): boolean {
    return true;
  }

  ngOnInit() {
    this.subscribe([this.announcementTypeIdChanges]);
  }

  onPreview() {
    this.preview.emit(this.valueOut);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
