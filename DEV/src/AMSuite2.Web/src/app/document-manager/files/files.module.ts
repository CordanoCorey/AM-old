import { NgModule } from '@angular/core';

import { FilesRoutingModule } from './files-routing.module';
import { FilesComponent } from './files.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    FilesRoutingModule,
  ],
  declarations: [FilesComponent]
})
export class FilesModule { }
