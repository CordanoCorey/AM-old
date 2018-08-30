import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule, MdIconModule } from '@angular/material';
import { AccordionModule } from '@caiu/common';

import { WidgetComponent } from './widget.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdIconModule,
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
