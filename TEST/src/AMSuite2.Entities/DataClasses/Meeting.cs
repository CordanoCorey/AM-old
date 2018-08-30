using System;
using System.Collections.Generic;
using AMSuite2.Entities.Identity;

namespace AMSuite2.Entities.DataClasses
{
    public partial class Meeting
    {
        public Meeting()
        {
            Agenda = new HashSet<Agenda>();
            Attendance = new HashSet<Attendance>();
        }

        public int Id { get; set; }
        public int? ConferenceId { get; set; }
        public string MeetingName { get; set; }
        public DateTime MeetingDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public int StatusId { get; set; }
        public int? MeetingTypeId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime LastModifiedDate { get; set; }
        public int LastModifiedBy { get; set; }
        public string MeetingLocation { get; set; }
        public string Comments { get; set; }
        public int? GroupId { get; set; }
        public int AccountId { get; set; }
        public DateTime? MarkedForDelete { get; set; }
        public int? MinuteTakerId { get; set; }
        public int? AttendanceTakerId { get; set; }
        public int? VoteTakerId { get; set; }
        public int? OutlineId { get; set; }

        public virtual ICollection<Agenda> Agenda { get; set; }
        public virtual ICollection<Attendance> Attendance { get; set; }
        public virtual Account Account { get; set; }
        public virtual ApplicationUser AttendanceTaker { get; set; }
        public virtual ApplicationUser CreatedByNavigation { get; set; }
        public virtual Group Group { get; set; }
        public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        public virtual MeetingLkp MeetingType { get; set; }
        public virtual ApplicationUser MinuteTaker { get; set; }
        public virtual OutlineLkp Outline { get; set; }
        public virtual StatusLkp Status { get; set; }
        public virtual ApplicationUser VoteTaker { get; set; }
    }
}
