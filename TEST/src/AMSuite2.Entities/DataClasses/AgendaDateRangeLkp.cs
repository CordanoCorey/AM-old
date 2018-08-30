using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AgendaDateRangeLkp
    {
        public AgendaDateRangeLkp()
        {
            User = new HashSet<ApplicationUser>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public bool UserProfileDisplay { get; set; }
        public string EnumCode { get; set; }
        public int? NumberOfMeetings { get; set; }

        public virtual ICollection<ApplicationUser> User { get; set; }
    }
}
