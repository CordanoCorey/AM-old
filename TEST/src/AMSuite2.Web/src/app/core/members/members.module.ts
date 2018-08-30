import { NgModule } from '@angular/core';

import { MembersRoutingModule } from './members-routing.module';
import { MembersComponent } from './members.component';
import { AboutMembersComponent } from './about-members/about-members.component';
import { SharedModule } from '../../shared/shared.module';
import { MembersGridComponent } from './members-grid/members-grid.component';

@NgModule({
  imports: [
    SharedModule,
    MembersRoutingModule,
  ],
  declarations: [
    MembersComponent,
    AboutMembersComponent,
    MembersGridComponent,
  ],
  exports: [
    AboutMembersComponent,
  ]
})
export class MembersModule { }
