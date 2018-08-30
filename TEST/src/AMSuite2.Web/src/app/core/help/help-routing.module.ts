import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { HelpComponent } from './help.component';

export const HelpRoute: Route = {
  path: '',
  component: HelpComponent
};

const routes: Routes = [HelpRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HelpRoutingModule { }
