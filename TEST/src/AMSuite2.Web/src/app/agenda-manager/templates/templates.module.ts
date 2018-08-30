import { NgModule } from '@angular/core';

import { TemplatesRoutingModule } from './templates-routing.module';
import { TemplatesComponent } from './templates.component';
import { TemplateComponent } from './template/template.component';
import { AboutTemplatesComponent } from './about-templates/about-templates.component';
import { TemplateDialogComponent } from './template-dialog/template-dialog.component';
import { TemplatesListComponent } from './templates-list/templates-list.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TemplatesRoutingModule,
  ],
  declarations: [
    TemplatesComponent,
    TemplateComponent,
    TemplatesListComponent,
    AboutTemplatesComponent,
    TemplateDialogComponent,
  ],
  entryComponents: [
    TemplateDialogComponent,
  ],
  exports: [
    TemplatesComponent,
    TemplateDialogComponent,
  ]
})
export class TemplatesModule { }
