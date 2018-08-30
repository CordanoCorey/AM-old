import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup } from '@angular/forms';
import { FormComponent } from '@caiu/common';
import { str2int, hasChanged } from '@caiu/core';
import { FormModel, ModelControl } from '@caiu/forms';
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
  modelKey = 'announcement';
  modelChanges = ['id', 'subject', 'description'];
  toggle = 'show';

  constructor() {
    super();
  }

  get announcementId(): number {
    return this.announcement.id;
  }

  get announcementTypeId$(): Observable<number> {
    return this.form.controls['announcementTypeId'].valueChanges
      .map(x => str2int(x));
  }

  get announcementTypeIdChanges(): Subscription {
    return this.announcementTypeId$.subscribe(typeId => {
      this.toggle = typeId === 0 ? 'hide' : 'show';
    });
  }

  get formModel(): FormModel<AnnouncementEdit> {
    return new FormModel(this.model);
  }

  get formValue(): AnnouncementEdit {
    return this.formModel.value;
  }

  get groupId$(): Observable<number> {
    return this.form.controls['groupId'] ? this.form.controls['groupId'].valueChanges : Observable.of(0);
  }

  get model(): AnnouncementEdit {
    return new AnnouncementEdit(this.announcement);
  }

  get modelValue(): Announcement {
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
    this.preview.emit(this.modelValue);
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.modelValue) : this.update.emit(this.modelValue);
  }

}
