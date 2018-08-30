import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatIconModule } from '@angular/material';
import { AccordionModule } from '@caiu/common';

import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    AccordionModule,
  ],
  declarations: [
    WidgetComponent,
  ],
  exports: [
    WidgetComponent,
  ]
})
export class WidgetModule { }
