import { NgModule } from '@angular/core';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComponent } from './email.component';
import { EmailFormComponent } from './email-form/email-form.component';
import { EmailRecipientComponent } from './email-recipient/email-recipient.component';
import { EmailRecipientsComponent } from './email-recipients/email-recipients.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    EmailRoutingModule,
  ],
  declarations: [
    EmailComponent,
    EmailFormComponent,
    EmailRecipientsComponent,
    EmailRecipientComponent,
  ],
  exports: [
    EmailComponent,
    EmailFormComponent,
  ]
})
export class EmailModule { }
