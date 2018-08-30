import { NgModule } from '@angular/core';

import { AgendaEditRoutingModule } from './agenda-edit-routing.module';
import { AgendaEditComponent } from './agenda-edit.component';
import { AgendaFormComponent } from './agenda-form/agenda-form.component';
import { AboutAgendasComponent } from './about-agendas/about-agendas.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaEditRoutingModule,
  ],
  declarations: [
    AgendaEditComponent,
    AboutAgendasComponent,
    AgendaFormComponent,
  ],
})
export class AgendaEditModule { }
