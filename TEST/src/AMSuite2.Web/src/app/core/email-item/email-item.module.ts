import { NgModule } from '@angular/core';

import { EmailItemRoutingModule } from './email-item-routing.module';
import { EmailItemComponent } from './email-item.component';
import { EmailOptionsComponent } from './email-options/email-options.component';
import { EmailPreviewComponent } from './email-preview/email-preview.component';
import { EmailModule } from '../email/email.module';
import { PrintModule } from '../print/print.module';
import { AgendaItemsModule } from '../../agenda-manager/agenda-items/agenda-items.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EmailItemRoutingModule,
    EmailModule,
    AgendaItemsModule,
    PrintModule,
  ],
  declarations: [
    EmailItemComponent,
    EmailOptionsComponent,
    EmailPreviewComponent,
  ]
})
export class EmailItemModule { }
