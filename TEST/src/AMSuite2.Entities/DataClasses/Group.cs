using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Group
    {
        public Group()
        {
            Agenda = new HashSet<Agenda>();
            GroupMembershipXref = new HashSet<GroupMembershipXref>();
            Meeting = new HashSet<Meeting>();
            Notification = new HashSet<Notification>();
            Template = new HashSet<Template>();
        }

        public int Id { get; set; }
        public int AccountId { get; set; }
        public string GroupName { get; set; }
        public string GroupDescription { get; set; }
        public bool AllowSuggestions { get; set; }
        public int? CreatedBy { get; set; }
        public int? LastModifiedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public bool? Active { get; set; }
        public int? GroupAdministratorId { get; set; }
        public int? OutlineId { get; set; }

        public virtual ICollection<Agenda> Agenda { get; set; }
        public virtual ICollection<GroupMembershipXref> GroupMembershipXref { get; set; }
        public virtual ICollection<Meeting> Meeting { get; set; }
        public virtual ICollection<Notification> Notification { get; set; }
        public virtual ICollection<Template> Template { get; set; }
        public virtual Account Account { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual ApplicationUser GroupAdministrator { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        public virtual OutlineLkp Outline { get; set; }
    }
}
