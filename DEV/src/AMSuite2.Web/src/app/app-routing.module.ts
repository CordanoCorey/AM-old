import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, PreloadAllModules } from '@angular/router';
import { build, Dictionary } from '@caiu/core';
import { NotFoundComponent } from '@caiu/errors';
import { RouterActions } from '@caiu/router';
import { Store, CustomStore, CustomStoreModule } from '@caiu/store';

import { RootRouteModel } from './app.model';
import { rootRouteSelector } from './app.reducer';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { AppActions } from './shared/actions';
import { Observable, distinctUntilChanged } from './shared/observable';
import { authenticatedSelector } from './shared/selectors';

import { BinRoute } from './agenda-manager/bin/bin-routing.module';
import { AnnouncementRoute } from './core/announcement/announcement-routing.module';
import { EmailItemRoute } from './core/email-item/email-item-routing.module';
import { MinutesRoute } from './agenda-manager/minutes/minutes-routing.module';
import { PrintRoute } from './core/print/print-routing.module';
import { TemplateManagerRoute } from './agenda-manager/templates/templates-routing.module';
import { Account } from './account/account.model';

@Injectable()
export class RestoreStateGuard implements CanActivate {

  constructor(public store: Store<any>) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const s = localStorage.getItem('AMSUITE_STORE');
    const lastState = s ? JSON.parse(s) : {};
    this.store.dispatch(AppActions.initStore(lastState));
    return true;
  }
}

@Injectable()
export class RootGuard implements CanActivate {

  private _account: Account = new Account();
  model$: Observable<RootRouteModel>;

  constructor(public store: CustomStore<RootRouteModel>) {
    this.model$ = distinctUntilChanged.call(new CustomStore(this.store.state$, this.store.store));
    this.model$.subscribe(x => {
      this._account = x.account;
    });
  }

  get accountUrl(): string {
    return this._account.url;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const rootRoute: RootRouteModel = build(RootRouteModel, this.store.state);
    const activatedPath = route.url[0].path;
    const url = this.getUrl(route);
    if (url === rootRoute.path) {
      return Observable.of(true);
    }
    this.store.dispatch(RouterActions.navigate(`/${rootRoute.path}`));
    return Observable.of(false);
  }

  private getUrl(route: ActivatedRouteSnapshot): string {
    const url = route.url.map(segment => segment.path)
      .reduce((acc, val) => acc + val, '');
    if (url === 'dashboard') {
      return `${this.accountUrl}/dashboard`;
    } else if (url === 'account') {
      return `${this.accountUrl}/account`;
    }
    return url;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {

  authenticated$: Observable<boolean>;

  constructor(public store: Store<any>) {
    this.authenticated$ = authenticatedSelector(this.store);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // return this.authenticated$;
    return true;
  }
}

const redirects = [
  {
    path: 'contact',
    redirectTo: 'help'
  },
  {
    path: 'home',
    redirectTo: 'login'
  },
];
const lazyChildren = [
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    canActivate: [AuthenticatedGuard]
  },
  {
    path: 'login',
    canActivate: [RootGuard],
    loadChildren: 'app/core/login/login.module#LoginModule'
  },
  {
    path: 'reset-password',
    loadChildren: 'app/core/reset-password/reset-password.module#ResetPasswordModule'
  },
  {
    path: 'search',
    pathMatch: 'full',
    loadChildren: 'app/core/search/search.module#SearchModule'
  },
  {
    path: 'help',
    pathMatch: 'full',
    loadChildren: 'app/core/help/help.module#HelpModule'
  },
  {
    path: 'accounts',
    canActivate: [RootGuard],
    loadChildren: 'app/core/accounts-portal/accounts-portal.module#AccountsPortalModule'
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { routeName: 'not-found', routeLabel: 'Not Found' }
  },
  {
    path: ':account',
    loadChildren: 'app/account/account.module#AccountModule'
  },
];
const auxiliaryRoutes = [
  AnnouncementRoute, // announcement
  BinRoute, // bin
  EmailItemRoute, // email
  MinutesRoute, // minutes
  PrintRoute, // print
  TemplateManagerRoute, // templates
];

const routes: Routes = [
  {
    path: '',
    // canActivate: [RestoreStateGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      ...redirects,
      ...lazyChildren,
      {
        path: '**',
        redirectTo: 'not-found'
      },
    ],
  },
  ...auxiliaryRoutes,
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    CustomStoreModule.provideStoreAsync<RootRouteModel>(rootRouteSelector),
  ],
  exports: [RouterModule],
  providers: [
    AuthenticatedGuard,
    RestoreStateGuard,
    RootGuard,
  ]
})
export class AppRoutingModule { }
