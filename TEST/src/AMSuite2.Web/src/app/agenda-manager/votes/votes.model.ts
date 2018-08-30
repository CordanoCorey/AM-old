import { Collection, Metadata, build, BaseEntity, str2int } from '@caiu/core';

import { CurrentUser } from '../../shared/models';

export class Vote extends BaseEntity {
    agendaItemId = 0;
    answer = '';
    answerId = 0;
    fullName = '';
    voterId = 0;
    voterIsAbsent = false;
    voterLastName = '';

    get voteId(): string {
        return `${this.agendaItemId}_${this.voterId}`;
    }
}

export class Votes extends Collection<Vote> {

    constructor() {
        super(Vote);
        this.items = {
            1: build(Vote, { agendaItemId: 1234, voterId: 1, fullName: 'Voter 1', answerId: 1, voterIsAbsent: false }),
            2: build(Vote, { agendaItemId: 1234, voterId: 2, fullName: 'Voter 2', answerId: 1, voterIsAbsent: false }),
            3: build(Vote, { agendaItemId: 1234, voterId: 3, fullName: 'Voter 3', answerId: 1, voterIsAbsent: false }),
            4: build(Vote, { agendaItemId: 1234, voterId: 4, fullName: 'Voter 4', answerId: 1, voterIsAbsent: false }),
            5: build(Vote, { agendaItemId: 1234, voterId: 5, fullName: 'Voter 5', answerId: 1, voterIsAbsent: false }),
            6: build(Vote, { agendaItemId: 1234, voterId: 6, fullName: 'Voter 6', answerId: 1, voterIsAbsent: false }),
            7: build(Vote, { agendaItemId: 1234, voterId: 7, fullName: 'Voter 7', answerId: 1, voterIsAbsent: false }),
            8: build(Vote, { agendaItemId: 1234, voterId: 8, fullName: 'Voter 8', answerId: 1, voterIsAbsent: false }),
            9: build(Vote, { agendaItemId: 1234, voterId: 9, fullName: 'Voter 9', answerId: 1, voterIsAbsent: false }),
            10: build(Vote, { agendaItemId: 1234, voterId: 10, fullName: 'Voter 10', answerId: 2, voterIsAbsent: false }),
            11: build(Vote, { agendaItemId: 1234, voterId: 11, fullName: 'Voter 11', answerId: 2, voterIsAbsent: false }),
            12: build(Vote, { agendaItemId: 1234, voterId: 12, fullName: 'Voter 12', answerId: 2, voterIsAbsent: false }),
            13: build(Vote, { agendaItemId: 1234, voterId: 13, fullName: 'Voter 13', answerId: 2, voterIsAbsent: false }),
            14: build(Vote, { agendaItemId: 1234, voterId: 14, fullName: 'Voter 14', answerId: 2, voterIsAbsent: false }),
            15: build(Vote, { agendaItemId: 1234, voterId: 15, fullName: 'Voter 15', answerId: 2, voterIsAbsent: false }),
            16: build(Vote, { agendaItemId: 1234, voterId: 16, fullName: 'Voter 16', answerId: 3, voterIsAbsent: false }),
            17: build(Vote, { agendaItemId: 1234, voterId: 17, fullName: 'Voter 17', answerId: 3, voterIsAbsent: false }),
            18: build(Vote, { agendaItemId: 1234, voterId: 18, fullName: 'Voter 18', answerId: 3, voterIsAbsent: false }),
            19: build(Vote, { agendaItemId: 1234, voterId: 19, fullName: 'Voter 19', answerId: 4, voterIsAbsent: false }),
            20: build(Vote, { agendaItemId: 1234, voterId: 20, fullName: 'Voter 20', answerId: 4, voterIsAbsent: true }),
        };
    }

    get totalVotes(): number {
        return this.count;
    }

    get totalAbstain(): number {
        return this.toArray()
            .filter(vote => vote.answerId === 3).length;
    }

    get totalNay(): number {
        return this.toArray()
            .filter(vote => vote.answerId === 2).length;
    }

    get totalNotCast(): number {
        return this.toArray()
            .filter(vote => vote.answerId === 4).length;
    }

    get totalYea(): number {
        return this.toArray()
            .filter(vote => vote.answerId === 1).length;
    }
}

export class VoteEdit {

    voteAnswerId = 0;
    metadata: Metadata = {
        ignore: ['_vote', 'vote']
        // readonly: ['voterId', 'voterIsAbsent', 'voterName']
    };

    static Build(vote: Vote, props: any = {}): VoteEdit {
        return Object.assign(new VoteEdit(vote), props);
    }

    static BuildVote(vote: Vote, props: any = {}): Vote {
        return VoteEdit.Build(vote, { voteAnswerId: props['voteAnswerId'] }).vote;
    }

    constructor(private _vote: Vote = new Vote()) {
        this.voteAnswerId = this._vote.answerId;
    }

    get vote(): Vote {
        return build(Vote, this._vote, {
            answerId: str2int(this.voteAnswerId.toString())
        });
    }

    get voteId(): any {
        return this._vote.voteId;
    }

    get voterId(): number {
        return this._vote.voterId;
    }

    get voterIsAbsent(): boolean {
        return this._vote.voterIsAbsent;
    }

    get voterName(): string {
        return this._vote.fullName;
    }
}
