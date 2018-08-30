import { NgModule } from '@angular/core';

import { AgendaActionsComponent } from './agenda-actions.component';
import { AgendaTreeviewComponent } from './agenda-treeview.component';
import { AgendaTreeItemComponent } from './agenda-tree-item.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [
    AgendaTreeviewComponent,
    AgendaTreeItemComponent,
    AgendaActionsComponent,
  ],
  exports: [
    AgendaTreeviewComponent,
  ]
})
export class AgendaTreeviewModule { }
