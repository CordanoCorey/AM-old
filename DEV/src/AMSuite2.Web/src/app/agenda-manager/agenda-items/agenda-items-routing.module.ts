import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { str2int } from '@caiu/core';
import { Store } from '@caiu/store';

import { AgendaItemsActions } from './agenda-items.reducer';
import { Observable } from '../../shared/observable';
import { AgendaItemsComponent } from './agenda-items.component';

@Injectable()
export class AgendaItemIdGuard implements CanActivate {

  constructor(private store: Store<any>) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const id = str2int(route.params['agendaItemId']);
    this.store.dispatch(AgendaItemsActions.activate(id));
    return Observable.of(true);
  }
}

const routes: Routes = [
  {
    path: ':agendaItemId',
    component: AgendaItemsComponent,
    canActivate: [AgendaItemIdGuard],
    data: { routeName: 'agenda-items', routeLabel: 'Agenda Items' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: 'app/agenda-manager/agenda-item/agenda-item.module#AgendaItemModule'
      },
      {
        path: 'edit',
        pathMatch: 'full',
        loadChildren: 'app/agenda-manager/agenda-item-edit/agenda-item-edit.module#AgendaItemEditModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AgendaItemIdGuard]
})
export class AgendaItemsRoutingModule { }
