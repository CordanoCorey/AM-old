import { Validators } from '@angular/forms';
import { Metadata, build } from '@caiu/core';

import { Group, GroupMember } from '../groups/groups.model';
import { Member } from '../members/members.model';
import { CurrentUser } from '../../shared/models';

export class GroupEdit {
    groupName = '';
    groupDescription = '';
    allowSuggestions = false;
    outlineId = 1;
    groupAdminId = 0;
    groupMembers: GroupMember[] = [];
    metadata: Metadata = {
        ignore: ['_group', 'group'],
        groupName: {
            validators: [Validators.required, Validators.maxLength(150)]
        }
    };

    static Build(group: Group, props: any = {}): GroupEdit {
        return Object.assign(new GroupEdit(group), props);
    }

    static BuildGroup(group: Group, props: any = {}): Group {
        return GroupEdit.Build(group, props).group;
    }

    constructor(private _group: Group = new Group()) {
        this.groupName = this._group.name;
        this.groupDescription = this._group.description;
        this.allowSuggestions = this._group.allowSuggestions;
        this.outlineId = this._group.outlineId;
        this.groupAdminId = this._group.administratorId;
        this.groupMembers = this._group.members;
    }

    get group(): Group {
        return build(Group, this._group, {
            name: this.groupName,
            description: this.groupDescription,
            allowSuggestions: this.allowSuggestions,
            outlineId: this.outlineId,
            administratorId: this.groupAdminId,
            members: this.groupMembers
        });
    }
}

export class GroupMemberEdit {
    emailAddress = '';
    groupId = 0;
    userId = 0;
    userName = '';
    isMember = false;
    isContributor = false;
    isManager = false;
    isVoter = false;
    isVoteTaker = false;
    isMinuteTaker = false;
    isAttendanceTaker = false;
    metadata: Metadata = {
        ignore: ['_member', 'member']
    };

    constructor(private _members: GroupMember[] = []) {
        this.groupId = _members[0] ? _members[0].groupId : 0;
        this.userId = _members[0] ? _members[0].userId : 0;
        this.emailAddress = _members[0] ? _members[0].emailAddress : '';
        this.userId = _members[0] ? _members[0].userId : 0;
        this.userName = _members[0] ? _members[0].fullName : '';
        _members.forEach(x => this.addRole(x.groupRoleId));
    }

    get members(): GroupMember[] {
        return this.roleIds.map(id => build(GroupMember, {
            groupId: this.groupId,
            groupRoleId: id,
            userId: this.userId
        }));
    }

    get roleIds(): number[] {
        return Object.keys(this.roles).reduce((acc, key) => this.roles[key] ? [...acc, key] : acc, []);
    }

    get roles(): any {
        return {
            1: this.isManager,
            2: this.isContributor,
            3: this.isMember,
            4: this.isAttendanceTaker,
            5: this.isMinuteTaker,
            6: this.isVoteTaker,
            7: this.isVoter
        };
    }

    addRole(roleId: number) {
        switch (roleId) {
            case 1:
                this.isManager = true;
                break;
            case 2:
                this.isContributor = true;
                break;
            case 3:
                this.isMember = true;
                break;
            case 4:
                this.isAttendanceTaker = true;
                break;
            case 5:
                this.isMinuteTaker = true;
                break;
            case 6:
                this.isVoteTaker = true;
                break;
            case 7:
                this.isVoter = true;
                break;
        }
    }
}
