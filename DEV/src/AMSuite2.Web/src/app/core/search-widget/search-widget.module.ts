import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchWidgetComponent } from './search-widget.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
  ],
  declarations: [SearchWidgetComponent],
  exports: [SearchWidgetComponent]
})
export class SearchWidgetModule { }
