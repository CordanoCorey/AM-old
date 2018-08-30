import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ModelArrayControl, FormArray, FormArrayModel, getFormValue } from '@caiu/forms';

import { Votes, VoteEdit, Vote } from '../votes.model';

@Component({
  selector: 'am-votes-form',
  templateUrl: './votes-form.component.html',
  styleUrls: ['./votes-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotesFormComponent implements OnInit {

  @Input() votes: Votes = new Votes();
  @ModelArrayControl<VoteEdit>(new VoteEdit()) formArray: FormArray;
  @Output() save = new EventEmitter<Vote[]>();

  constructor() { }

  get totalAbstain(): number {
    return this.votes.totalAbstain;
  }

  get totalNay(): number {
    return this.votes.totalNay;
  }

  get totalNotCast(): number {
    return this.votes.totalNotCast;
  }

  get totalYea(): number {
    return this.votes.totalYea;
  }

  get currentValue(): Vote[] {
    return this.votes.toArray().map(vote => VoteEdit.BuildVote(vote, this.getVoteValue(vote.voteId)));
  }

  get formModel(): FormArrayModel<VoteEdit> {
    return new FormArrayModel(this.model);
  }

  get model(): VoteEdit[] {
    return this.votes.toArray().map(vote => new VoteEdit(vote));
  }

  ngOnInit() {
    this.updateFormArray();
  }

  onSubmit() {
    this.save.emit(this.currentValue);
  }

  getVoteValue(voteId: any): any {
    return this.formArray.value.find(vote => vote.voteId === voteId);
  }

  selectAllAbstain(e: any) {
    e.preventDefault();
  }

  selectAllNay(e: any) {
    e.preventDefault();
  }

  selectAllNotCast(e: any) {
    e.preventDefault();
  }

  selectAllYea(e: any) {
    e.preventDefault();
  }

  update() {
    this.updateFormArray();
  }

  updateFormArray() {
    this.formArray.resetValue(this.formModel.value);
  }

}
