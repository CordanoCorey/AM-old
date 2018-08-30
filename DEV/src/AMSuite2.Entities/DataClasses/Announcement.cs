using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Announcement
    {
        public Announcement()
        {
            AnnouncementAttachment = new HashSet<AnnouncementAttachment>();
        }

        public int Id { get; set; }
        public string Announcement1 { get; set; }
        public int? AccountId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? AnnouncementTypeId { get; set; }
        public string Subject { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public int? GroupId { get; set; }
        public string Signature { get; set; }

        public virtual ICollection<AnnouncementAttachment> AnnouncementAttachment { get; set; }
        public virtual Account Account { get; set; }
        public virtual AnnouncementLkp AnnouncementType { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
    }
}
