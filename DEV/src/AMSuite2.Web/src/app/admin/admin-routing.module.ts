import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@caiu/store';

import { AdminComponent } from './admin.component';
import { AccountsActions } from '../core/accounts/accounts.reducer';
import { MembersRoute } from '../core/members/members-routing.module';
import { Observable } from '../shared/observable';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public store: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    this.store.dispatch(AccountsActions.activateUrl('admin'));
    return true;
  }
}

const redirects = [
  {
    path: 'account/edit',
    pathMatch: 'full',
    redirectTo: 'edit'
  },
  {
    path: 'basicinfo',
    pathMatch: 'full',
    redirectTo: 'info'
  },
  {
    path: 'users',
    pathMatch: 'full',
    redirectTo: 'members'
  },
];

const lazyChildren = [
  {
    path: 'accounts',
    pathMatch: 'full',
    loadChildren: 'app/core/accounts/accounts.module#AccountsModule'
  },
  {
    path: 'accounts/new',
    loadChildren: 'app/core/account-edit/account-edit.module#AccountEditModule'
  },
  {
    path: 'announcements',
    loadChildren: 'app/core/announcements/announcements.module#AnnouncementsModule'
  },
  {
    path: 'edit',
    pathMatch: 'full',
    loadChildren: 'app/core/account-edit/account-edit.module#AccountEditModule'
  },
  {
    path: 'groups',
    loadChildren: 'app/core/groups/groups.module#GroupsModule'
  },
  {
    path: 'info',
    pathMatch: 'full',
    loadChildren: 'app/core/account-info/account-info.module#AccountInfoModule'
  },
  {
    path: 'members',
    loadChildren: 'app/core/members/members.module#MembersModule'
  },
  {
    path: 'restore',
    pathMatch: 'full',
    loadChildren: 'app/core/restore/restore.module#RestoreModule'
  },
];

export const AdminRoute: Route = {
  path: '',
  component: AdminComponent,
  data: { routeName: 'admin', routeLabel: 'Admin' },
  canActivate: [AdminGuard],
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'accounts' },
    ...lazyChildren,
    ...redirects
  ]
};

const routes: Routes = [AdminRoute];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AdminGuard]
})
export class AdminRoutingModule { }
