import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { AgendasActions } from './agendas.reducer';
import { Observable } from '../../shared/observable';
import { AgendasComponent } from './agendas.component';

@Injectable()
export class AgendaIdGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = str2int(route.params['agendaId']);
    this.store.dispatch(AgendasActions.activate(id));
    return Observable.of(true);
  }
}

const routes: Routes = [
  {
    path: '',
    component: AgendasComponent,
    children: [
      {
        path: ':agendaId',
        loadChildren: 'app/agenda-manager/agenda/agenda.module#AgendaModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AgendaIdGuard]
})
export class AgendasRoutingModule { }
