import { NgModule } from '@angular/core';
import { AgendaManagerRoutingModule } from './agenda-manager-routing.module';
import { AgendaManagerComponent } from './agenda-manager.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AgendaManagerRoutingModule
  ],
  declarations: [AgendaManagerComponent]
})
export class AgendaManagerModule { }
