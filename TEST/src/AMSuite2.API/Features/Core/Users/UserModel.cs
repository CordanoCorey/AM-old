using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AMSuite2.API.Features.Core.GroupMembers;
using AMSuite2.API.Infrastructure.Models;

namespace AMSuite2.API.Features.Core.Users
{
    public class UserModel : BaseEntity, IEntity
    {
        public int Id { get; set; }
        public int AgendaDateRangeId { get; set; }
        public bool AutoSaveEnabled { get; set; }
        /// <summary>
        /// A random value that should change whenever a role is persisted to the store
        /// </summary>
        public virtual string ConcurrencyStamp { get; set; } = Guid.NewGuid().ToString();
        public int DefaultGroupId { get; set; }
        public string EmailAddress { get; set; }
        public int FailedPasswordAttemptCount { get; set; }
        public string FirstName { get; set; }
        public string FullName { get; set; }
        public string GeneralInfo { get; set; }
        public bool IsActive { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime? LastLockoutDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string UserName { get; set; }
        public string UserTitle { get; set; }
        public bool WarnOnDirty { get; set; }


        public IEnumerable<UserAccountsModel> UserAccounts { get; set; }
        public IEnumerable<GroupMemberModel> UserGroups { get; set; }
    }
}
