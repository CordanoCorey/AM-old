using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Attendance
    {
        public int Id { get; set; }
        public int AgendaId { get; set; }
        public int MeetingId { get; set; }
        public int? AgendaUserId { get; set; }
        public string WriteInAttendees { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public bool? IsPresent { get; set; }
        public int AttendanceTypeId { get; set; }
        public int? AgendaItemId { get; set; }

        public virtual Agenda Agenda { get; set; }
        public virtual ApplicationUser AgendaUser { get; set; }
        public virtual AttendanceLkp AttendanceType { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual Meeting Meeting { get; set; }
    }
}
