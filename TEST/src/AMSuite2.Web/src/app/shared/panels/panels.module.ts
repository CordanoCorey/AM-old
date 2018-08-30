import { NgModule } from '@angular/core';
import { CommonModule } from '@caiu/common';

import { PanelComponent } from './panel/panel.component';
import { PanelWhiteComponent } from './panel-white/panel-white.component';
import { PanelYellowComponent } from './panel-yellow/panel-yellow.component';
import { PanelBlueComponent } from './panel-blue/panel-blue.component';
import { PanelBlueHeaderComponent } from './panel-blue/panel-blue-header.component';
import { PanelBlueContentComponent } from './panel-blue/panel-blue-content.component';
import { PanelBlueMiniComponent } from './panel-blue-mini/panel-blue-mini.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    PanelComponent,
    PanelWhiteComponent,
    PanelYellowComponent,
    PanelBlueComponent,
    PanelBlueHeaderComponent,
    PanelBlueContentComponent,
    PanelBlueMiniComponent,
  ],
  exports: [
    PanelComponent,
    PanelWhiteComponent,
    PanelYellowComponent,
    PanelBlueComponent,
    PanelBlueHeaderComponent,
    PanelBlueContentComponent,
    PanelBlueMiniComponent,
  ]
})
export class PanelsModule { }
