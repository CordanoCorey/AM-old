import { NgModule } from '@angular/core';

import { AgendaItemEditRoutingModule } from './agenda-item-edit-routing.module';
import { AgendaItemEditComponent } from './agenda-item-edit.component';
import { AgendaItemFormComponent } from './agenda-item-form/agenda-item-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaItemEditRoutingModule,
  ],
  declarations: [
    AgendaItemEditComponent,
    AgendaItemFormComponent,
  ]
})
export class AgendaItemEditModule { }
