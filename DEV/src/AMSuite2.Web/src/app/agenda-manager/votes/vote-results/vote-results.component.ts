import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Votes } from '../votes.model';

@Component({
  selector: 'am-vote-results',
  templateUrl: './vote-results.component.html',
  styleUrls: ['./vote-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoteResultsComponent {

  @Input() votes: Votes = new Votes();

  constructor() { }

  get totalVotes(): number {
    return this.votes.count;
  }

  get abstainCount(): number {
    return this.votes.totalAbstain;
  }

  get nayCount(): number {
    return this.votes.totalNay;
  }

  get notCastCount(): number {
    return this.votes.totalNotCast;
  }

  get yeaCount(): number {
    return this.votes.totalYea;
  }

}
