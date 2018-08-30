import { CurrentUser } from '../../shared/models';
import { Tabs } from '../../shared/tabs/tabs.model';
import { Account, AccountMember } from '../../account/account.model';
import { fileToBinary } from '../../document-manager/files/files.model';

export class Header {
    user: CurrentUser = new CurrentUser();
    account: Account = new Account();
    userAccounts: AccountMember[] = [];
    tabs: Tabs = new Tabs();

    get hasAccount(): boolean {
        return this.account.id ? true : false;
    }

    get hasAccountLogo(): boolean {
        return this.logoSrc === '' ? false : true;
    }

    get logoSrc(): string {
        return this.account.logo ? fileToBinary(this.account.logo) : '';
    }
}
