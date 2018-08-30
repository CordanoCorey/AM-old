import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Votes } from '../votes.model';

@Component({
  selector: 'am-votes-preview',
  templateUrl: './votes-preview.component.html',
  styleUrls: ['./votes-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotesPreviewComponent {

  @Input() votes: Votes = new Votes();

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

}
