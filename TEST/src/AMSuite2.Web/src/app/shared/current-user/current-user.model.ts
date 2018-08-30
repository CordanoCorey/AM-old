import { CurrentUser } from '../models';
import { Account, AccountMember } from '../../account/account.model';

export class CurrentUserModel {
    user: CurrentUser = new CurrentUser();
    account: Account = new Account();
    userAccounts: AccountMember[] = [];
}
