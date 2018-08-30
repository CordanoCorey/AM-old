import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { buildLazyRoute } from '@caiu/router';
import { ProfileComponent } from './profile.component';

export const ProfileRoute: Route = {
  path: '',
  component: ProfileComponent
};

const routes: Routes = [ProfileRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ProfileRoutingModule { }
