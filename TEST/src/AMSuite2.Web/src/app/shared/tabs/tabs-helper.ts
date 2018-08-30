import { Tab, Tabs } from './tabs.model';

export class TabsHelper {

    static BuildAccountTabs(accountUrl: string, order?: string[], activeTab?: string) {
        const tabs = {
            dashboard: TabsHelper.BuildDashboardTab(accountUrl, activeTab === 'dashboard'),
            meetings: TabsHelper.BuildMeetingsTab(accountUrl, activeTab === 'meetings'),
            members: TabsHelper.BuildMembersTab(accountUrl, activeTab === 'members'),
            search: TabsHelper.BuildSearchTab(accountUrl, activeTab === 'search'),
            account: TabsHelper.BuildAccountManagementTab(accountUrl, activeTab === 'account'),
            groups: TabsHelper.BuildGroupManagementTab(accountUrl, activeTab === 'groups')
        };
        return Tabs.Build(tabs, order);
    }

    static BuildAdminTabs(activeTab = 'accounts') {
        const tabs = {
            accounts: TabsHelper.BuildAccountsTab(activeTab === 'accounts'),
            announcements: TabsHelper.BuildAnnouncementsTab(activeTab === 'announcements'),
            members: TabsHelper.BuildUsersTab(activeTab === 'members'),
            restore: TabsHelper.BuildRestoreTab(activeTab === 'restore')
        };
        return Tabs.Build(tabs, ['accounts', 'announcements', 'members', 'restore']);
    }

    static BuildAccountSubmenu(accountUrl: string): Tab[] {
        return [
            Tab.Build({ label: 'Basic Information', href: `/${accountUrl}/info` }),
            Tab.Build({ label: 'Announcements', href: `/${accountUrl}/announcements` }),
            Tab.Build({ label: 'Groups', href: `/${accountUrl}/groups` }),
        ];
    }

    static BuildAdminSubmenu(): Tab[] {
        return [
            Tab.Build({ label: 'Basic Information', href: `/admin/info` })
        ];
    }

    static BuildAccountsTab(isActive: boolean): Tab {
        return {
            label: 'Accounts',
            href: '/admin/accounts',
            isActive,
            submenu: TabsHelper.BuildAdminSubmenu()
        };
    }

    static BuildAccountManagementTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Account Management',
            href: `/${accountUrl}/info`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildAnnouncementsTab(isActive: boolean): Tab {
        return {
            label: 'Announcements',
            href: '/admin/announcements',
            isActive,
            submenu: TabsHelper.BuildAdminSubmenu()
        };
    }

    static BuildDashboardTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Home',
            href: `/${accountUrl}/dashboard`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildGroupManagementTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Group Management',
            href: `/${accountUrl}/groups`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildMeetingsTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Meetings',
            href: `/${accountUrl}/meetings`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildMembersTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Members',
            href: `/${accountUrl}/members`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildRestoreTab(isActive: boolean): Tab {
        return {
            label: 'Restore',
            href: '/admin/restore',
            isActive,
            submenu: TabsHelper.BuildAdminSubmenu()
        };
    }

    static BuildSearchTab(accountUrl: string, isActive: boolean): Tab {
        return {
            label: 'Search',
            href: `/${accountUrl}/search`,
            isActive,
            submenu: TabsHelper.BuildAccountSubmenu(accountUrl)
        };
    }

    static BuildUsersTab(isActive: boolean): Tab {
        return {
            label: 'Users',
            href: '/admin/members',
            isActive,
            submenu: TabsHelper.BuildAdminSubmenu()
        };
    }
}