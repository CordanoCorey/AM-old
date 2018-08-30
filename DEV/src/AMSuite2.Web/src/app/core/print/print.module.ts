import { NgModule } from '@angular/core';

import { PrintRoutingModule } from './print-routing.module';
import { PrintComponent } from './print.component';
import { PrintOptionsComponent } from './print-options/print-options.component';
import { PrintPreviewComponent } from './print-preview/print-preview.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PrintRoutingModule
  ],
  declarations: [
    PrintComponent,
    PrintOptionsComponent,
    PrintPreviewComponent,
  ],
  exports: [
    PrintOptionsComponent,
  ]
})
export class PrintModule { }
