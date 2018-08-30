import { NgModule } from '@angular/core';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaComponent } from './agenda.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaRoutingModule,
  ],
  declarations: [
    AgendaComponent,
  ]
})
export class AgendaModule { }
