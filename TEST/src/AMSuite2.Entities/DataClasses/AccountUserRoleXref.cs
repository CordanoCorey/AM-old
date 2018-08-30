using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AccountUserRoleXref
    {
        public int RoleId { get; set; }
        public int UserId { get; set; }
        public int AccountId { get; set; }
        public bool IsUserActive { get; set; }
        public bool? PrimaryAccount { get; set; }

        public virtual Account Account { get; set; }
        public virtual RoleLkp Role { get; set; }
        public virtual ApplicationUser User { get; set; }
    }
}
