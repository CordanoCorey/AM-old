import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@caiu/common';

import { DialogRouteRoutingModule } from './dialog-route-routing.module';
import { DialogRouteComponent } from './dialog-route.component';

@NgModule({
  imports: [
    CommonModule,
    DialogRouteRoutingModule,
    DialogModule,
  ],
  declarations: [DialogRouteComponent],
  entryComponents: [DialogRouteComponent]
})
export class DialogRouteModule { }
