import { build, BaseEntity } from '@caiu/core';
import { Store } from '@caiu/store';

import { Account } from '../../account/account.model';
import { CurrentUser } from '../../shared/models';

export class Dashboard {
    greeting = '';
}

export class DashboardMessage extends BaseEntity {
    id = 0;
    description = '';
    lock = '';
    subject = '';
    startDate: Date = new Date();
    endDate: Date = new Date();
}
