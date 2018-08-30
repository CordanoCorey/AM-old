import { NgModule } from '@angular/core';

import { MinutesRoutingModule } from './minutes-routing.module';
import { MinutesComponent } from './minutes.component';
import { MinutesFormComponent } from './minutes-form/minutes-form.component';
import { MinutesPreviewComponent } from './minutes-preview/minutes-preview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    MinutesRoutingModule,
  ],
  declarations: [
    MinutesComponent,
    MinutesFormComponent,
    MinutesPreviewComponent,
  ],
  exports: [
    MinutesFormComponent,
    MinutesPreviewComponent,
  ]
})
export class MinutesModule { }
