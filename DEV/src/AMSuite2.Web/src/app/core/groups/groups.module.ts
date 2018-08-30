import { NgModule } from '@angular/core';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { AboutGroupsComponent } from './about-groups/about-groups.component';
import { GroupsGridComponent } from './groups-grid/groups-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    GroupsRoutingModule,
  ],
  declarations: [
    GroupsComponent,
    GroupsGridComponent,
    AboutGroupsComponent,
  ],
  exports: [
    AboutGroupsComponent,
  ]
})
export class GroupsModule { }
