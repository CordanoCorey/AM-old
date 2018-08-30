using System;
using System.Collections;
using System.Collections.Generic;
using AMSuite2.Entities.DataClasses;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AMSuite2.Entities.Identity
{
    public partial class ApplicationUser : IdentityUser<int>
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public bool IsActive { get; set; }
        public bool IsLockedOut { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public DateTime? LastPasswordChangedDate { get; set; }
        public DateTime? LastLockoutDate { get; set; }
        public int FailedPasswordAttemptCount { get; set; }
        public DateTime CreatedDate { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }
        public int? LastModifiedBy { get; set; }
        public string UserTitle { get; set; }
        public string GeneralInfo { get; set; }
        public bool WarnOnDirty { get; set; }
        public int DefaultGroupId { get; set; }
        public bool AutoSaveEnabled { get; set; }
        public int AgendaDateRangeId { get; set; }
        public string ServerSalt { get; set; }
        public string PasswordResetCode { get; set; }

        public virtual ICollection<AccountLogo> AccountLogo { get; set; }
        public virtual ICollection<AccountUserRoleXref> AccountUserRoleXref { get; set; }
        public virtual ICollection<Agenda> AgendaCreatedByNavigation { get; set; }
        public virtual ICollection<Agenda> AgendaLastModifiedByNavigation { get; set; }
        public virtual ICollection<AgendaItemData> AgendaItemDataCreatedByNavigation { get; set; }
        public virtual ICollection<AgendaItemData> AgendaItemDataLastModifiedByNavigation { get; set; }
        public virtual ICollection<AgendaItemVote> AgendaItemVoteCreatedByNavigation { get; set; }
        public virtual ICollection<AgendaItemVote> AgendaItemVoteLastModifiedByNavigation { get; set; }
        public virtual ICollection<AgendaItemVote> AgendaItemVoteVoter { get; set; }
        public virtual ICollection<AgendaRecord> AgendaRecordCreatedbyNavigation { get; set; }
        public virtual ICollection<AgendaRecord> AgendaRecordLastModifiedByNavigation { get; set; }
        public virtual ICollection<Announcement> AnnouncementCreatedByNavigation { get; set; }
        public virtual ICollection<Announcement> AnnouncementLastModifiedByNavigation { get; set; }
        public virtual ICollection<Attachment> AttachmentCreatedByNavigation { get; set; }
        public virtual ICollection<Attachment> AttachmentLastModifiedByNavigation { get; set; }
        public virtual ICollection<Attendance> AttendanceAgendaUser { get; set; }
        public virtual ICollection<Attendance> AttendanceCreatedByNavigation { get; set; }
        public virtual ICollection<AutoSave> AutoSave { get; set; }
        public virtual ICollection<BinAgendaItemData> BinAgendaItemData { get; set; }
        public virtual ICollection<Group> GroupCreatedByNavigation { get; set; }
        public virtual ICollection<Group> GroupGroupAdministrator { get; set; }
        public virtual ICollection<Group> GroupLastModifiedByNavigation { get; set; }
        public virtual ICollection<GroupMembershipXref> GroupMembershipXref { get; set; }
        public virtual ICollection<GroupRoleSubstitutionXref> GroupRoleSubstitutionXref { get; set; }
        public virtual ICollection<Meeting> MeetingAttendanceTaker { get; set; }
        public virtual ICollection<Meeting> MeetingCreatedByNavigation { get; set; }
        public virtual ICollection<Meeting> MeetingLastModifiedByNavigation { get; set; }
        public virtual ICollection<Meeting> MeetingMinuteTaker { get; set; }
        public virtual ICollection<Meeting> MeetingVoteTaker { get; set; }
        public virtual ICollection<Notification> NotificationCreatedByNavigation { get; set; }
        public virtual ICollection<Notification> NotificationResolvedByNavigation { get; set; }
        public virtual ICollection<Notification> NotificationUser { get; set; }
        public virtual ICollection<NotificationAccountRequestXref> NotificationAccountRequestXref { get; set; }
        public virtual ICollection<Suggestion> SuggestionCreatedByNavigation { get; set; }
        public virtual ICollection<Suggestion> SuggestionLastModifiedByNavigation { get; set; }
        public virtual ICollection<SysAdminAnnouncement> SysAdminAnnouncementCreatedByNavigation { get; set; }
        public virtual ICollection<SysAdminAnnouncement> SysAdminAnnouncementLastModifiedByNavigation { get; set; }
        public virtual ICollection<Template> TemplateCreatedByNavigation { get; set; }
        public virtual ICollection<Template> TemplateUpdatedByNavigation { get; set; }
        public virtual ICollection<TemplateItem> TemplateItemCreatedByNavigation { get; set; }
        public virtual ICollection<TemplateItem> TemplateItemUpdatedByNavigation { get; set; }
        public virtual AgendaDateRangeLkp AgendaDateRange { get; set; }
        //public virtual ApplicationUser CreatedByNavigation { get; set; }
        //public virtual ICollection<ApplicationUser> InverseCreatedByNavigation { get; set; }
        //public virtual ApplicationUser LastModifiedByNavigation { get; set; }
        //public virtual ICollection<ApplicationUser> InverseLastModifiedByNavigation { get; set; }
    }
}
