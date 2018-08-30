import { Validators } from '@angular/forms';
import { Metadata, build } from '@caiu/core';

import { Group } from '../groups/groups.model';
import { Member } from '../members/members.model';
import { Account, AccountMember } from '../../account/account.model';
import { CurrentUser, User } from '../../shared/models';

export type MemberEditAction = 'ADD_NEW_USER' | 'ADD_EXISTING_USER' | 'UPDATE_EXISTING_MEMBER';

export class MemberEdit {
    firstName = '';
    lastName = '';
    emailAddress = '';
    userTitle = '';
    generalInfo = '';
    unlockAccount = false;
    deactivateAccount = false;
    resetPassword = false;
    greeting = '';
    rejectReason = '';
    userRoles = [];
    userGroups = [];
    metadata: Metadata = {
        ignore: ['_member', 'accountMember', 'member', 'user'],
        emailAddress: {
            validators: [Validators.required, Validators.maxLength(150)]
        },
        firstName: {
            validators: [Validators.required, Validators.maxLength(50)]
        },
        lastName: {
            validators: [Validators.required, Validators.maxLength(50)]
        },
    };

    static Build(member: Member, props: any = {}): MemberEdit {
        return Object.assign(new MemberEdit(member), props);
    }

    static BuildMember(member: Member, props: any = {}): Member {
        return MemberEdit.Build(member, props).member;
    }

    constructor(private _member: Member = new Member()) {
        this.firstName = this._member.firstName;
        this.lastName = this._member.lastName;
        this.emailAddress = this._member.emailAddress;
        this.userTitle = this._member.userTitle;
        this.generalInfo = this._member.generalInfo;
        this.greeting = `You have received this email because a new AgendaManager member account has been created on your behalf.`;
    }

    get accountMember(): AccountMember {
        return build(AccountMember, this._member.accountMember, { user: this.user });
    }

    get member(): Member {
        return build(Member, this._member, { accountMember: this.accountMember });
    }

    get user(): User {
        return build(User, this._member.user, {
            firstName: this.firstName,
            lastName: this.lastName,
            emailAddress: this.emailAddress,
            generalInfo: this.generalInfo,
            greeting: this.greeting,
            userTitle: this.userTitle
        });
    }
}

export class UserGroupsEdit {
    term = '';
    metadata: Metadata = {
        ignore: ['_groups', 'groups']
    };

    static Build(member: Member, props: any = {}): MemberEdit {
        return Object.assign(new MemberEdit(member), props);
    }

    static BuildMember(member: Member, props: any = {}): Member {
        return MemberEdit.Build(member, props).member;
    }

    constructor(private _groups: Group[] = []) {
    }

    get groups(): Group[] {
        return [];
    }
}
