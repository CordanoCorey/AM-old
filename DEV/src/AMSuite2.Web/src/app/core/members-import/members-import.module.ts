import { NgModule } from '@angular/core';

import { MembersImportRoutingModule } from './members-import-routing.module';
import { MembersImportComponent } from './members-import.component';
import { MembersImportFormComponent } from './members-import-form/members-import-form.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MembersImportRoutingModule,
  ],
  declarations: [
    MembersImportComponent,
    MembersImportFormComponent,
  ]
})
export class MembersImportModule { }
