import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@caiu/effects';
import { ErrorsModule, errorsReducer, GlobalErrorHandler } from '@caiu/errors';
import { EventsModule, EventEffects, eventsReducer } from '@caiu/events';
import { formsReducer } from '@caiu/forms';
import { HttpModule, HttpEffects, LookupModule, lookupReducer } from '@caiu/http';
import { RouterModule, RouterEffects, routerReducer } from '@caiu/router';
import { StorageModule, StorageEffects } from '@caiu/storage';
import { StoreModule, CustomStoreModule } from '@caiu/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { globalReducer } from './app.reducer';
import { agendaItemsReducer } from './agenda-manager/agenda-items/agenda-items.reducer';
import { agendasReducer } from './agenda-manager/agendas/agendas.reducer';
import { BinModule } from './agenda-manager/bin/bin.module';
import { binReducer } from './agenda-manager/bin/bin.reducer';
import { meetingsReducer } from './agenda-manager/meetings/meetings.reducer';
import { minutesReducer } from './agenda-manager/minutes/minutes.reducer';
import { notesReducer } from './agenda-manager/notes/notes.reducer';
import { TemplatesModule } from './agenda-manager/templates/templates.module';
import { templatesReducer } from './agenda-manager/templates/templates.reducer';
import { votesReducer } from './agenda-manager/votes/votes.reducer';
import { accountsReducer } from './core/accounts/accounts.reducer';
import { announcementsReducer } from './core/announcements/announcements.reducer';
import { DashboardModule } from './core/dashboard/dashboard.module';
import { dashboardReducer } from './core/dashboard/dashboard.reducer';
import { emailReducer } from './core/email/email.reducer';
import { groupsReducer } from './core/groups/groups.reducer';
import { accountMembersReducer, groupMembersReducer, membersReducer } from './core/members/members.reducer';
import { notificationsReducer } from './core/notifications/notifications.reducer';
import { PrintModule } from './core/print/print.module';
import { profileReducer } from './core/profile/profile.reducer';
import { UserEffects, AccountEffects } from './shared/effects';
import { Token } from './shared/models';
import { currentUserReducer, configReducer, usersReducer } from './shared/reducers';
import { tabsReducer } from './shared/tabs/tabs.reducer';
import { SharedModule } from './shared/shared.module';
import { AnnouncementModule } from './core/announcement/announcement.module';
import { MinutesModule } from './agenda-manager/minutes/minutes.module';
import { EmailItemModule } from './core/email-item/email-item.module';
import { DialogRouteModule } from './shared/dialog-route/dialog-route.module';
import { AgendaManagerModule } from './agenda-manager/agenda-manager.module';

export function instrumentOptions() {
    return {
        monitor: useLogMonitor({ visible: false, position: 'right' })
    };
}

export function mapToken(s: any): string {
    const impersonating = s['currentUser']['impersonating'];
    const token: Token = impersonating ? <Token>impersonating.token : <Token>s.currentUser.token;
    return token.expires_in > 0 ? token.access_token : null;
}

export function mapApiBase(s: any): string {
    return s.config.apiBase;
}

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        DialogRouteModule,
        EffectsModule.run(AccountEffects),
        EffectsModule.run(EventEffects),
        EffectsModule.run(HttpEffects),
        EffectsModule.run(RouterEffects),
        EffectsModule.run(StorageEffects),
        EffectsModule.run(UserEffects),
        ErrorsModule.forRoot(),
        EventsModule,
        HttpModule.forRootAsync(mapApiBase, mapToken),
        LookupModule.forRoot(),
        RouterModule.forRoot(),
        SharedModule.forRoot(),
        StorageModule.forRoot('AMSUITE_STORE'),
        StoreModule.provideStore({
            app: globalReducer,
            config: configReducer,
            currentUser: currentUserReducer,
            errors: errorsReducer,
            events: eventsReducer,
            forms: formsReducer,
            lookup: lookupReducer,
            route: routerReducer,
            tabs: tabsReducer,
            accounts: accountsReducer,
            agendas: agendasReducer,
            agendaItems: agendaItemsReducer,
            announcements: announcementsReducer,
            bin: binReducer,
            dashboard: dashboardReducer,
            email: emailReducer,
            groups: groupsReducer,
            meetings: meetingsReducer,
            accountMembers: accountMembersReducer,
            groupMembers: groupMembersReducer,
            members: membersReducer,
            minutes: minutesReducer,
            notes: notesReducer,
            notifications: notificationsReducer,
            profile: profileReducer,
            templates: templatesReducer,
            users: usersReducer,
            votes: votesReducer
        }),
        StoreDevtoolsModule.instrumentStore(instrumentOptions),
        StoreLogMonitorModule,
        AgendaManagerModule,
        AnnouncementModule,
        BinModule,
        EmailItemModule,
        MinutesModule,
        PrintModule,
        TemplatesModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
