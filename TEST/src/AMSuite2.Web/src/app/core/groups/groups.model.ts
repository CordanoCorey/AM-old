import { Collection, inArray, build, buildCollection, BaseEntity, Dictionary } from '@caiu/core';

import { Account } from '../../account/account.model';
import { CurrentUser, UserGroup, User } from '../../shared/models';
import { getMemberId } from '../../shared/utils';

export class Group extends BaseEntity {
    accountId = 0;
    administratorId = 0;
    allowSuggestions = false;
    description = '';
    name = '';
    outlineId = 1;
    _memberCount = 0;

    administrators: GroupMember[] = [];
    createdByName = '';
    managers: GroupMember[] = [];
    members: GroupMember[] = [];

    get memberCount(): number {
        return this._memberCount || this.members.length;
    }

    set memberCount(value: number) {
        this._memberCount = value;
    }

    get users(): Dictionary<number[]> {
        return this.members.reduce((acc, member) => {
            const roles = acc[member.userId] || [];
            return Object.assign({}, acc, { [member.userId]: [...roles, member.groupRoleId].sort() });
        }, {});
    }
}

export class Groups extends Collection<Group> {

    constructor() {
        super(Group);
    }
}

export class GroupUser {

}

export class GroupMemberRoles {

    roles: GroupRole[] = [];
    user: User = new User();
    group: Group = new Group();

    get isAttendanceTaker(): boolean {
        return inArray(this.roles, GroupRole.ATTENDANCE_TAKER);
    }
    get isContributor(): boolean {
        return inArray(this.roles, GroupRole.CONTRIBUTOR);
    }
    get isManager(): boolean {
        return inArray(this.roles, GroupRole.MANAGER);
    }
    get isMember(): boolean {
        return inArray(this.roles, GroupRole.MEMBER);
    }
    get isMinuteTaker(): boolean {
        return inArray(this.roles, GroupRole.MINUTE_TAKER);
    }
    get isVoter(): boolean {
        return inArray(this.roles, GroupRole.VOTER);
    }
    get isVoteTaker(): boolean {
        return inArray(this.roles, GroupRole.VOTE_TAKER);
    }
}

export class GroupMember {
    accountId = 0;
    group: Group = new Group();
    groupId = 0;
    groupRole = '';
    groupRoleId = 0;
    user: User = new User();

    get id(): string {
        return `${this.groupId}_${this.userId}_${this.groupRoleId}`;
    }

    get emailAddress(): string {
        return this.user.emailAddress;
    }

    set emailAddress(value: string) {
        this.user.emailAddress = value;
    }

    get fullName(): string {
        return this.user.fullName;
    }

    set fullName(value: string) {
        this.user.fullName = value;
    }

    get lastName(): string {
        return this.user.lastName;
    }

    get memberId(): string {
        return getMemberId(this.accountId, this.userId);
    }

    get name(): string {
        return this.user.fullName;
    }

    get userId(): number {
        return this.user ? this.user.id : 0;
    }

    set userId(value: number) {
        if (this.user) {
            this.user.id = value;
        } else {
            this.user = build(User, { id: value });
        }
    }
}

export class GroupMemberRole {
    role: GroupRole;
    user: User = new User();
    group: Group = new Group();
}

export enum GroupRole {
    DEFAULT,
    MANAGER,
    CONTRIBUTOR,
    MEMBER,
    ATTENDANCE_TAKER,
    MINUTE_TAKER,
    VOTE_TAKER,
    VOTER
}

export enum Outlines {
    DEFAULT,
    NUMBER_LETTER,
    NUMBER_NUMBER
}

export class GroupRow {

    constructor(private _group: Group, private _accountUrl: string) {
    }

    get accountUrl() {
        return this._accountUrl;
    }

    get group(): Group {
        return build(Group, this._group);
    }

    get groupId(): number {
        return this.group.id;
    }

    get groupLink(): string {
        return `/${this.accountUrl}/groups/${this.groupId}/edit`;
    }

    get groupName(): string {
        return this.group.name;
    }

    get members(): number {
        return this.group.memberCount;
    }

    get createdBy(): string {
        return this.group.createdByName;
    }
}
