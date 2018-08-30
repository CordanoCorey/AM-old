import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { HelpWidgetComponent } from './help-widget.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [HelpWidgetComponent],
  exports: [HelpWidgetComponent]
})
export class HelpWidgetModule { }
