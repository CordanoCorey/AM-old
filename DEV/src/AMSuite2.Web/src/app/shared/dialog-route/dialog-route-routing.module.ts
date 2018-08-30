import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DialogRouteComponent } from './dialog-route.component';
import { AnnouncementRoute } from '../../core/announcement/announcement-routing.module';
import { EmailItemRoute } from '../../core/email-item/email-item-routing.module';
import { PrintRoute } from '../../core/print/print-routing.module';
import { BinRoute } from '../../agenda-manager/bin/bin-routing.module';
import { MinutesRoute } from '../../agenda-manager/minutes/minutes-routing.module';
import { TemplateManagerRoute, TemplateDialogResolver } from '../../agenda-manager/templates/templates-routing.module';

const routes: Routes = [
  AnnouncementRoute, // announcement
  BinRoute, // bin
  EmailItemRoute, // email
  MinutesRoute, // minutes
  PrintRoute, // print
  TemplateManagerRoute, // templates
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    TemplateDialogResolver,
  ]
})
export class DialogRouteRoutingModule { }
