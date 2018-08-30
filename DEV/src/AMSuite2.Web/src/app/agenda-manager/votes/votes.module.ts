import { NgModule } from '@angular/core';

import { VotesRoutingModule } from './votes-routing.module';
import { VotesComponent } from './votes.component';
import { VoteComponent } from './vote/vote.component';
import { VoteResultsComponent } from './vote-results/vote-results.component';
import { SharedModule } from '../../shared/shared.module';
import { VotesPreviewComponent } from './votes-preview/votes-preview.component';
import { VoteCountPipe } from './vote-results/vote-count.pipe';
import { VotesFormComponent } from './votes-form/votes-form.component';
import { NotCastTextPipe } from './votes-form/not-cast-text.pipe';

@NgModule({
  imports: [
    SharedModule,
    VotesRoutingModule,
  ],
  declarations: [
    VotesComponent,
    VoteComponent,
    VoteResultsComponent,
    VotesPreviewComponent,
    VoteCountPipe,
    VotesFormComponent,
    NotCastTextPipe
  ],
  exports: [
    VotesComponent,
    VotesPreviewComponent,
  ]
})
export class VotesModule { }
