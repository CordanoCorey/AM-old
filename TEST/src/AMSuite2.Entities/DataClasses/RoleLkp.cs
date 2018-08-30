using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class RoleLkp
    {
        public RoleLkp()
        {
            AccountUserRoleXref = new HashSet<AccountUserRoleXref>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public short Level { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<AccountUserRoleXref> AccountUserRoleXref { get; set; }
    }
}
