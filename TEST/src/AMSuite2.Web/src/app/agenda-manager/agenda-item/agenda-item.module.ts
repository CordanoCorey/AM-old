import { NgModule } from '@angular/core';

import { AgendaItemRoutingModule } from './agenda-item-routing.module';
import { AgendaItemComponent } from './agenda-item.component';
import { NotesModule } from '../notes/notes.module';
import { VotesModule } from '../votes/votes.module';
import { AttachmentsModule } from '../../document-manager/attachments/attachments.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaItemRoutingModule,
    VotesModule,
    AttachmentsModule,
    NotesModule,
  ],
  declarations: [
    AgendaItemComponent,
  ]
})
export class AgendaItemModule { }
