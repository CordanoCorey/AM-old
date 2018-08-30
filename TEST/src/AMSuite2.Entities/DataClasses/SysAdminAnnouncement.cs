using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class SysAdminAnnouncement
    {
        public string Lock { get; set; }
        public string Subject { get; set; }
        public string Announcement { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
    }
}
