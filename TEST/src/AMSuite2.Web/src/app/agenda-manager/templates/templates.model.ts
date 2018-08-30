import { BaseEntity, Collection } from '@caiu/core';

import { Group } from '../../core/groups/groups.model';
import { CurrentUser } from '../../shared/models';

export class TemplateItem extends BaseEntity {
    date: Date = new Date();
    description = '';
    isPrivate = false;
    isVotable = false;
    name = '';
    order = 0;
    parentId = 0;
    templateId = 0;
}

export class Template extends BaseEntity {
    description = '';
    displayMinutes = false;
    group: Group = new Group();
    groupId = 0;
    name = '';
    statusId = 0;
    timeframeId = 0;
    typeId = 0;
}

export class Templates extends Collection<Template> {

    constructor() {
        super(Template);
    }
}
