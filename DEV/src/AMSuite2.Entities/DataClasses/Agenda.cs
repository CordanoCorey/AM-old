using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Agenda
    {
        public Agenda()
        {
            AgendaItemData = new HashSet<AgendaItemData>();
            Attendance = new HashSet<Attendance>();
            GroupRoleSubstitutionXref = new HashSet<GroupRoleSubstitutionXref>();
            Suggestion = new HashSet<Suggestion>();
        }

        public int Id { get; set; }
        public string AgendaName { get; set; }
        public string AgendaDescription { get; set; }
        public int? MeetingId { get; set; }
        public int DisplayOrder { get; set; }
        public int StatusId { get; set; }
        public int AgendaTypeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public int? TimeFrameId { get; set; }
        public bool DisplayMinutes { get; set; }
        public bool RollcallTaken { get; set; }
        public DateTime? AgendaDate { get; set; }
        public int? GroupId { get; set; }
        public DateTime? MarkedForDelete { get; set; }

        public virtual ICollection<AgendaItemData> AgendaItemData { get; set; }
        public virtual ICollection<Attendance> Attendance { get; set; }
        public virtual ICollection<GroupRoleSubstitutionXref> GroupRoleSubstitutionXref { get; set; }
        public virtual ICollection<Suggestion> Suggestion { get; set; }
        public virtual AgendaLkp AgendaType { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual Group Group { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        public virtual Meeting Meeting { get; set; }
        public virtual StatusLkp Status { get; set; }
        public virtual TimeFrameLkp TimeFrame { get; set; }
    }
}
