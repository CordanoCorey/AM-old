using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class GroupRoleLkp
    {
        public GroupRoleLkp()
        {
            GroupMembershipXref = new HashSet<GroupMembershipXref>();
            GroupRoleSubstitutionXref = new HashSet<GroupRoleSubstitutionXref>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string GroupRoleDescription { get; set; }
        public bool? AgendaSubstitutionRole { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<GroupMembershipXref> GroupMembershipXref { get; set; }
        public virtual ICollection<GroupRoleSubstitutionXref> GroupRoleSubstitutionXref { get; set; }
    }
}
