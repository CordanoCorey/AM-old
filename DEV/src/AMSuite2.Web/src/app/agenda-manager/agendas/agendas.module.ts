import { NgModule } from '@angular/core';

import { AgendasRoutingModule } from './agendas-routing.module';
import { AgendasComponent } from './agendas.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendasRoutingModule,
  ],
  declarations: [
    AgendasComponent,
  ]
})
export class AgendasModule { }
