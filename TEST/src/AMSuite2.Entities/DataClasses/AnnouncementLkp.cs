using System;
using System.Collections.Generic;

namespace AMSuite2.Entities.DataClasses
{
    public partial class AnnouncementLkp
    {
        public AnnouncementLkp()
        {
            Announcement = new HashSet<Announcement>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string EnumCode { get; set; }

        public virtual ICollection<Announcement> Announcement { get; set; }
    }
}
