import { Component, OnInit } from '@angular/core';
import { HttpActions } from '@caiu/http';
import { SmartComponent, Store } from '@caiu/store';

import { Vote, Votes } from './votes.model';
import { votesSelector, VotesActions, VoteActions } from './votes.reducer';
import { CurrentUser } from '../../shared/models';
import { Observable } from '../../shared/observable';

@Component({
  selector: 'am-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.scss']
})
export class VotesComponent extends SmartComponent implements OnInit {

  constructor(public store: Store<any>) {
    super(store);
  }

  get showVote$(): Observable<boolean> {
    return Observable.of(true);
  }

  get showVoteResults$(): Observable<boolean> {
    return Observable.of(true);
  }

  get votes$(): Observable<Votes> {
    return votesSelector(this.store);
  }

  get vote$(): Observable<Vote> {
    // return this.votes$.map(votes => votes.active || new Vote());
    return Observable.of(new Vote());
  }

  ngOnInit() {
  }

  addVote(vote: Vote) {
    this.dispatch(HttpActions.post(`agendaitems/${vote.agendaItemId}/votes`, vote, VotesActions.POST));
  }

  saveVotes(agendaItemId: number, votes: Vote[]) {
    this.dispatch(HttpActions.put(`agendaitems/${agendaItemId}/votes`, votes, VotesActions.PUT));
  }

  updateVote(vote: Vote) {
    this.dispatch(HttpActions.put(`votes/${vote.id}`, vote, VoteActions.PUT));
  }

}
