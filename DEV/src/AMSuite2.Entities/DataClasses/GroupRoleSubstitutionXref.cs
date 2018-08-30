using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class GroupRoleSubstitutionXref
    {
        public int GroupRoleId { get; set; }
        public int AgendaUserId { get; set; }
        public int AgendaId { get; set; }

        public virtual Agenda Agenda { get; set; }
        public virtual ApplicationUser AgendaUser { get; set; }
        public virtual GroupRoleLkp GroupRole { get; set; }
    }
}
