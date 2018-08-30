import { Collection, BaseEntity } from '@caiu/core';

import { CurrentUser } from '../../shared/models';

export class Notification extends BaseEntity {
    linkText = '';
    linkUrl = '';
    message = '';
    resolvedBy = '';
    status = '';
    statusId: NotificationStatus = NotificationStatus.DEFAULT;
    type = '';
    typeId: NotificationType = NotificationType.DEFAULT;
}

export enum NotificationStatus {
    DEFAULT,
    ACTION_REQUIRED,
    RESOLVED,
    ACCEPTED,
    REJECTED
}

export enum NotificationType {
    DEFAULT,
    SUGGESTED_ITEM,
    ACCOUNT_REQUEST,
    USER_MESSAGE
}

export class Notifications extends Collection<Notification> {

    constructor() {
        super(Notification);
    }
}
