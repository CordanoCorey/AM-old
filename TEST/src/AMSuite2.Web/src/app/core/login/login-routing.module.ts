import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { buildLazyRoute, LazyRoute } from '@caiu/router';
import { LoginComponent } from './login.component';

const LoginRoute: Route = {
  path: '',
  component: LoginComponent
};

export function buildLoginRoute(): Route {
  return LoginRoute;
}

const routes: Routes = [LoginRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class LoginRoutingModule { }
