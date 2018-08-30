import { Collection, Dictionary, build, QueryModel, toInt, compareNumbers, inArray } from '@caiu/core';

import { Accounts } from '../accounts/accounts.model';
import { Group, GroupMember, Groups } from '../groups/groups.model';
import { Account, AccountMember } from '../../account/account.model';
import { CurrentUser, User } from '../../shared/models';
import { getMemberId } from '../../shared/utils';

export class Member {
    accountMember: AccountMember = new AccountMember();
    accounts: AccountMember[] = [];
    greeting?= '';
    groups: GroupMember[] = [];
    _userId = 0;

    get id(): string {
        return Members.GetMemberId(this.accountId, this.userId);
    }

    get base(): any {
        return {
            user: this.user,
            accountMember: this.accountMember,
            groups: this.groups
        };
    }

    get account(): Account {
        return this.accountMember.account;
    }

    get accountId(): number {
        return this.accountMember.accountId;
    }

    get accountMatches(): string[] {
        return this.accountMember['matches'] && Array.isArray(this.accountMember['matches']) ? this.accountMember['matches'] : [];
    }

    get accountRole(): string {
        return this.accountMember.accountRole;
    }

    get accountRoleId(): number {
        return this.accountMember.accountRoleId;
    }

    get emailAddress(): string {
        return this.user.emailAddress;
    }

    set emailAddress(value: string) {
        this.user.emailAddress = value;
    }

    get firstName(): string {
        return this.user.firstName;
    }

    set firstName(value: string) {
        this.user.firstName = value;
    }

    get fullName(): string {
        return this.user.fullName;
    }

    set fullName(value: string) {
        this.user.fullName = value;
    }

    get generalInfo(): string {
        return this.user.generalInfo;
    }

    set generalInfo(value: string) {
        this.user.generalInfo = value;
    }

    get groupIds(): number[] {
        return this.accountMember.groupIds;
    }

    get groupMatches(): string[] {
        return this.groups.reduce((acc, group) => {
            return group['matches'] && Array.isArray(group['matches']) ? [...acc, ...group['matches']] : acc;
        }, []);
    }

    get isAccountMember(): boolean {
        return this.accountRoleId !== 0;
    }

    get isActive(): boolean {
        return this.accountMember.isUserActive;
    }

    get isLockedOut(): boolean {
        return this.user.isLockedOut;
    }

    get isUserActive(): boolean {
        return this.user.isActive;
    }

    get lastName(): string {
        return this.user.lastName;
    }

    set lastName(value: string) {
        this.user.lastName = value;
    }

    get matches(): string[] {
        return [...this.accountMatches, ...this.groupMatches];
    }

    get user(): User {
        return this.accountMember.user || new User();
    }

    set user(value: User) {
        this.accountMember.user = value;
    }

    get userId(): number {
        return this.accountMember.userId || this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get userTitle(): string {
        return this.user.userTitle;
    }

    set userTitle(value: string) {
        this.user.userTitle = value;
    }

    inGroup(groupId: number): boolean {
        return !(this.groups.findIndex(groupMember => groupMember.groupId === groupId) === -1);
    }
}

export class Members extends Collection<Member> {

    accountId = 0;
    groupId = 0;
    userId = 0;

    static BuildAccountMember(member: AccountMember): AccountMember {
        return build(AccountMember, member, {
            groupIds: member.groups.map(x => x.groupId).sort(compareNumbers)
        });
    }

    static BuildMembers(accountMembers: AccountMember[], groupMembers: GroupMember[], accountId = 0, userId = 0): Members {
        const members = Collection.BuildDictionaryFromArray<Member>(accountMembers
            .filter(x => x.userId ? true : false)
            .map(accountMember => build(Member, { accountMember })));
        groupMembers.forEach(groupMember => {
            const memberId = groupMember.memberId;
            const item = build(Member, members[memberId]);
            item.groups = [...item.groups, groupMember];
            item.userId = groupMember.userId;
            members[memberId] = item;
        });
        return build(Members, { items: members, activeId: Members.GetMemberId(accountId, userId) });
    }

    static GetAccountMembers(members: Member[], roles: number[] = []): Member[] {
        return members.filter(x => inArray(roles, x.accountRoleId));
    }

    static GetMemberId(accountId: number, userId: number): string {
        return getMemberId(accountId, userId);
    }

