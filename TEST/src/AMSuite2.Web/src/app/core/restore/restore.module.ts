import { NgModule } from '@angular/core';

import { RestoreRoutingModule } from './restore-routing.module';
import { RestoreComponent } from './restore.component';
import { RestoreDialogComponent } from './restore-dialog/restore-dialog.component';
import { RestoreGridComponent } from './restore-grid/restore-grid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RestoreRoutingModule,
  ],
  declarations: [
    RestoreComponent,
    RestoreDialogComponent,
    RestoreGridComponent
  ],
  entryComponents: [
    RestoreDialogComponent,
  ]
})
export class RestoreModule { }
