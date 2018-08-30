import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponent, FormModel, ModelControl } from '@caiu/forms';

import { Vote, VoteEdit } from '../votes.model';

@Component({
  selector: 'am-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteComponent extends FormComponent {

  @Input() showResults = false;
  @Input() vote: Vote = new Vote();
  @Output() add: EventEmitter<Vote> = new EventEmitter<Vote>();
  @Output() update: EventEmitter<Vote> = new EventEmitter<Vote>();
  @ModelControl<VoteEdit>(new VoteEdit()) form: FormGroup;
  modelKey = 'vote';
  modelChanges = [];

  constructor() {
    super();
  }

  get formModel(): FormModel<VoteEdit> {
    return new FormModel(this.model);
  }

  get valueIn(): VoteEdit {
    return this.formModel.value;
  }

  get heading() {
    return this.formModel.isAdd ? `You haven't voted yet!` : `Change vote`;
  }

  get model(): VoteEdit {
    return new VoteEdit(this.vote);
  }

  get valueOut(): Vote {
    return VoteEdit.BuildVote(this.vote, this.form.value);
  }

  get voteId(): number {
    return this.vote.id;
  }

  onSubmit(e: any) {
    this.formModel.isAdd ? this.add.emit(this.valueOut) : this.update.emit(this.valueOut);
  }

}
