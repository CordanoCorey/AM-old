import { NgModule } from '@angular/core';

import { BinRoutingModule } from './bin-routing.module';
import { BinComponent } from './bin.component';
import { BinAccountsComponent } from './bin-accounts/bin-accounts.component';
import { BinEmptyComponent } from './bin-empty/bin-empty.component';
import { BinItemComponent } from './bin-item/bin-item.component';
import { BinItemsDropdownComponent } from './bin-items-dropdown/bin-items-dropdown.component';
import { BinItemOptionsComponent } from './bin-item-options/bin-item-options.component';
import { BinItemPreviewComponent } from './bin-item-preview/bin-item-preview.component';
import { BinItemsComponent } from './bin-items/bin-items.component';
import { MinutesModule } from '../minutes/minutes.module';
import { NotesModule } from '../notes/notes.module';
import { AttachmentsModule } from '../../document-manager/attachments/attachments.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BinRoutingModule,
    AttachmentsModule,
    MinutesModule,
    NotesModule,
  ],
  declarations: [
    BinComponent,
    BinItemsComponent,
    BinItemComponent,
    BinAccountsComponent,
    BinItemOptionsComponent,
    BinItemPreviewComponent,
    BinItemsDropdownComponent,
    BinEmptyComponent,
  ],
  exports: [BinComponent],
  entryComponents: [BinComponent]
})
export class BinModule { }
