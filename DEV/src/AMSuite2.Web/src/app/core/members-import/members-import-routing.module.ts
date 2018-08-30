import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';

import { MembersImportComponent } from './members-import.component';

export const MembersImportRoute: Route = {
  path: '',
  component: MembersImportComponent,
  data: { routeName: 'members-import', routeLabel: 'Import Members' }
};

const routes: Routes = [MembersImportRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MembersImportRoutingModule { }
