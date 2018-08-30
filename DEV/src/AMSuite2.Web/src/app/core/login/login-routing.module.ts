import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { LoginComponent } from './login.component';

const LoginRoute: Route = {
  path: '',
  component: LoginComponent,
  data: { routeName: 'login', routeLabel: 'Login' }
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
