using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using AMSuite2.Entities.DataClasses;
using AMSuite2.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AMSuite2.Entities.Context
{
    public partial class AMSuiteContext : IdentityDbContext<ApplicationUser, ApplicationRole, int>
    {
        public virtual DbSet<Account> Account { get; set; }
        public virtual DbSet<AccountLogo> AccountLogo { get; set; }
        public virtual DbSet<AccountStatusLkp> AccountStatusLkp { get; set; }
        public virtual DbSet<AccountUserRoleXref> AccountUserRoleXref { get; set; }
        public virtual DbSet<Agenda> Agenda { get; set; }
        public virtual DbSet<AgendaDateRangeLkp> AgendaDateRangeLkp { get; set; }
        public virtual DbSet<AgendaItemData> AgendaItemData { get; set; }
        public virtual DbSet<AgendaItemVote> AgendaItemVote { get; set; }
        public virtual DbSet<AgendaLkp> AgendaLkp { get; set; }
        public virtual DbSet<AgendaRecord> AgendaRecord { get; set; }
        public virtual DbSet<AgendaRecordLkp> AgendaRecordLkp { get; set; }
        public virtual DbSet<Announcement> Announcement { get; set; }
        public virtual DbSet<AnnouncementAttachment> AnnouncementAttachment { get; set; }
        public virtual DbSet<AnnouncementLkp> AnnouncementLkp { get; set; }
        public virtual DbSet<Attachment> Attachment { get; set; }
        public virtual DbSet<Attendance> Attendance { get; set; }
        public virtual DbSet<AttendanceLkp> AttendanceLkp { get; set; }
        public virtual DbSet<AutoSave> AutoSave { get; set; }
        public virtual DbSet<AutoSaveResolutionLkp> AutoSaveResolutionLkp { get; set; }
        public virtual DbSet<BinAgendaItemData> BinAgendaItemData { get; set; }
        public virtual DbSet<BinAgendaRecord> BinAgendaRecord { get; set; }
        public virtual DbSet<BinAttachment> BinAttachment { get; set; }
        public virtual DbSet<Conference> Conference { get; set; }
        public virtual DbSet<ConferenceBuilding> ConferenceBuilding { get; set; }
        public virtual DbSet<ConferenceLocation> ConferenceLocation { get; set; }
        public virtual DbSet<ConferenceRoom> ConferenceRoom { get; set; }
        public virtual DbSet<Constant> Constant { get; set; }
        public virtual DbSet<Group> Group { get; set; }
        public virtual DbSet<GroupMembershipXref> GroupMembershipXref { get; set; }
        public virtual DbSet<GroupRoleLkp> GroupRoleLkp { get; set; }
        public virtual DbSet<GroupRoleSubstitutionXref> GroupRoleSubstitutionXref { get; set; }
        public virtual DbSet<MailMessage> MailMessage { get; set; }
        public virtual DbSet<MailMessageAttachment> MailMessageAttachment { get; set; }
        public virtual DbSet<Meeting> Meeting { get; set; }
        public virtual DbSet<MeetingLkp> MeetingLkp { get; set; }
        public virtual DbSet<Notification> Notification { get; set; }
        public virtual DbSet<NotificationAccountRequestXref> NotificationAccountRequestXref { get; set; }
        public virtual DbSet<NotificationStatusLkp> NotificationStatusLkp { get; set; }
        public virtual DbSet<NotificationSuggestedItemXref> NotificationSuggestedItemXref { get; set; }
        public virtual DbSet<NotificationTypeLkp> NotificationTypeLkp { get; set; }
        public virtual DbSet<OutlineLkp> OutlineLkp { get; set; }
        public virtual DbSet<RoleLkp> RoleLkp { get; set; }
        public virtual DbSet<StatusLkp> StatusLkp { get; set; }
        public virtual DbSet<Suggestion> Suggestion { get; set; }
        public virtual DbSet<SuggestionAttachmentXref> SuggestionAttachmentXref { get; set; }
        public virtual DbSet<SysAdminAnnouncement> SysAdminAnnouncement { get; set; }
        public virtual DbSet<Template> Template { get; set; }
        public virtual DbSet<TemplateItem> TemplateItem { get; set; }
        public virtual DbSet<TemplateLkp> TemplateLkp { get; set; }
        public virtual DbSet<TimeFrameLkp> TimeFrameLkp { get; set; }
        //public virtual DbSet<User> User { get; set; }
        public virtual DbSet<VoteAnswerLkp> VoteAnswerLkp { get; set; }

        public AMSuiteContext(DbContextOptions<AMSuiteContext> options)
            : base(options)
        { }

        public AMSuiteContext()
            : base()
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            this.OnModelCreating_Identity(modelBuilder);
            this.OnModelCreating_Lookup(modelBuilder);
            this.OnModelCreating_Core(modelBuilder);
            this.OnModelCreating_AM(modelBuilder);
            this.OnModelCreating_DM(modelBuilder);
            this.OnModelCreating_RM(modelBuilder);
        }
    }
}