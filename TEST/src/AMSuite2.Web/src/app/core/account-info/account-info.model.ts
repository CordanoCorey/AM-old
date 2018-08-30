import { build, Metadata } from '@caiu/core';
import { FileUpload } from '@caiu/common';

import { Account } from '../../account/account.model';
import { CurrentUser } from '../../shared/models';
import { mapFileUpload } from '../../document-manager/files/files.model';

export class AccountInfo {
    accountName = '';
    allowAccountRequests = false;
    description = '';
    logo: FileUpload[] = [];
    removeLogo = false;
    signature = '';
    metadata = {
        ignore: ['_account', 'account']
    };

    static Build(account: Account, props: any = {}): AccountInfo {
        return Object.assign(new AccountInfo(account), props);
    }

    static BuildAccount(account: Account, props: any = {}): Account {
        return AccountInfo.Build(account, props).account;
    }

    constructor(private _account: Account = new Account()) {
        this.accountName = this._account.name;
        this.allowAccountRequests = this._account.allowRequests;
        this.description = this._account.description;
        this.signature = this._account.defaultSignature;
    }

    get account(): Account {
        return build(Account, this._account, {
            name: this.accountName,
            allowRequests: this.allowAccountRequests,
            description: this.description,
            logo: this.removeLogo ? (mapFileUpload(this.logo[0], this._account.logo) || null) : this._account.logo,
            defaultSignature: this.signature
        });
    }

    setValue(props: any): AccountInfo {
        return Object.assign(this, props);
    }

}
