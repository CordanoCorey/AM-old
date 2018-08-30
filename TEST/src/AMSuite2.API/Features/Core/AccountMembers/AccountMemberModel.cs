using System;
using System.Collections.Generic;
using AMSuite2.API.Features.Core.Accounts;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Features.Core.Users;

namespace AMSuite2.API.Features.Core.AccountMembers
{
    public class AccountMemberModel
    {
        public int AccountId { get; set; }
        public string AccountRole { get; set; }
        public int AccountRoleId { get; set; }
        public string GeneralInfo { get; set; }
        public string Greeting { get; set; }
        public bool HasAccountRequest { get; set; }
        public bool IsAccountActive { get; set; }
        public bool IsAdministrator => (AccountRoleId == 2);
        public bool IsApproved { get; set; }
        public bool IsGroupAdministrator => (AccountRoleId == 3);
        public bool IsLockedOut { get; set; }
        public bool IsMember => (AccountRoleId == 4);
        public bool IsPrimaryAccount { get; set; }
        public bool IsSystemAdministrator => (AccountRoleId == 1);
        public bool IsUserActive { get; set; }
        public DateTime LastLoginDate { get; set; }
        public bool ResetPassword { get; set; }
        public int UserId { get; set; }

        public AccountModel Account { get; set; }
        public IEnumerable<AccountMemberModel> Accounts { get; set; }
        public IEnumerable<GroupMemberModel> Groups { get; set; }
        public UserModel User { get; set; }
    }
}
