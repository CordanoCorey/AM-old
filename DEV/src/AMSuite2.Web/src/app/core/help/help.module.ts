import { NgModule } from '@angular/core';
import { HelpRoutingModule } from './help-routing.module';
import { HelpComponent } from './help.component';
import { HelpWidgetComponent } from './help-widget/help-widget.component';
import { SharedModule } from '../../shared/shared.module';
import { HelpWidgetModule } from './help-widget/help-widget.module';
import { HelpButtonComponent } from './help-button/help-button.component';
import { AboutHelpComponent } from './about-help/about-help.component';

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule,
    HelpWidgetModule
  ],
  declarations: [
    HelpComponent,
    HelpButtonComponent,
    AboutHelpComponent,
  ]
})
export class HelpModule { }
