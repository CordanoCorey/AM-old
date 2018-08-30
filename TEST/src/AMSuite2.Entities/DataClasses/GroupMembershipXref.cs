using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class GroupMembershipXref
    {
        public int AgendaUserId { get; set; }
        public int GroupId { get; set; }
        public int GroupRoleId { get; set; }

        public virtual ApplicationUser AgendaUser { get; set; }
        public virtual Group Group { get; set; }
        public virtual GroupRoleLkp GroupRole { get; set; }
    }
}