    static GetUserMemberships(members: GroupMember[]): Dictionary<GroupMember[]> {
        return members.reduce((acc, member) => {
            const existing = acc[member.userId] || [];
            acc[member.userId] = [...existing, member];
            return acc;
            // return Object.assign({}, acc, { [member.userId]: [...existing, member] });
        }, {});
    }

    static ReduceAccountMembers(state: Collection<AccountMember>, payload: AccountMember[]): Collection<AccountMember> {
        const members = Collection.BuildDictionaryFromArray<AccountMember>(state.toArray());
        payload.forEach(member => {
            const accountMember = build(AccountMember, member);
            const id = accountMember.id;
            const existingItem = members[id] || new AccountMember();
            const groups = accountMember.groups && accountMember.groups.length > 0 ? accountMember.groups : existingItem.groups;
            const groupIds = accountMember.groupIds && accountMember.groups.length > 0 ? accountMember.groupIds : existingItem.groupIds;
            const newItem = build(AccountMember, existingItem, accountMember, { groups, groupIds });
            members[id] = newItem;
        });
        const items = Object.keys(members).map(key => members[key]);
        return state.replaceItems(items);
    }

    static ReduceGroupMembers(state: GroupMember[], payload: GroupMember[]): GroupMember[] {
        const members = Collection.BuildDictionaryFromArray<GroupMember>(state);
        const userId = payload.length > 0 ? payload[0].userId : 0;
        payload.forEach(member => {
            member.user = build(User, { id: member.userId });
            const groupMember = build(GroupMember, member);
            const id = groupMember.id;
            const existingItem = members[id] || new GroupMember();
            const newItem = build(GroupMember, existingItem, groupMember, { userId });
            members[id] = newItem;
        });
        return Object.keys(members).map(key => members[key]);
    }

    static UpdateGroupMembers(state: GroupMember[], payload: GroupMember[]): GroupMember[] {
        const members = Collection.BuildDictionaryFromArray<GroupMember>(state);
        payload.forEach(member => {
            const groupMember = build(GroupMember, member);
            const id = groupMember.id;
            const existingItem = members[id] || new GroupMember();
            const newItem = build(GroupMember, existingItem, groupMember);
            members[id] = newItem;
        });
        return Object.keys(members).map(key => members[key]);
    }

    constructor() {
        super(Member);
    }

    get active(): Member {
        return build(Member, this.items[this.activeId]);
    }

    get activeId(): string {
        return Members.GetMemberId(this.accountId, this.userId);
    }

    set activeId(value: string) {
        const ids = value && value.split ? value.split('_') : [];
        if (ids[0]) {
            this.accountId = toInt(ids[0]);
        }
        if (ids[1]) {
            this.userId = toInt(ids[1]);
        }
    }

    buildItem(existingItem: Member, newItem: Member): Member {
        const newGroups = newItem.groups || [];
        const groups = [...existingItem.groups, ...newGroups];
        return build(Member, existingItem, newItem, { groups });
    }

    getAccountMembers(roles: number[] = []): Member[] {
        return Members.GetAccountMembers(this.toArray(), roles);
    }

    getMemberRoles(userId: number): MemberRoles[] {
        return [];
    }

    getMemberByUserId(userId: number): Member {
        return this.toArray()
            .find(member => member.userId === userId);
    }
}

export class MemberRoles {
    userId = 0;
    accountRoles: Dictionary<number[]> = {};
    groupRoles: Dictionary<number[]> = {};
}

export class MembersQuery extends QueryModel<Member> {
    showInactive = false;
    accountId = 0;
    accountUrl = '';
    groupId = 0;
}


export class MemberRow {

    constructor(private _member: Member = new Member(), private _accountUrl = '') {
    }

    get member(): Member {
        return build(Member, this._member);
    }

    get user(): User {
        return this.member.user;
    }

    get userId(): number {
        return this.member.userId;
    }

    get firstName(): string {
        return this.member.firstName;
    }

    get lastName(): string {
        return this.member.lastName;
    }

    get emailAddress(): string {
        return this.member.emailAddress;
    }

    get memberLink(): string {
        return `/${this._accountUrl}/members/${this.userId}/edit`;
    }

    get userTitle(): string {
        return this.member.userTitle;
    }

    get userRole(): string {
        return this.member.accountRole;
    }

    get locked(): string {
        return this.member.isLockedOut ? 'Yes' : 'No';
    }

    get accountActive(): string {
        return this.member.isActive ? 'Yes' : 'No';
    }

    get userActive(): string {
        return this.member.isActive ? 'Yes' : 'No';
    }
}
