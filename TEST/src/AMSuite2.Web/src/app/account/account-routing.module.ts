import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, Route, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, CustomStoreModule, CustomStore } from '@caiu/store';

import { RootGuard, AuthenticatedGuard } from '../app-routing.module';
import { AccountComponent } from './account.component';
import { Account } from './account.model';
import { routes as amRoutes } from '../agenda-manager/agenda-manager-routing.module';
import { Accounts } from '../core/accounts/accounts.model';
import { AccountsActions, accountsSelector } from '../core/accounts/accounts.reducer';
import { documentManagerRoutes } from '../document-manager/document-manager-routing.module';
import { Observable } from '../shared/observable';
import { hasAccountSelector } from '../shared/selectors';

@Injectable()
export class ActivateAccountGuard implements CanActivate {

  constructor(public store: Store<any>) {
  }

  getAccountUrl(route: ActivatedRouteSnapshot): string {
    return route.pathFromRoot[2].url ? route.pathFromRoot[2].url[0].path : '';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const accountUrl = this.getAccountUrl(route);
    this.store.dispatch(AccountsActions.activateUrl(accountUrl));
    return true;
  }
}

@Injectable()
export class HasAccountGuard implements CanActivateChild {

  constructor(public store: Store<any>) { }

  get hasAccount$(): Observable<boolean> {
    return hasAccountSelector(this.store);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.hasAccount$;
  }
}

const redirects = [
  {
    path: 'account-edit',
    pathMatch: 'full',
    redirectTo: 'edit'
  },
  {
    path: 'attachments',
    redirectTo: 'files'
  },
  {
    path: 'basicinfo',
    redirectTo: 'info'
  },
  // {
  //   path: 'edit',
  //   redirectTo: 'account/edit'
  // },
  {
    path: 'import/members',
    redirectTo: 'members/import'
  },
  {
    path: 'meeting/edit/:meetingId',
    redirectTo: 'meetings/:meetingId/edit'
  },
  {
    path: 'meeting/view/:meetingId/:agendaId/:agendaItemId',
    redirectTo: 'meetings/:meetingId/agendas/:agendaId/agendaitems/:agendaItemId'
  },
  {
    path: 'meeting/view/:meetingId/:agendaId',
    redirectTo: 'meetings/:meetingId/agendas/:agendaId'
  },
  {
    path: 'meeting/view/:meetingId',
    redirectTo: 'meetings/:meetingId'
  },
];

const coreRoutes = [
  {
    path: 'edit',
    loadChildren: 'app/core/account-edit/account-edit.module#AccountEditModule'
  },
  {
    path: 'account',
    loadChildren: 'app/core/account-detail/account-detail.module#AccountDetailModule'
  },
  {
    path: 'announcements',
    loadChildren: 'app/core/announcements/announcements.module#AnnouncementsModule'
  },
  {
    path: 'dashboard',
    canActivate: [RootGuard],
    pathMatch: 'full',
    loadChildren: 'app/core/dashboard/dashboard.module#DashboardModule'
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
    path: 'profile',
    pathMatch: 'full',
    loadChildren: 'app/core/profile/profile.module#ProfileModule',
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'restore',
    pathMatch: 'full',
    loadChildren: 'app/core/restore/restore.module#RestoreModule'
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: 'app/core/search/search.module#SearchModule'
  },
];

export const AccountRoute: Route = {
  path: '',
  // canActivate: [ActivateAccountGuard],
  canActivateChild: [HasAccountGuard],
  component: AccountComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'account' },
    ...coreRoutes,
    ...amRoutes,
    ...documentManagerRoutes,
    ...redirects
  ]
};

const routes: Routes = [AccountRoute];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CustomStoreModule.provideStoreAsync(accountsSelector),
  ],
  exports: [RouterModule],
  providers: [
    ActivateAccountGuard,
    HasAccountGuard,
  ]
})
export class AccountRoutingModule { }
